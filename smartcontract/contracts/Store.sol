// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";




contract Store is Ownable, ReentrancyGuard, ERC721URIStorage {
    


    struct Campaign {
        address creator;      //  creator of campaign
        address tokenAddress; // specific which ERC20 token for this campaign
        string name;          // name of campaign (MAYBE should stored in BE)
        uint current;         // available balance of campaign
        uint price;           // minimum price for a donation (lower value will be discard) 
        uint slot;            // slot for NFT
        bool ended;           // isended campaign
        
    }
    struct Donor {
        address wallet;      // donor address
        uint amount;         // amount donate
        bool voted;          // not used yet
    }
    struct Distributor {
        address wallet;      // distributer address
        uint amount;         // amount withdraw from campaign
    }
    

    uint private _campaign_count;
    uint private _nft_count;

    mapping(address => bool) private whitelist;  // user in whitelist can create campaign
    mapping(uint => Donor[]) public donorsOfCampaign;
    mapping(uint => Distributor[]) public distributorsOfCampaign;
    mapping(uint => Campaign) public campaigns;
    
    mapping(uint => uint) public nftToCampaign;
    

    
    event campaignCreated(uint _campaignId, address _creator, address _tokenAddress);
    event nftMined(uint _tokenID, address _creator);
    event donated(uint _campaignId, address _donor, uint _amount);
    event distributorAdded(uint _campaignId, address _distributor);
    event campaignEnded(uint _campaignId);
    event distributed(uint _campaignId, address _distributor, uint _amount); 



    constructor () ERC721("Gift Rada", "RadaNFT") Ownable() {
        
    }
    
    modifier onlyWhitelister() {
        require(
            whitelist[msg.sender] == true,
            "Ownable: caller is not in the whitelist"
        );
        _;
    }
    modifier onlyOwnerOfToken(uint _nftId){
        require(
            msg.sender == ownerOf(_nftId),
            "You are not the owner"
        );
        _;
    }
    modifier onlyOwnerOfCampaign(uint _campaignId) {
        require(
            msg.sender == campaigns[_campaignId].creator,
            "You are not owner of campaign"
            );
        _;
    }

    
    
    // whitelist methods
    function addWhitelister(address _user) external onlyOwner {
        whitelist[_user] = true;
    }
    function removeWhitelister(address _user) external onlyOwner {
        whitelist[_user] = false;
    }
    function isWhitelister(address _user) external view returns (bool) {
        return whitelist[_user];
    }

    // campaign methods
    function createCampaign(string memory _name, address _tokenAddress, uint _slot, uint _price) public onlyWhitelister {
        
        campaigns[_campaign_count] = Campaign(msg.sender, _tokenAddress, _name, 0, _slot, _price, false);
        emit campaignCreated(_campaign_count, msg.sender, _tokenAddress);
        
        _campaign_count += 1;

        
    }
    
    function donatingNFT(uint _campaignId, uint _amount, string memory _tokenURI) public {
        require(campaigns[_campaignId].slot > 0, "Campaign has no nft slot");
        require(_amount > campaigns[_campaignId].price, "Donate amount must greater or equal than price");

        // Send it to contract, allow creator to withdraw
        IERC20(campaigns[_campaignId].tokenAddress).transferFrom(msg.sender, address(this), _amount);


        campaigns[_campaignId].current += _amount;
        donorsOfCampaign[_campaignId].push(Donor(msg.sender, _amount, false));


        // Donor mint itself
        _safeMint(msg.sender, _nft_count);
        _setTokenURI(_nft_count, _tokenURI);
        nftToCampaign[_nft_count] = _campaignId;
        _nft_count += 1;
        campaigns[_campaignId].slot -=  1;

        emit donated(_campaignId, msg.sender, _amount);
        
    }
    function donatingNormal(uint _campaignId, uint _amount) public {
        require(_amount > campaigns[_campaignId].price, "Donate amount must greater or equal than price");

         // Send it to contract, allow creator to withdraw
        IERC20(campaigns[_campaignId].tokenAddress).transferFrom(msg.sender, address(this), _amount);


        campaigns[_campaignId].current += _amount;
        donorsOfCampaign[_campaignId].push(Donor(msg.sender, _amount, false));


        emit donated(_campaignId, msg.sender, _amount);
    }
    function addDistributor(uint _campaignId, address _distributor) public onlyOwnerOfCampaign(_campaignId){
        
        distributorsOfCampaign[_campaignId].push(Distributor(_distributor, 0));
        
        emit distributorAdded(_campaignId, _distributor);
    }

    function endingCampaign(uint _campaignId) public onlyOwnerOfCampaign(_campaignId){
        campaigns[_campaignId].ended = true;
        emit campaignEnded(_campaignId);
    }

    function distributing(uint _campaignId, uint _distributorId, uint _amount) public onlyOwnerOfCampaign(_campaignId) {
        
        require(campaigns[_campaignId].current >= _amount, "Campaign out of amount money");
        
        
        address _distributorWallet = distributorsOfCampaign[_campaignId][_distributorId].wallet;

        IERC20(campaigns[_campaignId].tokenAddress).transfer(_distributorWallet, _amount); // distributing from contract to distributor
        
        campaigns[_campaignId].current -= _amount;
        
        distributorsOfCampaign[_campaignId][_distributorId].amount += _amount;

        emit distributed(_campaignId, _distributorWallet, _amount);
    }

}


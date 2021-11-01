// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


// import "./RadaToken.sol";

import "./RadaNFTToken.sol";



contract Store is Ownable, ReentrancyGuard {
    


    struct Campaign {
        address creator;
        address wallet;
        address token;
        string name;
        uint current;
        uint price;
        uint slot;
        bool ended;
    }
    struct Donor {
        address wallet;
        uint amount;
        bool voted;
    }
    struct Distributor {
        address wallet;
        uint amount;
    }
    
    
    uint private _campaign_count;
    uint private _nft_count;

    mapping(address => bool) private whitelist; // user in whitelist can create campaign
    mapping(uint => Donor[]) public donorsOfCampaign;
    mapping(uint => Distributor[]) public distributorsOfCampaign;
    mapping(uint => Campaign) public campaigns; 
    

    
    event campaignCreated(uint _campaignId, address _creator, address _wallet, address _token);


    
    modifier onlyWhitelister() {
        require(
            whitelist[msg.sender] == true,
            "Ownable: caller is not in the whitelist"
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

    function createCampaign(string memory _name, address _token, uint _slot, uint _price) public onlyWhitelister {

        
        RadaNFTToken newNFTContract = new RadaNFTToken(_name);


        campaigns[_campaign_count] = Campaign(msg.sender, address(newNFTContract), _token, _name, 0, _price, _slot, false);

        _campaign_count += 1;
        
    }

    function donatingNFT(uint _campaignId, uint _amount, string memory _tokenURI) public {
        require(campaigns[_campaignId].slot > 0, "Campaign has no nft slot");
        require(_amount >= campaigns[_campaignId].price, "Donate amount must greater or equal than price");
         
        // transfer to Wallet
        IERC20(campaigns[_campaignId].token).transferFrom(msg.sender, campaigns[_campaignId].wallet, _amount);
        
        // Approve for Store can withdraw token from Campaign's wallet
        RadaNFTToken(campaigns[_campaignId].wallet).approveToken(campaigns[_campaignId].token, _amount);

        campaigns[_campaignId].current += _amount;
        donorsOfCampaign[_campaignId].push(Donor(msg.sender, _amount, false));

        // Store mint for donor
        _mintNFT(_campaignId, msg.sender, _tokenURI);

        campaigns[_campaignId].slot -=  1;

    }

    function addDistributor(uint _campaignId, address _distributor) public onlyOwnerOfCampaign(_campaignId){
        
        distributorsOfCampaign[_campaignId].push(Distributor(_distributor, 0));
    }
    function endingCampaign(uint _campaignId) public onlyOwnerOfCampaign(_campaignId){
        campaigns[_campaignId].ended = true;
    }
    
    function distributing(uint _campaignId, uint _distributorId, uint _amount) public onlyOwnerOfCampaign(_campaignId) {
        
        require(campaigns[_campaignId].current >= _amount, "Campaign out of amount money");
        
        
        address _distributorWallet = distributorsOfCampaign[_campaignId][_distributorId].wallet;

        IERC20(campaigns[_campaignId].token).transferFrom(campaigns[_campaignId].wallet, _distributorWallet, _amount); // distributing from contract to distributor
        
        campaigns[_campaignId].current -= _amount;
        
        distributorsOfCampaign[_campaignId][_distributorId].amount += _amount;

    }

    // Interact NFTcontract
    function _mintNFT(uint _campaignId, address _to, string memory _tokenURI) internal onlyOwner{
        RadaNFTToken(campaigns[_campaignId].wallet).mint(_to, _tokenURI);
    }
    function OwnerOfNFT(uint _campaignId, uint _tokenId) public view returns(address) {
        return RadaNFTToken(campaigns[_campaignId].wallet).ownerOf(_tokenId);
    } 
    function MyOwnNFT(uint _campaignId, address _user) public view returns(uint) {
        return RadaNFTToken(campaigns[_campaignId].wallet).balanceOf(_user);
    }


}


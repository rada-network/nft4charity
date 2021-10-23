// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


import "./RadaToken.sol";


contract Store is Ownable, ReentrancyGuard, ERC721URIStorage {
    

    RadaToken radaToken;

    struct Campaign {
        address creator;
        string name;
        uint current;
        uint price;
        uint slot;
        bool ended;
        
    }
    struct Donor {
        address add;
        uint amount;
        bool voted;
    }
    struct Distributer {
        address add;
        uint amount;
    }
    

    uint private _campaign_count;
    uint private _nft_count;

    mapping(address => bool) private whitelist;
    mapping(uint => Donor[]) public donorsOfCampaign;
    mapping(uint => Distributer[]) public distributersOfCampaign;
    mapping(uint => Campaign) public campaigns;
    
    mapping(uint => uint) public nftToCampaign;
    

    
    event campaignCreated(uint _campaignId, address _creator);
    event nftMined(uint _tokenID, address _creator);
    event donated(uint _campaignId, address _donor, uint _amount);
    event distributerAdded(uint _campaignId, address _distributer);
    event campaignEnded(uint _campaignId);
    event distributed(uint _campaignId, address _distributer, uint _amount); 



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
    // set token interface 
    function setRadaERC20Interface(address _radatoken) external onlyOwner {
        radaToken = RadaToken(_radatoken);
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
    function createCampaign(string memory _name, uint _slot, uint _price) public onlyWhitelister {
        
        campaigns[_campaign_count] = Campaign(msg.sender, _name, 0, _slot, _price, false);
        emit campaignCreated(_campaign_count, msg.sender);
        
        _campaign_count += 1;

        
    }
    
    function donatingNFT(uint _campaignId, uint _amount, string memory _tokenURI) public {
        require(campaigns[_campaignId].slot > 0, "Campaign has no nft slot");
        require(_amount > campaigns[_campaignId].price, "Donate amount must greater or equal than price");

        // Send it to contract, allow creator to withdraw
        radaToken.transferFrom(msg.sender, address(this), _amount);
        // radaToken.increaseAllowance(campaigns[_campaignId].creator, _amount); ??

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
        radaToken.transferFrom(msg.sender, address(this), _amount);
        // radaToken.increaseAllowance(campaigns[_campaignId].creator, _amount); ?

        campaigns[_campaignId].current += _amount;
        donorsOfCampaign[_campaignId].push(Donor(msg.sender, _amount, false));


        emit donated(_campaignId, msg.sender, _amount);
    }
    function addDistributer(uint _campaignId, address _distributer) public onlyOwnerOfCampaign(_campaignId){
        
        distributersOfCampaign[_campaignId].push(Distributer(_distributer, 0));
        
        emit distributerAdded(_campaignId, _distributer);
    }

    function endingCampaign(uint _campaignId) public onlyOwnerOfCampaign(_campaignId){
        campaigns[_campaignId].ended = true;
        emit campaignEnded(_campaignId);
    }

    function distributing(uint _campaignId, uint _distributerId, uint _amount) public onlyOwnerOfCampaign(_campaignId) {
        require(campaigns[_campaignId].ended, "Campaign is not ended");
        require(campaigns[_campaignId].current >= _amount, "Campaign out of amount money");
        
        Campaign storage c = campaigns[_campaignId];        
        
        address _distributerAddress = distributersOfCampaign[_campaignId][_distributerId].add;

        radaToken.transfer(_distributerAddress, _amount); // distributing from contract to distributer
        
        c.current -= _amount;
        
        distributersOfCampaign[_campaignId][_distributerId].amount += _amount;

        emit distributed(_campaignId, _distributerAddress, _amount);
    }

}


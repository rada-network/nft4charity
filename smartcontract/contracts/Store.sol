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
        address owner;
        string name;
        uint current;
        uint price;
        uint slot;
        uint numDistributers;
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
    // mapping(uint => Distributer[]) public distributersOfCampaign;
    mapping(uint => mapping(uint => Distributer)) public distributersOfCampaign;
    mapping(uint => Campaign) public campaigns;
    mapping(uint => uint) public nftToCampaign;
    mapping(uint => bool) public isListedNFT;


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
    modifier onlyOwnerOfCampaign(uint _campaign_id) {
        require(
            msg.sender == campaigns[_campaign_id].owner,
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

        campaigns[_campaign_count] = Campaign(msg.sender, _name, 0, _slot, _price, 0, false);
        
        if(_slot > 0){
            for(uint i=0; i<_slot; i++){
                nftToCampaign[_nft_count] = _campaign_count;
            }
            batchMint(_slot);
        }
        
        _campaign_count += 1;
        
    }
    
    function donatingNFT(uint _campaign_id, uint _amount, uint _tokenId) public {
        require(campaigns[_campaign_id].slot > 0, "Campaign has no nft slot");
        require(_amount > campaigns[_campaign_id].price, "Donate amount must greater or equal than price");
        require(nftToCampaign[_tokenId] == _campaign_id, "NFT token must of true campaign");
        require(isListedNFT[_tokenId], "This token hasn't set URI yet ");

        // sender must approve allowance for CONTRACT 
        radaToken.transferFrom(msg.sender, campaigns[_campaign_id].owner, _amount); 
        campaigns[_campaign_id].current += _amount;

        _transfer(campaigns[_campaign_id].owner, msg.sender, _tokenId);


        donorsOfCampaign[_campaign_id].push(Donor(msg.sender, _amount, false));
        
    }
    function donatingNormal(uint _campaign_id, uint _amount) public {
        require(_amount > campaigns[_campaign_id].price, "Donate amount must greater or equal than price");
                

        radaToken.transferFrom(msg.sender, campaigns[_campaign_id].owner, _amount);
        campaigns[_campaign_id].current += _amount; 
        donorsOfCampaign[_campaign_id].push(Donor(msg.sender, _amount, false));
    }
    function addDistributer(uint _campaign_id, address _distributer) public onlyOwnerOfCampaign(_campaign_id){
        
        distributersOfCampaign[_campaign_id][campaigns[_campaign_id].numDistributers] = Distributer(_distributer, 0);
        campaigns[_campaign_id].numDistributers += 1; 
    }
    
    function setDistributer(uint _campaign_id, uint _distributerId, address _distributer) public onlyOwnerOfCampaign(_campaign_id) {
        require(_distributerId < campaigns[_campaign_id].numDistributers, "DistributerId out of range");
        campaigns[_campaign_id].numDistributers -= 1;
        distributersOfCampaign[_campaign_id][campaigns[_campaign_id].numDistributers].add = _distributer; //set address to owner campaign
    }

    function endingCampaign(uint _campaign_id) public onlyOwnerOfCampaign(_campaign_id){
        campaigns[_campaign_id].ended = true;
    }
    function distributing(uint _campaign_id, uint _distributer_id, uint _amount) public onlyOwnerOfCampaign(_campaign_id) {
        
        require(campaigns[_campaign_id].current >= _amount, "Campaign out of amount money");

        require(campaigns[_campaign_id].ended, "Campaign is not ended");


        
        Campaign storage c = campaigns[_campaign_id];
        
        address _distributer_address = distributersOfCampaign[_campaign_id][_distributer_id].add;

        if(msg.sender != _distributer_address){  // if creator is distributer: not transfer money but emit Event and descrease current
            radaToken.transferFrom(msg.sender, _distributer_address, _amount);
        }

        c.current -= _amount;

    }

    // nft methods
    function mint() internal onlyWhitelister {
        _safeMint(msg.sender, _nft_count);
        _nft_count += 1;
    }
    function batchMint(uint _slot) internal onlyWhitelister {
        for (uint i = 0; i < _slot; i++) {
            mint();
        }
    }
    function setTokenURI(uint _tokenId, string memory _tokenURI) external onlyOwnerOfToken(_tokenId) {
        _setTokenURI(_tokenId, _tokenURI);
        isListedNFT[_tokenId] = true;
    }

}


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
    mapping(uint => bool) public isListedNFT;

    
    event campaignCreated(uint _campaignId, address _creator);
    event nftCreated(uint _tokenID, address _creator);
    event nftURISet(uint _tokenId);
    event donated(uint _campaignId, address _donor, uint _amount);
    event nftTransfer(uint _campaignId, uint _tokenID, address _owner, address _receiver);
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
        
        if(_slot > 0){
            for(uint i=0; i<_slot; i++){
                nftToCampaign[_nft_count] = _campaign_count;
            }
            batchMint(_slot);
        }

        emit campaignCreated(_campaign_count, msg.sender);
        
        _campaign_count += 1;

        
    }
    
    function donatingNFT(uint _campaignId, uint _amount, uint _tokenId) public {
        require(campaigns[_campaignId].slot > 0, "Campaign has no nft slot");
        require(_amount > campaigns[_campaignId].price, "Donate amount must greater or equal than price");
        require(nftToCampaign[_tokenId] == _campaignId, "NFT token must of true campaign");
        require(isListedNFT[_tokenId], "This token hasn't set URI yet ");

        // sender must approve allowance for CONTRACT 
        radaToken.transferFrom(msg.sender, campaigns[_campaignId].creator, _amount); 
        campaigns[_campaignId].current += _amount;

        _transfer(campaigns[_campaignId].creator, msg.sender, _tokenId);


        donorsOfCampaign[_campaignId].push(Donor(msg.sender, _amount, false));

        emit donated(_campaignId, msg.sender, _amount);
        
    }
    function donatingNormal(uint _campaignId, uint _amount) public {
        require(_amount > campaigns[_campaignId].price, "Donate amount must greater or equal than price");
                

        radaToken.transferFrom(msg.sender, campaigns[_campaignId].creator, _amount);
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
        
        require(campaigns[_campaignId].current >= _amount, "Campaign out of amount money");

        require(campaigns[_campaignId].ended, "Campaign is not ended");


        
        Campaign storage c = campaigns[_campaignId];
        
        address _distributerAddress = distributersOfCampaign[_campaignId][_distributerId].add;

        if(msg.sender != _distributerAddress){  // if creator is distributer: not transfer money but emit Event and descrease current
            radaToken.transferFrom(msg.sender, _distributerAddress, _amount);
        }

        c.current -= _amount;
        emit distributed(_campaignId, _distributerAddress, _amount);
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
        emit nftURISet(_tokenId);
    }

}


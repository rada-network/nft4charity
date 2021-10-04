// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "./RadaNFTToken.sol";
import "./RadaToken.sol";

contract Store is Ownable, ReentrancyGuard {
    
    RadaNFTToken public nftToken;
    RadaToken public radaToken;

    struct Campaign {
        address owner;
        string name;
        uint current;
        uint slot;
        uint price;
    }
    struct Donor {
        address add;
        uint amount;
    }
    struct Distributer {
        address add;
        uint amount;
    }
    
    mapping(address => bool) public ableToCreateCampaign;
    mapping(uint => Donor[]) public donorsOfCampaign;
    mapping(uint => Distributer[]) public distributersOfCampaign;
    mapping(uint => Campaign) public campaigns;
    
    uint public campaign_count;

    modifier isOwnerOfCampaign(address _add, uint campaign_id) {
        require(_add == campaigns[campaign_id].owner);
        _;
    }

    modifier isWorkingCampaign(uint campaign_id){
        require(campaigns[campaign_id].slot > 0);
        _;
    }

    event PriceUpdated(
        address indexed owner,
        uint indexed campaign_id,
        uint oldPrice,
        uint newPrice
    );
    event Donated(
        address donor,
        uint campaign_id,
        uint amount
    );
    event Distributed(
        address distributer,
        uint campaign_id,
        uint amount
    );
    event DistributerAdded(
        address distributer,
        uint campaign_id,
    );

    function setNFTContractAddress(address _rada_nft_address, address _rada_token_address) public onlyOwner {
        nftToken = RadaNFTToken(_rada_nft_address);
        radaToken = RadaToken(_rada_token_address);
    }
     
    function createCampaign(string memory _name, string memory _uri, uint _slot, uint _price) public {
        require(nftToken.isWhitelister(msg.sender) == true);
        
        campaign_count += 1;
        campaigns[campaign_count] = Campaign(msg.sender, _name, 0, _slot, _price);
        
        nftToken.mint(msg.sender, _uri, _slot);

    }

    function donating(uint _campaign_id, uint _amount) public isWorkingCampaign(_campaign_id) {
        require(radaToken.balanceOf(msg.sender) >= _amount);

        Campaign storage c = campaigns[_campaign_id];

        c.current += _amount;
        
        radaToken.transferFrom(msg.sender, c.owner, _amount);

        donorsOfCampaign[_campaign_id].push(Donor(msg.sender, _amount));
        
        if(c.price <= _amount){
            nftToken.transfer(c.owner, msg.sender, _campaign_id);
            c.slot -= 1;
        }
        emit Donated(msg.sender, _campaign_id, _amount);
    }

    function updatePrice(uint _campaign_id, uint _price) public isOwnerOfCampaign(msg.sender, _campaign_id) {
        Campaign storage c = campaigns[_campaign_id];
        uint oldPrice = c.price;
        c.price = _price;
        emit PriceUpdated(msg.sender, _campaign_id, oldPrice, _price);
    }
    function addDistributer(uint _campaign_id, address _distributer) public isOwnerOfCampaign(msg.sender, _campaign_id){
        distributersOfCampaign[_campaign_id].push(Distributer(_distributer, _campaign_id));
    }

    function distributing(uint _campaign_id, address _distributer, uint _amount) public isOwnerOfCampaign(msg.sender, _campaign_id) {
        
        require(campaigns[_campaign_id].current > _amount);
        
        Campaign storage c = campaigns[_campaign_id];
        
        radaToken.transferFrom(msg.sender, _distributer, _amount);

        c.current -= _amount;

        
        emit Distributed(_distributer, _campaign_id, _amount);

    }
    
}

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
    struct Donee {
        address add;
        uint amount;
    }
    
    mapping(address => bool) public ableToCreateCampaign;
    mapping(uint => Donor[]) public donorsOfCampaign;
    mapping(uint => Donee[]) public doneesOfCampaign;
    mapping(uint => Campaign) public campaigns;
    uint public campaign_count;
    uint public thres_hold;
    
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
        address _donor,
        uint _campaign_id,
        uint _amount
    );
    event Doneed(
        address _donee,
        uint _campaign_id,
        uint _amount
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

    function distributing(uint _campaign_id, address _receiver, uint _amount) isOwnerOfCampaign(msg.sender, _campaign_id) public  {
        
        require(campaigns[_campaign_id].current > _amount);
        
        Campaign storage c = campaigns[_campaign_id];
        
        radaToken.transferFrom(msg.sender, _receiver, _amount);

        c.current -= _amount;

        doneesOfCampaign[_campaign_id].push(Donee(_receiver, _amount));
        
        emit Doneed(_receiver, _campaign_id, _amount);

    }
   
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./RadaNFTToken.sol";
import "./RadaToken.sol";


contract Store is Ownable, ReentrancyGuard{
    

    mapping(uint256 => uint256) public itemPrices;
    
    RadaNFTToken public nftToken;
    RadaToken public radaToken;

    struct Campaign {
        address owner;
        string name;
        uint current;
        uint price;
        uint slot;
        
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

    mapping(address => bool) public ableToCreateCampaign;
    mapping(uint => Donor[]) public donorsOfCampaign;
    mapping(uint => Distributer[]) public distributersOfCampaign;
    mapping(uint => Campaign) public campaigns;
    mapping(uint => uint) public nftToCampaign;
    
    function setNFTContractAddress(address _rada_nft_address, address _rada_token_address) public onlyOwner {
        nftToken = RadaNFTToken(_rada_nft_address);
        radaToken = RadaToken(_rada_token_address);
    }

    function createCampaign(string memory _name, uint _slot, uint _price) public {
        require(nftToken.isWhitelister(msg.sender) == true);

        campaigns[_campaign_count] = Campaign(msg.sender, _name, 0, _slot, _price);

        for(uint i=0; i<_slot; i++){
            nftToCampaign[_nft_count] = _campaign_count;
        }
        _nft_count += _slot;
        _campaign_count += 1;

        nftToken.batchMint(_slot);
    }

    function donating(uint _campaign_id, uint _amount, uint _nft_id) public {
        require(campaigns[_campaign_id].slot > 0, "Campaign still has slot");
        require(_amount > campaigns[_campaign_id].price, "Donate amount must greater or equal than price");
        require(nftToCampaign[_nft_id] == _campaign_id, "NFT token must of true campaign");

        
        radaToken.transferFrom(msg.sender, campaigns[_campaign_id].owner, _amount);

        nftToken.transfer(campaigns[_campaign_id].owner, msg.sender, _nft_id);

        donorsOfCampaign[_campaign_id].push(Donor(msg.sender, _amount, false));
        
    }
    
}
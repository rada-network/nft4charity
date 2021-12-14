// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./CampaignNFT.sol";


contract Store is Ownable, ReentrancyGuard {
    
    struct Campaign{
        address creator;
        address wallet;
        string name;
    }
    uint public _campaign_count;
    mapping(address => bool) private whitelist; // user in whitelist can create campaign
    mapping(uint => Campaign) public campaigns;
    
    event campaignCreated(uint _campaignId, address _creator, address _wallet, string _name);

    modifier onlyWhitelister() {
        require(whitelist[msg.sender] == true, "Ownable: caller is not in the whitelist");
        _;
    }    
    modifier onlyOwnerOfCampaign(uint _campaignId) {
        require(msg.sender == campaigns[_campaignId].creator, "You are not owner of campaign");
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
    function createCampaign(string memory _name, uint _price, string memory _baseURI) public onlyWhitelister {
        CampaignNFT newCampaign = new CampaignNFT(msg.sender, _name, _price, _baseURI);
        _campaign_count += 1; 
        campaigns[_campaign_count] = Campaign(msg.sender, address(newCampaign), _name);
        emit campaignCreated(_campaign_count, msg.sender, address(newCampaign), _name);
    }
    

}


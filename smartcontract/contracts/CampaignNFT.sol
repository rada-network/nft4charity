// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";


contract CampaignNFT is Ownable, ERC1155Supply{
    string public name;
    uint public current;
    uint public price;
    uint public tokenIds;
    

    struct Donor {
        address wallet;
        uint amount;
    }
    
    uint public donorsCount;
    mapping(uint => Donor) donors;    
    mapping(address => uint) donorToId;
    mapping(uint => uint) maxSlots;

    modifier onlyDonor() {
        require(donorToId[msg.sender] != 0, "You are not donor of campaign");
        _;
    }
    constructor (address _creator, string memory _name, uint _price, string memory _baseURI) ERC1155(_baseURI) Ownable() payable {
        current = 0;
        price = _price;
        name = _name;
        tokenIds = 10;

        transferOwnership(_creator);
    }

    function mint(uint _tokenId, uint _amount) payable external {
        require(msg.value > _amount * price, "Not enough eth to mint");
        require(_tokenId <= tokenIds, "Invalid tokenId");
        require(maxSlots[_tokenId] < 1, "This tokenId is out of supply");
        
        _mint(msg.sender, _tokenId, _amount, "");
        maxSlots[_tokenId] += 1;
        
        donors[donorsCount] = Donor(msg.sender, _amount);
        donorToId[msg.sender] = donorsCount;
        donorsCount += 1;

        current += msg.value;

        
    }

}


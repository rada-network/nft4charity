// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract CampaignNFT is Ownable, ERC721URIStorage {
    
    address public token;
    uint public current;
    uint public price;
    uint public slot;
    bool ended;
    uint public tokenId;
    

    struct Donor {
        address wallet;
        uint amount;
    }
    struct Distributor {
        address wallet;
        uint amount;
    }
    uint public donorsCount;
    uint public distributorsCount;
    mapping(uint => Donor) donors;
    mapping(uint => Distributor) distributors;
    mapping(string => bool) usedURI;

    constructor (address _creator, string memory _name, address _token, uint _slot, uint _price) ERC721(_name, _name) Ownable() {
        token = _token;
        slot = _slot;
        price = _price;
        current = 0;
        ended = false;
        transferOwnership(_creator);
    }

    function donating(uint _amount, string memory _tokenURI) external {
        require(slot > 0, "Campaign has no nft slot");
        require(_amount >= price, "Donate amount must greater or equal than price");
        require(usedURI[_tokenURI]==false, "TokenURI is already taken");
        
        IERC20(token).transferFrom(msg.sender, address(this), _amount);
        donors[donorsCount] = Donor(msg.sender, _amount);
        donorsCount += 1;

        current += _amount;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        tokenId += 1;

    }
    function addDistributor(address _distributor) public onlyOwner {
        
        distributors[distributorsCount] = Distributor(_distributor, 0);
        distributorsCount += 1;
    }
    function endingCampaign() public onlyOwner {
        ended = true;
    }
    function distributing(uint _distributorId, uint _amount) public onlyOwner {
        
        require(current >= _amount, "Campaign out of amount money");
        
        address _distributorWallet = distributors[_distributorId].wallet;

        IERC20(token).transferFrom(address(this), _distributorWallet, _amount); 
        
        current -= _amount;
        
        distributors[_distributorId].amount += _amount;

    }
}


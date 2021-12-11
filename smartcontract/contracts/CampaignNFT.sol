// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract CampaignNFT is Ownable, ERC721URIStorage{
    address public token;
    uint public current;
    uint public price;
    uint public slot;
    bool public ended;
    uint public tokenId;

    struct Donor {
        address wallet;
        uint amount;
        uint votes;
    }
    struct Distributor {
        address wallet;
        uint max;
        uint amount;
        int votes;
    }
    uint public donorsCount;
    uint public distributorsCount;
    mapping(uint => Donor) donors;
    mapping(uint => Distributor) distributors;
    mapping(address => uint) donorToId;
    mapping(address => uint) distributorToId;
    mapping(string => bool) usedURI;

    event donated(address donor, uint amount);
    event distributed(address distributor, uint amount);
    event withdrawed(address distributor, uint amount);
    event distributorAdded(address distributor);


    modifier onlyDonor() {
        require(donorToId[msg.sender] != 0, "You are not donor of campaign");
        _;
    }
    modifier onlyDistributor() {
        require(distributorToId[msg.sender] != 0, "You are not distributor of campaign");
        _;
    }
    constructor (address _creator, string memory _name, address _token, uint _slot, uint _price) ERC721(_name, _name) Ownable() {
        token = _token;
        slot = _slot;
        price = _price;
        current = 0;
        ended = false;
        transferOwnership(_creator);
    }
    function mint(string memory _tokenURI) external {
        require(slot > 0, "Campaign has no nft slot");
        require(usedURI[_tokenURI]==false, "TokenURI is already taken");

        IERC20(token).transferFrom(msg.sender, address(this), price);
        donorsCount += 1;
        donors[donorsCount] = Donor(msg.sender, price, price);
        donorToId[msg.sender] = donorsCount;
        current += price;

        tokenId += 1;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        slot -= 1;
    }
    function donate() external {
        IERC20(token).transferFrom(msg.sender, address(this), price);
        donorsCount += 1;
        donors[donorsCount] = Donor(msg.sender, price, price);
        donorToId[msg.sender] = donorsCount;
        current += price;
    }
    function addDistributor(address _distributor) external onlyOwner {
        distributorsCount += 1;
        distributors[distributorsCount] = Distributor(_distributor, 0, 0, 0);
        distributorToId[_distributor] = distributorsCount;
    }
    function setMaxForDistributor(uint _distributorId, uint _max) external onlyOwner {
        require(distributors[_distributorId].votes >= 0, "Not enough votes to be accepted");
        distributors[_distributorId].max = _max;
    }
    function withdraw(uint _amount) external {
        require(_amount <= distributors[distributorToId[msg.sender]].max, "Amount is exceed the maximum set for distributor ");
        require(_amount <= current, "Campaign out of amount money");

        // IERC20(token).transferFrom(address(this), msg.sender, _amount);
        IERC20(token).transfer(msg.sender, _amount);
        current -= _amount;
        distributors[distributorToId[msg.sender]].max -= _amount;
        distributors[distributorToId[msg.sender]].amount += _amount;
    }
    function distribute(uint _distributorId, uint _amount) external onlyOwner {
        IERC20(token).transfer(distributors[_distributorId].wallet, _amount);
        current -= _amount;
        distributors[_distributorId].amount += _amount;
    }
    function vote(uint _distributorId, uint _vote, bool _up) external onlyDonor {
        require(donors[donorToId[msg.sender]].votes >= _vote, "Not enough votes");

        if(_up){
            distributors[_distributorId].votes += int(_vote);
        }else{
            distributors[_distributorId].votes -= int(_vote);
        }
        donors[donorToId[msg.sender]].votes -= _vote;

    }
    function end() external onlyOwner {
        ended = true;
    }
}


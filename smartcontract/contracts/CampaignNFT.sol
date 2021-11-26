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
    
    event minted(address donor);
    event donated(address donor);
    event distributed(address distributor, uint amount);
    event withdrawed(address distributor, uint amount);
    event distributorAdded(address distributor);
    event voted(address voter, address candidate, uint votes, bool up);

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
    function mint(string memory _tokenURI) public {
        require(slot > 0, "Campaign has no nft slot");
        require(usedURI[_tokenURI]==false, "TokenURI is already taken");
        
        IERC20(token).transferFrom(msg.sender, address(this), price);
        
        if(donorToId[msg.sender]!=0){
            donors[donorToId[msg.sender]].amount += price;
        } else{
            donorsCount += 1;
            donors[donorsCount] = Donor(msg.sender, price, price);
            donorToId[msg.sender] = donorsCount;    
        }
        
        current += price;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        tokenId += 1;
        slot -= 1;

        emit minted(msg.sender);
    }
    function donate() public {
        IERC20(token).transferFrom(msg.sender, address(this), price);
        
        if(donorToId[msg.sender]!=0){
            donors[donorToId[msg.sender]].amount += price;
        } else{
            donorsCount += 1;
            donors[donorsCount] = Donor(msg.sender, price, price);
            donorToId[msg.sender] = donorsCount;    
        }
        current += price;

        emit donated(msg.sender);
    }
    function addDistributor(address _distributor) public onlyOwner {
        require(distributorToId[_distributor]==0, 'This address is added before');
        distributorsCount += 1;
        distributors[distributorsCount] = Distributor(_distributor, 0, 0, 0);
        distributorToId[_distributor] = distributorsCount;

        emit distributorAdded(_distributor);
    }
    function setMaxForDistributor(uint _distributorId, uint _max) public onlyOwner {
        require(distributors[_distributorId].votes >= 0, "Not enough votes to be accepted");
        distributors[_distributorId].max = _max;

    }
    function withdraw(uint _amount) public {
        require(_amount <= distributors[distributorToId[msg.sender]].max, "Amount is exceed the maximum set for distributor ");
        require(_amount <= current, "Campaign out of amount money");
        
        IERC20(token).transfer(msg.sender, _amount);
        current -= _amount;
        distributors[distributorToId[msg.sender]].max -= _amount;
        distributors[distributorToId[msg.sender]].amount += _amount;

        emit withdrawed(msg.sender, _amount);
    }
    function distribute(uint _distributorId, uint _amount) public onlyOwner {
        IERC20(token).transfer(distributors[_distributorId].wallet, _amount);
        current -= _amount;
        distributors[_distributorId].amount += _amount;

        emit distributed(distributors[_distributorId].wallet, _amount);
    }
    function vote(uint _distributorId, uint _vote, bool _up) public onlyDonor {
        require(donors[donorToId[msg.sender]].votes >= _vote, "Not enough votes");
        
        if(_up){
            distributors[_distributorId].votes += int(_vote);
        }else{
            distributors[_distributorId].votes -= int(_vote);
        }
        donors[donorToId[msg.sender]].votes -= _vote;
        
        emit voted(msg.sender, distributors[_distributorId].wallet, _vote, _up);
    }
    function end() public onlyOwner {
        ended = true; 
    }
}


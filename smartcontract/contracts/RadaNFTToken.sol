// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RadaNFTToken is ERC1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(address => bool) private whitelist;
    
    mapping(uint => string) public tokenIdToURI;

    constructor() ERC1155("https://example/api/item/{id}.json") {}

    modifier onlyWhitelister(address _creator) {
        require(
            whitelist[_creator] == true,
            "Ownable: caller is not in the whitelist"
        );
        _;
    }

    function addWhitelister(address user) external onlyOwner {
        whitelist[user] = true;
    }

    function removeWhitelister(address user) external onlyOwner {
        whitelist[user] = false;
    }

    function isWhitelister(address user) external view returns (bool) {
        return whitelist[user];
    }
   
    function mint(address _creator, string memory _tokenURI, uint _amount) external onlyWhitelister(_creator) {
        
        _mint(_creator, _tokenIds.current(), _amount, "");
        _tokenIds.increment();
        tokenIdToURI[_tokenIds.current()] = _tokenURI;

    }
    function burn(address _creator, uint _tokenId, uint _amount ) external onlyWhitelister(_creator) {
        _burn(_creator, _tokenId, _amount);
    }
    function transfer(address _owner, address _receiver, uint _tokenId) external onlyWhitelister(_owner) {
        _safeTransferFrom(_owner, _receiver, _tokenId, 1, "0x0");
    }   
}

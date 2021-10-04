// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RadaNFTToken is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(address => bool) private whitelist;

    constructor() ERC721("Mintable Token", "MINT") {}

    modifier onlyWhitelister() {
        require(
            whitelist[_msgSender()] == true,
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

    function mint(string memory tokenURI) external onlyWhitelister {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(_msgSender(), newItemId);
        _setTokenURI(newItemId, tokenURI);
    }

    function batchMint(string memory tokenURI, uint256 amount)
        external
        onlyWhitelister
    {
        for (uint256 i = 0; i <= amount; i++) {
            _tokenIds.increment();

            uint256 newItemId = _tokenIds.current();
            _safeMint(_msgSender(), newItemId);
            _setTokenURI(newItemId, tokenURI);
        }
    }

    function burn(uint256 tokenId) external onlyWhitelister {
        _burn(tokenId);
    }
}

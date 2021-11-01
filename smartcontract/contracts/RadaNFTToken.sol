// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract RadaNFTToken is Ownable, ERC721URIStorage {

    uint tokenId;
    
    constructor (string memory _campaignName) ERC721(_campaignName, _campaignName) Ownable() {
    }
    
    // only Owner(Here is Store address) can mint NFT for _to 
    function mint(address _to, string memory _tokenURI) external onlyOwner(){
        
        _safeMint(_to, tokenId, "");
        
        _setTokenURI(tokenId, _tokenURI);
        
        tokenId += 1;
    }  
    // only Owner(Here is Store address) can approve ERC20 amount for msg.sender
    function approveToken(address _token, uint _amount) external onlyOwner() {
        IERC20(_token).approve(msg.sender, _amount);
    }
    
}


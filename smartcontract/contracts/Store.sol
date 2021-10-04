// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Context.sol";

import "./RadaNFTToken.sol";

contract Store is Ownable, ReentrancyGuard {
    RadaNFTToken public radaNFTToken;
    address public marketplaceToken;

    mapping(uint256 => uint256) public itemPrices;

    event Listing(address indexed owner, uint256 indexed nftId, uint256 price);

    event Unlisting(address indexed owner, uint256 indexed nftId);

    event Purchase(
        address indexed previousOwner,
        address indexed newOwner,
        uint256 indexed nftId,
        uint256 listingPrice
    );

    event PriceUpdated(
        address indexed owner,
        uint256 indexed nftId,
        uint256 oldPrice,
        uint256 newPrice
    );

    constructor(RadaNFTToken _radaNFTToken, address _marketplaceToken) {
        radaNFTToken = _radaNFTToken;
        marketplaceToken = _marketplaceToken;
    }

    function listing(uint256 _nftId, uint256 _price) public onlyOwner {
        require(
            radaNFTToken.ownerOf(_nftId) == _msgSender(),
            "You are not the owner"
        );
        radaNFTToken.transferFrom(owner(), address(this), _nftId);

        itemPrices[_nftId] = _price;

        emit Listing(owner(), _nftId, _price);
    }

    function unlisting(uint256 _nftId) public onlyOwner {
        require(_msgSender() == owner(), "You are not the owner");

        delete itemPrices[_nftId];

        radaNFTToken.transferFrom(address(this), owner(), _nftId);

        emit Unlisting(owner(), _nftId);
    }

    function buy(uint256 _nftId) external {
        address previousOwner = owner();
        address newOwner = _msgSender();

        _trade(_nftId);

        emit Purchase(previousOwner, newOwner, _nftId, itemPrices[_nftId]);
    }

    function _trade(uint256 _nftId) private {
        IERC20(marketplaceToken).transferFrom(
            _msgSender(),
            owner(),
            itemPrices[_nftId]
        );

        if (msg.value != 0) {
            payable(_msgSender()).transfer(msg.value);
        }

        radaNFTToken.transferFrom(address(this), _msgSender(), _nftId);

        delete itemPrices[_nftId];
    }

    function updatePrice(uint256 _nftId, uint256 _price) public onlyOwner {
        require(_msgSender() == owner(), "You are not the owner");

        uint256 oldPrice = itemPrices[_nftId];
        itemPrices[_nftId] = _price;

        emit PriceUpdated(_msgSender(), _nftId, oldPrice, _price);
    }
}

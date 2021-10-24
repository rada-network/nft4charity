// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract StoreFront is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 listingPrice = 0.01 ether; // hardcode for now

    constructor() {
        owner = payable(msg.sender);
    }

    struct Item {
        uint256 itemId;
        uint256 tokenId;
        address contractAddress;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    mapping(uint256 => Item) private idToItem;

    event ItemCreated(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address indexed contractAddress,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function listItemForSale(
        address contractAddress,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be greater than 0");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToItem[itemId] = Item(
            itemId,
            tokenId,
            contractAddress,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );
        IERC721(contractAddress).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );
        emit ItemCreated(
            itemId,
            tokenId,
            contractAddress,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    // transfer funds between seller, buyer, and also ownership of item
    function sellItem(address contractAddress, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToItem[itemId].price;
        uint256 tokenId = idToItem[itemId].tokenId;
        require(msg.value == price, "Please enter price");

        idToItem[itemId].seller.transfer(msg.value);
        IERC721(contractAddress).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );
        idToItem[itemId].owner = payable(msg.sender);
        idToItem[itemId].sold = true;
        _itemsSold.increment();
        payable(owner).transfer(listingPrice);
    }

    function getUnsoldItems() public view returns (Item[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        Item[] memory items = new Item[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToItem[i + 1].owner == address(0)) {
                uint256 currentId = i + 1;
                Item storage currentItem = idToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}

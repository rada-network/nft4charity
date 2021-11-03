const { ethers } = require("hardhat");

describe("StoreFront", function() {
  it("Should create storefront items and sell items", async function() {
    const StoreFront = await ethers.getContractFactory("StoreFront")
    const storefront = await StoreFront.deploy()
    await storefront.deployed()
    const storefrontAddress = storefront.address

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(storefrontAddress)
    await nft.deployed()
    
    const contractAddress = nft.address
    
    let listingPrice = await storefront.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('0.01', 'ether')

    await nft.createToken("https://www.sample1.com")
    await nft.createToken("https://www.sample2.com")
  
    await storefront.listItemForSale(contractAddress, 1, auctionPrice, { value: listingPrice })
    await storefront.listItemForSale(contractAddress, 2, auctionPrice, { value: listingPrice })
    
    const [_, buyerAddress] = await ethers.getSigners()

    await storefront.connect(buyerAddress).sellItem(contractAddress, 1, { value: auctionPrice})

    let unSoldItems = await storefront.getUnsoldItems()
    unSoldItems = await Promise.all(unSoldItems.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log(unSoldItems);
  })
})

const fs = require('fs');

async function main() {
  console.info('start deploying....');
  
  try {
    let rawdata = fs.readFileSync('./data.json');
    const ipfs = JSON.parse(rawdata);
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    
    // StoreFront deployment
    const StoreFront = await ethers.getContractFactory("StoreFront")
    const storefront = await StoreFront.deploy()
    await storefront.deployed()
    const storefrontAddress = storefront.address

    console.info(`storeFrontAddress is ${storefrontAddress}`);
    // NFT deployment
    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(storefrontAddress)
    await nft.deployed()
    
    const contractAddress = nft.address
    console.info(`contractAddress is ${contractAddress}`);

    let listingPrice = await storefront.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('0.01', 'ether')
    ipfs.forEach(async(d, idx) => {
      tokenId = idx + 1;
      await nft.createToken(d.url);
      await storefront.listItemForSale(contractAddress, tokenId, auctionPrice, { value: listingPrice })
    })
    
    console.log("nft deployed to:", nft.address);
    let unSoldItems = await storefront.getUnsoldItems();
    console.log(unSoldItems);
    
    let config = `
    export const storeFrontAddress = "${storefrontAddress}"
    export const nftAddress = "${contractAddress}"
    `

    let data = JSON.stringify(config)
    fs.writeFileSync('config.js', JSON.parse(data))
  }
  catch(ex) {
    throw ex;
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

require('dotenv').config();
const fs = require('fs');

const nft = require("../artifacts/contracts/NFT.sol/NFT.json"); 
const storeFront = require("../artifacts/contracts/StoreFront.sol/StoreFront.json"); 
const config = require('../config.js');
const DEFAULT_PRICE = '0.001';

async function main() {
  console.info('start deploying....');
  const nftAddress = config.nftAddress;
  const storeFrontAddress = config.storeFrontAddress;

  try {
    let rawdata = fs.readFileSync('./data.json');
    const ipfs = JSON.parse(rawdata);
    const [deployer] = await ethers.getSigners();
    const nftContract = new ethers.Contract(nftAddress, nft.abi, deployer);
    const storeFrontContract = new ethers.Contract(storeFrontAddress, storeFront.abi, deployer);
    const price = ethers.utils.parseUnits(DEFAULT_PRICE, 'ether');
    
    ipfs.forEach(async(d, idx) => {
      tokenId = idx + 1;
      const tmp = await nftContract.createToken(`${d.url}`);
      console.log(tmp);
      let tx = await transaction.wait();
      console.log(`tx is ${tx}`);

      let event = tx.events[0];
      let value = event.args[2];
      let createdTokenId = value.toNumber();
      let listingPrice = await storeFrontContract.getListingPrice();
      listingPrice = listingPrice.toString();
      console.log(`listing price is ${listingPrice}`);
      let transaction = await storeFrontContract.listItemForSale(contractAddress, createdTokenId, price, { value: listingPrice })
      await transaction.wait();
    })
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

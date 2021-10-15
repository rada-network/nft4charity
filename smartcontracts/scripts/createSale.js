require('dotenv').config();
const fs = require('fs');

const nft = require("../artifacts/contracts/NFT.sol/NFT.json"); 
const storeFront = require("../artifacts/contracts/StoreFront.sol/StoreFront.json"); 
const config = require('../config.js');
const DEFAULT_PRICE = '0.001';

async function main() {
  console.info('start creating sale....');
  const nftAddress = config.nftAddress;
  const storeFrontAddress = config.storeFrontAddress;

  try {
    let rawdata = fs.readFileSync('./data.json');
    const ipfs = JSON.parse(rawdata);
    const [deployer] = await ethers.getSigners();
    const nftContract = new ethers.Contract(nftAddress, nft.abi, deployer);
    const storeFrontContract = new ethers.Contract(storeFrontAddress, storeFront.abi, deployer);
    const price = ethers.utils.parseUnits(DEFAULT_PRICE, 'ether');
    let listingPrice = await storeFrontContract.getListingPrice();
    listingPrice = listingPrice.toString();

    // create tokens (mint tokens)
    let tokenIds = await Promise.all(ipfs.map(async (d) => {
      let transaction = await nftContract.createToken(`${d.url}`);
      let tx1 = await transaction.wait();
      let event = tx1.events[0];
      let value = event.args[2];
      return value;
    }));
    //tokenIds = [5];
    // // listing token for sale
    // let transactions = await Promise.all(tokenIds.map(async(tokenId) => {
    //   let transaction = await storeFrontContract.listItemForSale(nftAddress, tokenId, price, { value: listingPrice });
    //   await transaction.wait();
    //   return transaction;
    // }));
   
    console.log(transactions);
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

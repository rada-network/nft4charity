const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const StoreFront = await hre.ethers.getContractFactory("StoreFront");
  const storeFront = await StoreFront.deploy();
  await storeFront.deployed();
  console.log("storeFront deployed to:", storeFront.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(storeFront.address);
  await nft.deployed();
  console.log("nft deployed to:", nft.address);

  let config = `
    const config = {
      storeFrontAddress: "${storeFront.address}",
      nftAddress: "${nft.address}"
    };
    module.exports = config;
  `
  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

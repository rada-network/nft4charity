const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const StoreFront = await hre.ethers.getContractFactory("StoreFront");
  const storeFront = await StoreFront.deploy();
  await storeFront.deployed();
  console.log("storeFront deployed to:", storeFront.address);

  const Item = await hre.ethers.getContractFactory("Item");
  const item = await Item.deploy(storeFront.address);
  await item.deployed();
  console.log("item deployed to:", item.address);

  let config = `
  export const storefrontAddress = "${storeFront.address}"
  export const itemAddress = "${item.address}"
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

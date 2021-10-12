require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { API_URL, PRIVATE_KEY, ETHER_SCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
   networks: {
      hardhat: {
         chainId: 1337
      },
      goerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
   etherscan: {
      apiKey: ETHER_SCAN_API_KEY
  }
};

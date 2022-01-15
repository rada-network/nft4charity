const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    bscTestnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://speedy-nodes-nyc.moralis.io/0d76a30f81e09d5801cad11d/bsc/testnet`, 0, 1),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    rinkerby: {
      provider: () =>
        new HDWalletProvider([""], ``, 0, 1),
      port: 8545,
      network_id: "4", // Rinkeby ID 4
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
     }
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.0",
    },
  },

  plugins: ["truffle-plugin-verify"],

  api_keys: {
    bscscan: "4MGAZ22T6V9SVC7S5FC4QZAX1MJ3GWZ8R1",
  },
};

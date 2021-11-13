STEPS

1. Create account on https://admin.moralis.io/login
2. Get your MetaMask wallet ready. (For testing purpose, make sure to use POLYGON only so its easier, since OpenSea testnets they do not have Goerli)
3. Grab all the credentials need and put it in index.js
4. Run yarn install
5. Run node index.js
6. Going to moralis and see the data (metadata and image are uploaded)
7. Going to remix online
   https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js
8. Create new document
9. Copy NFTContract sol code and make sure to replace w/ the ipfs cid from moralis
10. Run compile
11. Connect to MetaMask (using polygon Mumbai test net)
12. Run deploy
13. Go to testnets.opensea.io (0x0A254B9c7978E2F3D2e65b17fCDc2aDa337D9d1B EX: contract created)

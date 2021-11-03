## Getting started

1. Install requirements with npm
2. Compile contract to json abi
```
truffle compile
``` 
3. Migrate to ganache
```
truffle migrate --network development --reset
```

4. Test 

Check the [./test/simple-test.js] to comprehend the story and run to test
```
truffle test
```

5. Deploy (Updating ...)


Or you can deploy to test net. Modify HDWalletProvider by your account's mnemonic and make sure have enough token to deploy 
```
truffle migrate --network development --[bscTestnet/rinkerby]
```
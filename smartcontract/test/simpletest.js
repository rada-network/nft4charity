const { assert } = require('chai')

const Store = artifacts.require("Store");
const RadaToken = artifacts.require("RadaToken");
const AltToken = artifacts.require("AltToken");


// Test with 2 types of ERC20 token: Rada, Alt
// acc0: admin and donor
// acc1: creator
// acc2, acc3: distributer


require('chai').use(require('chai-as-promised')).should()

contract('Store', (accounts) => {
  let store
  let radatoken
  let alttoken
  
  before(async () => {
    store = await Store.deployed()
    radatoken = await RadaToken.deployed()
    alttoken = await AltToken.deployed()

  })
  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = store.address
      console.log(address)
      assert.notEqual(address, "")
      assert.notEqual(address, null)
      assert.notEqual(address, 0x0)
      assert.notEqual(address, undefined)
    })
  })
  describe('whitelist', async () => {
    it('add successfully', async () => {
      await store.addWhitelister(accounts[0]);
      await store.addWhitelister(accounts[1]);
      assert(store.isWhitelister(accounts[0]));
      assert(store.isWhitelister(accounts[1]));
    }),
    it('remove successfully', async () => {
      await store.removeWhitelister(accounts[0]);
      assert(store.isWhitelister(accounts[0]))
    })
  })

  describe('campaign', async () => {
    it('create successfully', async () => {
      await store.createCampaign("FIRST", radatoken.address, 10, 10, {"from": accounts[1]})
      const thiscampaign = await store.campaigns(0);
      console.log("Creator: ", thiscampaign.creator)
      console.log("Token address: ", thiscampaign.tokenAddress)
      console.log("Price: ", thiscampaign.price.toNumber());
      assert.equal(thiscampaign.creator, accounts[1])
      assert.equal(thiscampaign.tokenAddress, radatoken.address)
    }),
    it('donate sucessfully', async () => {

      await radatoken.approve(store.address, 20);
      await store.donatingNFT(0, 20, "thisisIPFShash0")
      
      const thiscampaign = await store.campaigns(0)

      console.log("Current", thiscampaign.current.toNumber())
      console.log("Avail slot", thiscampaign.slot.toNumber())
      
      const t = await radatoken.balanceOf(store.address);
      console.log("Current radatoken in Store Contract ", t.toNumber())
    })
    it('NFT gift', async () => {
      const nftcount0 = await store.balanceOf(accounts[0])
      const nftcount2 = await store.balanceOf(accounts[2])
      console.log(nftcount0.toNumber());
      console.log(nftcount2.toNumber());
    })
    it('add distributer successfully', async () => {
      await store.addDistributor(0, accounts[2], {"from": accounts[1]})
      await store.addDistributor(0, accounts[3], {"from": accounts[1]})
    })
    it('distributed successfully', async () => {
      await store.distributing(0, 0, 15, {"from": accounts[1]})
      await store.distributing(0, 1, 5, {"from": accounts[1]})

      const x = await radatoken.balanceOf(accounts[2])
      const y = await radatoken.balanceOf(accounts[3])
      console.log(x.toNumber())
      console.log(y.toNumber())
      assert.equal(x.toNumber(), 15)
      assert.equal(y.toNumber(), 5)
    })
    it('ending successfully', async () => {
      
      const thiscampaign = await store.campaigns(0)
      assert.equal(thiscampaign.ended, false)

      await store.endingCampaign(0, {"from": accounts[1]})
      
      const thiscampaignafter = await store.campaigns(0)
      assert.equal(thiscampaignafter.ended, true)
    })
  })
})
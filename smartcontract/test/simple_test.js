const { assert } = require('chai')

const Store = artifacts.require("Store");
const RadaToken = artifacts.require("RadaToken");
const AltToken = artifacts.require("AltToken");
const CampaignNFT = artifacts.require("CampaignNFT");

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
      console.log("Store", address)
      console.log("Rada", radatoken.address)
      console.log("Alt", alttoken.address)
      assert.notEqual(address, "")
      assert.notEqual(address, null)
      assert.notEqual(address, 0x0)
      assert.notEqual(address, undefined)
    })
  })
  // Only Admin can manage whitelist: User in whitelist can create campaign
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
    // Only whitelister can create campaign, 
    // creator specify Name, Token(tokentype for this campaign), NFTslot and minimum price to get NFT
    it('create successfully', async () => {
      await store.createCampaign("FIRSTCAMPAIGN", radatoken.address, 10, 10, {"from": accounts[1]})
      const thiscampaign = await store.campaigns(0);
      console.log("Creator: ", thiscampaign.creator)
      console.log("Wallet: ", thiscampaign.wallet)

      assert.equal(thiscampaign.creator, accounts[1])
    

      const campaign0 = await CampaignNFT.at(thiscampaign.wallet)
      console.log("Slot: ", campaign0.slot)
      console.log("Current: ", campaign0.current)
      console.log("Price: ", campaign0.price)
      console.log("Token: ", campaign0.token)
    })

    // Donor transfer token to Campaign's Wallet and mint NFT  
    it('donate sucessfully', async () => {
      const thiscampaign = await store.campaigns(0);
      const campaign0 = await CampaignNFT.at(thiscampaign.wallet)


      await radatoken.approve(campaign0.address, 20, {"from":accounts[0]});
      await campaign0.donating(20, "thisisIPFShash0", {"from":accounts[0]}) 
      
     
      console.log("Current: ", campaign0.current.toNumber())
      console.log("Slot: ", campaign0.slot.toNumber())     
      const t = await radatoken.balanceOf(thiscampaign.wallet);
      console.log("Current radatoken in Campaign's Wallet: ", t.toNumber())
      
      assert.equal(t.toNumber(), 20)
      assert.equal(campaign0.slot.toNumber(), 9)
    })
    // Check NFT of donor
    it('NFT gift', async () => {
      const thiscampaign = await store.campaigns(0);
      const campaign0 = await CampaignNFT.at(thiscampaign.wallet)

      const nftcount0 = await campaign0.balanceOf(accounts[0])
      const nftcount2 = await campaign0.balanceOf(accounts[2])
      console.log(nftcount0.toNumber()); 
      console.log(nftcount2.toNumber()); 
     
      const ownerOfNFT0 = await campaign0.ownerOf(0) 
      assert.equal(nftcount0.toNumber(), 1)
      assert.equal(nftcount2.toNumber(), 0)
      assert.equal(ownerOfNFT0, accounts[0])

    })
    // Only creator add distributers
    it('add distributer successfully', async () => {
      const thiscampaign = await store.campaigns(0);
      const campaign0 = await CampaignNFT.at(thiscampaign.wallet)

      await campaign0.addDistributor(0, accounts[2], {"from": accounts[1]})
      await campaign0.addDistributor(0, accounts[3], {"from": accounts[1]})
    })

    // Only creator allows distributers withdraw token from campaign's wallet
    it('distributed successfully', async () => {
      const thiscampaign = await store.campaigns(0);
      const campaign0 = await CampaignNFT.at(thiscampaign.wallet)

      await campaign0.distributing(0, 15, {"from": accounts[1]})
      await campaign0.distributing(1, 5, {"from": accounts[1]})
       
      const x = await radatoken.balanceOf(accounts[2])
      const y = await radatoken.balanceOf(accounts[3])
      console.log("Distributer-Acc2: ", x.toNumber())
      console.log("Distributer-Acc3: ", y.toNumber())
      assert.equal(x.toNumber(), 15)
      assert.equal(y.toNumber(), 5)
    })
    // Only creator can end this campaign
    it('ending successfully', async () => {
      const thiscampaign = await store.campaigns(0);
      const campaign0 = await CampaignNFT.at(thiscampaign.wallet)

      await campaign0.endingCampaign({"from": accounts[1]})      

      assert.equal(campaign0.ended, true)
    })
  })
})
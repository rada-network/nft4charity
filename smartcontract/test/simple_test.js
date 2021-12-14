const { assert } = require('chai')

const Store = artifacts.require("Store");
const CampaignNFT = artifacts.require("CampaignNFT");


require('chai').use(require('chai-as-promised')).should()

contract('Store', (accounts) => {
  let store
  let camp1address

  before(async () => {
    store = await Store.deployed()
  })
  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = store.address
      console.log("Store", address)
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

  describe('createcampaign', async () => {
    // Only whitelister can create campaign, 
    it('create successfully', async () => {
      await store.createCampaign("FIRSTCAMPAIGN", 1, "https://ipfs/api/{id}", {"from": accounts[1]})
      const thiscampaign = await store.campaigns(1);
      console.log("Creator: ", thiscampaign.creator)
      console.log("Wallet: ", thiscampaign.wallet)
  
      campaign1address = thiscampaign.wallet

    })
    // Donor transfer token to Campaign's Wallet and mint NFT  
    it('donate NFT sucessfully', async () => {
      const campaign1 = await CampaignNFT.at(campaign1address)


      await campaign1.mint(0, 1, {"from":accounts[2], "value": 2}) 
      
      const current = await campaign1.current()

      console.log("Current: ", current.toNumber())
      
    })
    // Check NFT of donor
    it('NFT gift', async () => {
      const campaign1 = await CampaignNFT.at(campaign1address)

      const nft0count2 = await campaign1.balanceOf(accounts[2], 0)
      const nft1count2 = await campaign1.balanceOf(accounts[2], 1)

      console.log("Total NFT0 of acc2: ",nft0count2.toNumber()); 
      console.log("Total NFT1 of acc2 ",nft1count2.toNumber()); 

    })
  })
})
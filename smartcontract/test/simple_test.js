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

  describe('createcampaign', async () => {
    // Only whitelister can create campaign, 
    it('create successfully', async () => {
      await store.createCampaign("FIRSTCAMPAIGN", radatoken.address, 10, 20, {"from": accounts[1]})
      const thiscampaign = await store.campaigns(1);
      console.log("Creator: ", thiscampaign.creator)
      console.log("Wallet: ", thiscampaign.wallet)
      
      assert.equal(thiscampaign.creator, accounts[1])
    

      const campaign1 = await CampaignNFT.at(thiscampaign.wallet)
      console.log("Slot: ", campaign1.slot)
      console.log("Current: ", campaign1.current)
      console.log("Price: ", campaign1.price)
      console.log("Token: ", campaign1.token)
    })
    // Donor transfer token to Campaign's Wallet and mint NFT  
    it('donate NFT sucessfully', async () => {
      const thiscampaign = await store.campaigns(1);
      const campaign1 = await CampaignNFT.at(thiscampaign.wallet)


      await radatoken.approve(campaign1.address, 20, {"from":accounts[0]}); 
      await campaign1.mint("thisisIPFShash1", {"from":accounts[0]}) 
      
      
      const t = await radatoken.balanceOf(thiscampaign.wallet);     
      console.log("Current radatoken in Campaign's Wallet: ", t.toNumber())
      console.log("Slot: ", campaign1.slot)
      
    })
    // Check NFT of donor
    it('NFT gift', async () => {
      const thiscampaign = await store.campaigns(1);
      const campaign1 = await CampaignNFT.at(thiscampaign.wallet)

      const nftcount0 = await campaign1.balanceOf(accounts[0])
      console.log("NFT of acc0: ",nftcount0.toNumber()); 

    })
    // Only creator add distributers
    it('add distributer successfully', async () => {
      const thiscampaign = await store.campaigns(1)
      const campaign1 = await CampaignNFT.at(thiscampaign.wallet)

      await campaign1.addDistributor(accounts[2], {"from": accounts[1]})
      await campaign1.addDistributor(accounts[3], {"from": accounts[1]})
    })
    it('vote', async () => {
      const thiscampaign = await store.campaigns(1)
      const campaign1 = await CampaignNFT.at(thiscampaign.wallet)
      
      await campaign1.vote(1, 11, true, {"from": accounts[0]})
      await campaign1.vote(2, 8, false, {"from": accounts[0]})

    })
    it('setMax for accepted distributor', async () => {
      const thiscampaign = await store.campaigns(1)
      const campaign1 = await CampaignNFT.at(thiscampaign.wallet)

      await campaign1.setMaxForDistributor(1, 15, {"from": accounts[1]})
    })    
    it('distributor can withdraw', async () => {
      const thiscampaign = await store.campaigns(1)
      const campaign1 = await CampaignNFT.at(thiscampaign.wallet)
      await campaign1.withdraw(15, {"from": accounts[2]})
      const x = await radatoken.balanceOf(accounts[2])
      console.log("Acc2 after withdraw ", x.toNumber()) 
    })
    it('owner distribute', async () => {
      const thiscampaign = await store.campaigns(1)
      const campaign1 = await CampaignNFT.at(thiscampaign.wallet)
      await campaign1.distribute(1, 5, {"from": accounts[1]})

      const x = await radatoken.balanceOf(accounts[2])
      const y = await radatoken.balanceOf(accounts[3])

      console.log("Acc2 after distributed", x.toNumber())
      console.log("Acc3 after distributed", y.toNumber())
      assert.equal(x.toNumber(), 20)
      assert.equal(y.toNumber(), 0)
    })

    // Only creator can end this campaign
    it('ending successfully', async () => {
      const thiscampaign = await store.campaigns(1)
      const campaign1 = await CampaignNFT.at(thiscampaign.wallet)

      await campaign1.end({"from": accounts[1]})
    })
  })
})
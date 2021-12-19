import CampaignNFT from 'contracts/CampaignNFT.json';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

let selectedAccount: string;

let campaignContract: any;

let isInitialized = false;

let web3: any = null;

export const init = async (web3Provider: any) => {
  console.log(web3Provider);
  if (typeof web3Provider !== 'undefined') {
    web3Provider.provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts: any) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err: any) => {
        console.log(err);
        return;
      });

    window.ethereum.on('accountsChanged', function (accounts: any) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }

  web3 = new Web3(web3Provider.provider);

  //   const networkId = await web3.eth.net.getId();

  //   campaignContract = new web3.eth.Contract(
  //     CampaignNFT.abi as AbiItem[],
  //     CampaignNFT.networks[networkId].address
  //   );

  campaignContract = new web3.eth.Contract(
    CampaignNFT.abi as AbiItem[],
    '0x03481D9C1546b8289E9eF93828dFA834a533c4D3'
  );

  isInitialized = true;
};

export const mintToken = async (provider: any, tokenId: number, price: number) => {
  if (!isInitialized) {
    await init(provider);
  }

  console.log(campaignContract.methods);
  console.log(tokenId);
  console.log(selectedAccount);

  return campaignContract.methods.mint(tokenId, 1).send({
    from: selectedAccount,
    value: web3.utils.toWei(price.toString(), 'ether'),
  });
};

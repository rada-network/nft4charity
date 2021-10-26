// SPDX-License-Identifier: Apache-2.0
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import Web3Token from 'web3-token';
import Web3Modal from 'web3modal';

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = 'INVALID_INFURA_KEY';

const NETWORK_NAME = 'mainnet';

function useWeb3Modal(config: any = {}) {
  const [provider, setProvider] = useState<any>();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const [signedInAddress, setSignedInAddress] = useState('');
  const { autoLoad = true, infuraId = INFURA_ID, NETWORK = NETWORK_NAME } = config;

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId,
        },
      },
    },
  });

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const token = await Web3Token.sign(async (msg: string) => await signer.signMessage(msg), '1d');
    console.log(newProvider);
    console.log(window.ethereum);
    console.log(token);
    setSignedInAddress(newProvider.selectedAddress);
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      setSignedInAddress('');
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal]
  );

  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal, signedInAddress];
}

export default useWeb3Modal;

// SPDX-License-Identifier: Apache-2.0
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useCallback, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { formatBalance, formatShortenAddress } from '@/utils/format';

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = 'INVALID_INFURA_KEY';

const NETWORK_NAME = 'localhost';

function useWeb3Modal(config: any = {}) {
  const [provider, setProvider] = useState<any>();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const [signedInAddress, setSignedInAddress] = useState('');
  const [balance, setBalance] = useState('');

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
          // network: 'http://127.0.0.1:7545'
        },
      },
    },
  });

  const calculateBalance = async (web3Provider: any, web3: any, address: string) => {
    const result = await web3.eth.getBalance(address);

    switch (web3Provider?.provider?.networkVersion) {
      case '56': {
        return `${formatBalance(web3.utils.fromWei(result, 'ether'))} BNB`;
      }

      default: {
        return `${formatBalance(web3.utils.fromWei(result, 'ether'))} ETH`;
      }
    }
  };

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));

    const web3Provider = await new Web3Provider(newProvider);
    const web3 = new Web3(newProvider);

    const balance = await calculateBalance(web3Provider, web3, newProvider.selectedAddress);
    setBalance(balance);

    const shortenAddress = formatShortenAddress(newProvider.selectedAddress);
    setSignedInAddress(shortenAddress);
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

  return [provider, loadWeb3Modal, logoutOfWeb3Modal, signedInAddress, balance];
}

export default useWeb3Modal;

import { useState } from 'react';

const useMetaMask = () => {
  const [isInstall, setIsInstall] = useState<boolean>();

  const checkMetaMaskInstalled = () => {
    const { ethereum } = window;
    setIsInstall(Boolean(ethereum && ethereum.isMetaMask));
  };

  return [checkMetaMaskInstalled, isInstall];
};

export default useMetaMask;

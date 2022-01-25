/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, memo, Fragment } from 'react';
import useWeb3Modal from '@/hooks/useWeb3Modal';
import { useAuth } from '@/hooks/useAuth';
import Web3Token from 'web3-token';
import Web3 from 'web3';
import storage from '@/utils/storage';
import { Menu, Transition } from '@headlessui/react';
import walletSVG from '@/assets/icons/wallet.svg';
import { Link } from '../Elements/Link/Link';
import anonymousImage from '@/assets/images/anonymous.png';
import { UserCircleIcon } from '@heroicons/react/outline';

const MenuUser = () => {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal, signedInAddress] = useWeb3Modal();
  const { getProfile, dataProfile } = useAuth();
  useEffect(() => {
    if (provider) {
      const userToken = storage.getUserToken();
      if (!userToken) {
        signGetToken();
      } else {
        getProfile();
      }
    }
  }, [provider]);

  useEffect(() => {
    if (dataProfile.error) {
      if (dataProfile?.error?.message === 'User not register') {
        return;
      }
      signGetToken();
    }
  }, [dataProfile.error]);

  const signGetToken = async () => {
    const web3 = new Web3(provider);
    const token = await Web3Token.sign(
      (msg: any) => web3.eth.personal.sign(msg, provider.selectedAddress, '', () => {}),
      '1d'
    );
    storage.setUserToken(token);
    window.location.reload();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full text-sm font-medium bg-indigo-600 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {provider ? (
            <>
              {dataProfile.data?.me ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={dataProfile.data?.me?.avatar ? dataProfile.data?.me?.avatar : anonymousImage}
                  alt="avatar"
                />
              ) : (
                <UserCircleIcon className="h-8 w-8 text-indigo-600" />
              )}
            </>
          ) : (
            <img className="m-1.5" src={walletSVG} alt="wallet" />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {provider ? (
            <>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500' : 'text-gray-900'
                    } group rounded-md w-full px-2 py-2 text-left`}
                  >
                    {dataProfile.data?.me ? (
                      <p>{`${dataProfile.data?.me?.firstName} ${dataProfile.data?.me?.lastName}`}</p>
                    ) : null}
                    <span className="text-sm">{signedInAddress}</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? 'bg-violet-500' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Timeline
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`${
                      active ? 'bg-violet-500' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    to={`/profile`}
                  >
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={logoutOfWeb3Modal}
                  >
                    Disconnect
                  </button>
                )}
              </Menu.Item>
            </>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-violet-500' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  onClick={loadWeb3Modal}
                >
                  Connect Wallet
                </button>
              )}
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default memo(MenuUser);

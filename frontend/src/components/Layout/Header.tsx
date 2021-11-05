import * as React from 'react';

import { Link } from '../Elements/Link/Link';

import homeSVG from '@/assets/icons/home.svg';
import languageSVG from '@/assets/icons/language.svg';
import walletSVG from '@/assets/icons/wallet.svg';
import useWeb3Modal from '@/hooks/useWeb3Modal';

export const Header = () => {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal, setSignedInAddress] = useWeb3Modal();
  return (
    <>
      <div className="max-width mx-auto">
        <div className="row-span-3 flex pt-5 pb-5 shadow-xl px-10 justify-between">
          <span className="flex">
            <svg
              width="40"
              height="40"
              viewBox="0 0 51 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.2698 14.7572C24.2384 13.6206 26.6639 13.6206 28.6325 14.7572L36.0456 19.0371C38.0143 20.1737 39.227 22.2742 39.227 24.5474V33.1072C39.227 35.3805 38.0143 37.481 36.0456 38.6175L28.6325 42.8975C26.6639 44.034 24.2384 44.034 22.2698 42.8975L14.8567 38.6175C12.888 37.481 11.6753 35.3805 11.6753 33.1072V24.5474C11.6753 22.2742 12.888 20.1737 14.8567 19.0371L22.2698 14.7572Z"
                fill="#8B5CF6"
              />
              <path
                d="M25.4512 0.195312L26.852 21.1159C27.0032 23.3744 29.3979 24.757 31.4293 23.7587L50.2477 14.5115L32.8302 26.185C30.9499 27.4451 30.9499 30.2104 32.8302 31.4705L50.2477 43.1439L31.4293 33.8968C29.3979 32.8985 27.0032 34.2811 26.852 36.5394L25.4512 57.4602L24.0504 36.5396C23.8992 34.2811 21.5045 32.8985 19.4731 33.8968L0.654785 43.1439L18.0721 31.4705C19.9525 30.2104 19.9525 27.4451 18.0721 26.185L0.654785 14.5115L19.4731 23.7587C21.5045 24.757 23.8992 23.3744 24.0504 21.1161L25.4512 0.195312Z"
                fill="white"
              />
              <path
                d="M25.4513 12.9201C28.0868 12.9201 30.2233 10.7836 30.2233 8.14805C30.2233 5.51251 28.0868 3.37598 25.4513 3.37598C22.8157 3.37598 20.6792 5.51251 20.6792 8.14805C20.6792 10.7836 22.8157 12.9201 25.4513 12.9201Z"
                fill="#FBBF24"
              />
              <path
                d="M25.4513 54.2785C28.0868 54.2785 30.2233 52.142 30.2233 49.5064C30.2233 46.8709 28.0868 44.7344 25.4513 44.7344C22.8157 44.7344 20.6792 46.8709 20.6792 49.5064C20.6792 52.142 22.8157 54.2785 25.4513 54.2785Z"
                fill="#FBBF24"
              />
              <path
                d="M39.2265 20.874C40.5443 23.1565 43.4628 23.9385 45.7453 22.6207C48.0277 21.303 48.8098 18.3844 47.492 16.102C46.1742 13.8195 43.2557 13.0375 40.9732 14.3553C38.6908 15.673 37.9088 18.5916 39.2265 20.874Z"
                fill="#FBBF24"
              />
              <path
                d="M3.40963 41.5528C4.7274 43.8352 7.64595 44.6172 9.9284 43.2995C12.2108 41.9817 12.9929 39.0631 11.6751 36.7807C10.3573 34.4982 7.43877 33.7162 5.15633 35.034C2.87388 36.3518 2.09186 39.2703 3.40963 41.5528Z"
                fill="#FBBF24"
              />
              <path
                d="M11.6754 20.8742C12.9932 18.5918 12.2112 15.6732 9.92873 14.3554C7.64628 13.0377 4.72773 13.8197 3.40996 16.1021C2.09219 18.3846 2.87421 21.3031 5.15666 22.6209C7.43911 23.9387 10.3577 23.1566 11.6754 20.8742Z"
                fill="#FBBF24"
              />
              <path
                d="M47.4923 41.5529C48.8101 39.2705 48.0281 36.3519 45.7456 35.0341C43.4632 33.7164 40.5446 34.4984 39.2269 36.7808C37.9091 39.0633 38.6911 41.9818 40.9736 43.2996C43.256 44.6174 46.1746 43.8354 47.4923 41.5529Z"
                fill="#FBBF24"
              />
            </svg>
            <p className="font-bold text-sm lg:text-2xl md:flex md:items-center text-yellow-nft4">
              nft4charity
            </p>
          </span>
          <ul className="flex items-center text-center justify-center cursor-pointer font-bold text-base text-black">
            <li className="mr-10">
              <img className="h-5 w-auto" src={homeSVG} alt="home icon" />
            </li>
            <li className="mr-10 text-sm lg:text-xl">About</li>
            <li className="mr-10 text-sm lg:text-xl">
              <Link to={`/campaigns`}>Campaigns</Link>
            </li>
            <li className="mr-10 text-sm lg:text-xl">NFTs Market</li>
            <li className="mr-10 text-sm lg:text-xl">
              <Link to={`/mint`}>Mint</Link>
            </li>
            <li className="mr-10 text-sm lg:text-xl">Certificate</li>
          </ul>
          <ul className="flex items-center">
            <li className="flex">
              <button
                className="btn flex bg-button-purple p-2 rounded-3xl"
                onClick={() => {
                  if (!provider) {
                    loadWeb3Modal();
                  } else {
                    logoutOfWeb3Modal();
                  }
                }}
              >
                <img className="h-7 w-auto" src={walletSVG} alt="wallet icon" />
                <p className="font-bold text-sm lg:text-xl md:m-auto text-white ml-1">
                  {!provider ? 'Connect' : setSignedInAddress}
                </p>
              </button>
            </li>
            <li className="flex ml-5 cursor-pointer">
              <img className="h-6 w-auto" src={languageSVG} alt="language icon" />
              <span className="pl-2">En</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

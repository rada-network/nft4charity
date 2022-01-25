/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from '../Elements/Link/Link';

import logoSVG from '@/assets/logo.svg';
import MenuMobile from './MenuMobile';
import MenuUser from './MenuUser';

export const Header = () => {
  return (
    <>
      <header className="sticky top-0 left-0 z-10 max-width mx-auto shadow-sm bg-white">
        <div className="max-w-screen-xl p-4 mx-auto">
          <div className="flex items-center justify-between space-x-4 lg:space-x-10">
            <div className="md:hidden">
              <MenuMobile />
            </div>
            <div>
              <span className="flex items-center">
                <img src={logoSVG} alt="logo" />
                <p className="font-bold text-sm lg:text-2xl md:flex md:items-center text-yellow-nft4">
                  nft4charity
                </p>
              </span>
            </div>
            <ul className="hidden md:flex items-center text-center justify-center cursor-pointer font-bold text-base text-black">
              <li className="sm:mr-10 text-sm lg:text-xl">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="sm:mr-10 text-sm lg:text-xl">About</li>
              <li className="sm:mr-10 text-sm lg:text-xl">
                <Link to={`/campaigns`}>Campaigns</Link>
              </li>
              <li className="sm:mr-10 text-sm lg:text-xl">NFTs Market</li>
              <li className="sm:mr-10 text-sm lg:text-xl">
                <Link to={`/mint`}>Mint</Link>
              </li>
            </ul>
            <div>
              <MenuUser />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

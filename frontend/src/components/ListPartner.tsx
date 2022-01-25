import fullHouseLogo from '@/assets/icons/partner/fullHouse.svg';
import kardiaChainLogo from '@/assets/icons/partner/kardiaChain.svg';
import spaceShipLogo from '@/assets/icons/partner/spaceShip.svg';
import yellowBlockLogo from '@/assets/icons/partner/yellowBlock.svg';
import radaCharityLogo from '@/assets/images/radaCharity.png';

export const ListPartner = () => {
  return (
    <div className="sm:absolute -bottom-16 transform right-2/4 w-10/12 sm:translate-x-2/4 bg-white shadow-xl py-10 px-5 m-auto sm:rounded-full">
      <ul className="flex flex-col sm:flex-row items-center text-center justify-center cursor-pointer font-bold text-base text-black">
        <li className="sm:mr-10 flex">
          <img src={radaCharityLogo} alt="Rada Charity Logo" />
          <p className="font-bold text-2xl text-yellow-nft4 m-auto">nft4charity</p>
        </li>
        <li className="mt-10 sm:mr-10 sm:mt-0">
          <img src={fullHouseLogo} alt="Rada Charity Logo" />
        </li>
        <li className="mt-10 sm:mr-10 sm:mt-0">
          <img src={yellowBlockLogo} alt="Yellow Block Logo" />
        </li>
        <li className="mt-10 sm:mr-10 sm:mt-0">
          <img src={spaceShipLogo} alt="" />
        </li>
        <li className="mt-10 sm:mr-10 sm:mt-0">
          <img src={kardiaChainLogo} alt="Kardia Chain Logo" />
        </li>
      </ul>
    </div>
  );
};

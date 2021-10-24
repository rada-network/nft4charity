import fullHouseLogo from '@/assets/icons/partner/fullHouse.svg';
import kardiaChainLogo from '@/assets/icons/partner/kardiaChain.svg';
import spaceShipLogo from '@/assets/icons/partner/spaceShip.svg';
import yellowBlockLogo from '@/assets/icons/partner/yellowBlock.svg';
import radaCharityLogo from '@/assets/images/radaCharity.png';

export const ListPartner = () => {
  return (
    <div className="absolute -bottom-16 transform right-2/4 w-10/12 translate-x-2/4 bg-white shadow-xl py-10 px-5 m-auto rounded-full">
      <ul className="flex items-center text-center justify-center cursor-pointer font-bold text-base text-black">
        <li className="mr-10 flex">
          <img src={radaCharityLogo} alt="Rada Charity Logo" />
          <p className="font-bold text-2xl text-yellow-nft4 m-auto">nft4charity</p>
        </li>
        <li className="mr-10">
          <img src={fullHouseLogo} alt="Rada Charity Logo" />
        </li>
        <li className="mr-10">
          <img src={yellowBlockLogo} alt="Yellow Block Logo" />
        </li>
        <li className="mr-10">
          <img src={spaceShipLogo} alt="" />
        </li>
        <li className="mr-10">
          <img src={kardiaChainLogo} alt="Kardia Chain Logo" />
        </li>
      </ul>
    </div>
  );
};

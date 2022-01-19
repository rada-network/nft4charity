import ctyptoPurpleSVG from '@/assets/icons/cryptoPurple.svg';

export const LatestContributor = () => {
  return (
    <div className="shadow-xl px-10 py-5 m-auto sm:rounded-full bg-yellow-nft-100 w-max">
      <ul className="flex flex-col sm:flex-row items-center text-center justify-center cursor-pointer text-black">
        <li className="sm:mr-10">
          <img src={ctyptoPurpleSVG} alt="" />
        </li>
        <li className="sm:mr-10">
          <span className="font-Open text-sm">0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee</span>
        </li>
        <li className="sm:mr-10">
          <span className="font-bold text-sm text-yellow-nft4">10ETH</span>
        </li>
        <li className="sm:mr-10">
          <span className="text-sm font-semibold italic font-Open">Latest</span>
        </li>
        <li className="sm:mr-10">
          <span className="text-sm italic font-Open">Thank for great action!</span>
        </li>
      </ul>
    </div>
  );
};

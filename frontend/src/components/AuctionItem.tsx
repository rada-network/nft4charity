import hammerSVG from '@/assets/icons/hammer.svg';
import designerAvatar from '@/assets/images/designerAvatar.png';
import nftItemBuffaloPNG from '@/assets/images/nftItemBuffalo.png';

export const AuctionItem = () => {
  return (
    <div className="flex flex-col sm:flex-row mt-32 justify-center items-center grid-col-2 gap-x-20">
      <div>
        <img src={nftItemBuffaloPNG} alt="" />
      </div>
      <div className="mt-3">
        <div className="flex">
          <img src={hammerSVG} alt="" />
          <div className="ml-10">
            <p className="font-Merriweather font-bold text-2xl">Bid NFT Art</p>
            <p className="font-Open text-sm">
              Bid on an unique piece of art. Proceed goes to chairty.
            </p>
          </div>
        </div>
        <div className="flex mx-auto shadow-xl p-5 w-max rounded-full sm:my-5 mt-5 sm:mt-0">
          <img src={designerAvatar} alt="" />
          <div className="ml-5 ">
            <p className="font-bold text-sm">@chiep | rada</p>
            <p className="italic text-sm">Contributor</p>
          </div>
        </div>
        <p className="font-bold text-center mt-5 sm:mt-0 sm:text-left text-2xl font-Merriweather">
          Buffalo Rada member
        </p>
        <p className="text-sm text-center sm:text-left font-Open">
          rainbow horn | diamond teeth | hologram jacket...
        </p>

        <div className="flex justify-center sm:justify-start mt-5">
          <div className="font-Open font-bold mr-10">
            <p className="text-sm">Current Bid</p>
            <p className="text-4xl">23.00 ETH</p>
            <p className="text-sm">$79.000</p>
          </div>
        </div>
        <button className="btn flex mx-auto sm:mx-0 bg-button-purple p-2 rounded-3xl mt-5">
          <span className="font-bold text-xl text-white ml-1 px-5">View more</span>
        </button>
      </div>
    </div>
  );
};

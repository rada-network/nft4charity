import hammerSVG from '@/assets/icons/hammer.svg';
import designerAvatar from '@/assets/images/designerAvatar.png';
import nftItemBuffaloPNG from '@/assets/images/nftItemBuffalo.png';

export const AuctionItem = () => {
  return (
    <div className="flex mt-32 justify-center grid-col-2 gap-x-20">
      <div>
        <img src={nftItemBuffaloPNG} alt="" />
      </div>
      <div className="">
        <div className="flex">
          <img src={hammerSVG} alt="" />
          <div className="ml-10">
            <p className="font-Merriweather font-bold text-2xl">Bid NFT Art</p>
            <p className="font-Open text-sm">
              Bid on an unique piece of art. Proceed goes to chairty.
            </p>
          </div>
        </div>
        <div className="flex shadow-xl p-5 w-max rounded-full my-5">
          <img src={designerAvatar} alt="" />
          <div className="ml-5 ">
            <p className="font-bold text-sm">@chiep | rada</p>
            <p className="italic text-sm">Contributor</p>
          </div>
        </div>
        <p className="font-bold text-2xl font-Merriweather">Buffalo Rada member</p>
        <p className="text-sm font-Open">rainbow horn | diamond teeth | hologram jacket...</p>

        <div className="flex mt-5">
          <div className="font-Open font-bold mr-10">
            <p className="text-sm">Current Bid</p>
            <p className="text-4xl">23.00 ETH</p>
            <p className="text-sm">$79.000</p>
          </div>
        </div>
        <button className="btn flex bg-button-purple p-2 rounded-3xl mt-5">
          <span className="font-bold text-xl text-white ml-1 px-5">View more</span>
        </button>
      </div>
    </div>
  );
};

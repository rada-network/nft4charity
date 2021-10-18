import cryptoBlackSVG from '@/assets/icons/cryptoBlack.svg';
import imageBlackSVG from '@/assets/icons/imageBlack.svg';
import imagesBluezoneCovid from '@/assets/images/bluezoneApp.png';
import donatePNG from '@/assets/images/donate.png';
import nftItemPNG from '@/assets/images/nftItem.png';
import transparentPNG from '@/assets/images/transparent.png';
import { AuctionItem } from '@/components/AuctionItem';
import { LatestContributor } from '@/components/LatestContributor';
import { Testimonial } from '@/components/Layout/Testimonial';
import { ListPartner } from '@/components/ListPartner';

export const Landing = () => {
  return (
    <>
      <div className="">
        <div className="bg-main-pattern p-20 relative">
          <div className="w-4/5 m-auto">
            <div className="grid-cols-2 flex justify-center ">
              <div className="mt-16">
                <p className="font-black text-5xl font-Merriweather leading-tight">
                  The way you can help the COVID-19 patients
                </p>
                <p className="pt-5 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
                </p>
                <div className="flex pt-5">
                  <button className="bg-button-purple px-3 py-2 mr-8 rounded-3xl hover:text-red hover:bg-purple">
                    <span className="font-bold text-sm lg:text-xl text-white ml-1 hover:text-red ">
                      READ MORE
                    </span>
                  </button>
                  <button className="bg-white px-3 py-2 rounded-3xl border-3 border-solid border-purple-mixin-700">
                    <span className="font-bold text-sm lg:text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-mixin-400 to-purple-mixin-700 ">
                      CREATE CAMPAIGN
                    </span>
                  </button>
                </div>
              </div>
              <div className="">
                <img className="" alt="" src={imagesBluezoneCovid} />
              </div>
            </div>
          </div>
          <ListPartner />
        </div>

        <div className="mt-28 mb-10">
          <p className="m-auto w-full flex justify-center flex-none font-Merriweather font-bold text-4xl md:text-xl">
            Why should you donate with cryptocurrency?
          </p>
          <p className="text-sm w-1/3 m-auto font-Open mt-10 text-center ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
          </p>
        </div>

        <div className="w-4/5 m-auto">
          <div className="flex">
            <div className="grid grid-cols-3">
              <div className="mx-10">
                <img src={transparentPNG} alt="" className="m-auto" />
                <p className="my-5 w-full flex justify-center flex-none mx-auto font-bold font-Merriweather text-sm lg:text-3xl text-center">
                  Transparent
                </p>
                <p className="font-Open text-sm italic w-full flex justify-center flex-none text-center ">
                  Maximum privacy protect for donors
                </p>
                <p className="font-Open text-sm w-full flex justify my-5 text-center ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua....
                </p>
              </div>
              <div className="mx-10">
                <img src={donatePNG} alt="" className="m-auto" />
                <p className="my-5 w-full flex justify-center flex-none font-bold font-Merriweather text-sm lg:text-3xl text-center ">
                  Easy to donate
                </p>
                <p className="font-Open text-sm italic w-full flex justify-center flex-none text-center ">
                  Via to Metamask or Binance Wallet
                </p>
                <p className="font-Open text-sm w-full flex justify my-5 text-center ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua....
                </p>
              </div>
              <div className="mx-10">
                <img src={nftItemPNG} alt="" className="m-auto" />
                <p className="my-5 w-full flex justify-center flex-none font-bold font-Merriweather text-sm lg:text-3xl text-center ">
                  Funny & Value
                </p>
                <p className="font-Open text-sm italic w-full flex justify-center flex-none text-center ">
                  Own an NFT, forever on the blockchains
                </p>
                <p className="font-Open text-sm w-full flex justify my-5 text-center ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua...
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 mb-10">
            <p className="m-auto w-full flex justify-center flex-none font-Merriweather font-bold text-4xl">
              What can you do?
            </p>
            <p className="text-sm w-2/3 m-auto font-Open mt-10 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
            </p>
          </div>

          <LatestContributor />

          <div className="flex justify-around grid-cols-2">
            <div className="flex mt-10">
              <img src={cryptoBlackSVG} alt="" />
              <div className="ml-10">
                <p className="font-bold text-2xl font-Merriweather">By Cryptocurrency</p>
                <p className="text-sm font-Open">Donate your cryptocurency to public wallet</p>
                <button className="btn flex bg-button-purple p-2 rounded-3xl mt-5">
                  <span className="font-bold text-xl text-white ml-1 px-5">View more</span>
                </button>
              </div>
            </div>
            <div className="flex mt-10">
              <img src={imageBlackSVG} alt="" />
              <div className="ml-10">
                <p className="font-bold text-2xl font-Merriweather">Mint Random NFT</p>
                <p className="text-sm font-Open">Mint a random NFT to support charity</p>
                <button className="btn flex bg-button-purple p-2 rounded-3xl mt-5">
                  <span className="font-bold text-xl text-white ml-1 px-5">View more</span>
                </button>
              </div>
            </div>
          </div>

          <AuctionItem />
        </div>

        <Testimonial />
      </div>
    </>
  );
};

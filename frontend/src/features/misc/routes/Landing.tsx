import cryptoBlackSVG from '@/assets/icons/cryptoBlack.svg';
import ctyptoPurpleSVG from '@/assets/icons/cryptoPurple.svg';
import hammerSVG from '@/assets/icons/hammer.svg';
import imageBlackSVG from '@/assets/icons/imageBlack.svg';
import fullHouseLogo from '@/assets/icons/partner/fullHouse.svg';
import kardiaChainLogo from '@/assets/icons/partner/kardiaChain.svg';
import spaceShipLogo from '@/assets/icons/partner/spaceShip.svg';
import yellowBlockLogo from '@/assets/icons/partner/yellowBlock.svg';
import imagesBluezoneCovid from '@/assets/images/bluezoneApp.png';
import ceoAvatar from '@/assets/images/ceoAvatar.png';
import designerAvatar from '@/assets/images/designerAvatar.png';
import designerContributorPng from '@/assets/images/designerContributor.png';
import donatePNG from '@/assets/images/donate.png';
import nftItemPNG from '@/assets/images/nftItem.png';
import nftItemBuffaloPNG from '@/assets/images/nftItemBuffalo.png';
import quotesPng from '@/assets/images/quotes.png';
import radaCharityLogo from '@/assets/images/radaCharity.png';
import transparentPNG from '@/assets/images/transparent.png';

export const Landing = () => {
  return (
    <>
      <div className="">
        <div className="bg-main-pattern flex justify-center p-20">
          <div className=" border-solid w-1/4">
            <p className="font-black text-5xl font-Merriweather leading-tight">
              The way you can help the COVID-19 patients
            </p>
            <p className="pt-5 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
            </p>
            <div className="flex pt-5 justify-between">
              <button className="bg-button-purple px-3 py-2 rounded-3xl hover:text-red hover:bg-purple">
                <span className="font-bold text-xl text-white ml-1 hover:text-red">READ MORE</span>
              </button>
              <button className="bg-white px-3 py-2 rounded-3xl border-3 border-solid border-purple-mixin-700">
                <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-mixin-400 to-purple-mixin-700">
                  CREATE CAMPAIGN
                </span>
              </button>
            </div>
          </div>
          <div className="w-1/4">
            <img
              className="ml-auto mr-auto"
              // style={{ width: '80%', height: '80%' }}
              alt=""
              src={imagesBluezoneCovid}
            />
          </div>
        </div>

        <div className="shadow-xl py-10 px-5 w-2/3 m-auto rounded-full">
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

        <div className="mt-20 mb-10">
          <p className="m-auto w-full flex justify-center flex-none font-Merriweather font-bold text-4xl">
            Why should you donate with cryptocurrency?
          </p>
          <p className="text-sm w-1/3 m-auto font-Open mt-10 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
          </p>
        </div>

        <div className="flex justify-center w-2/3 m-auto">
          <div className="grid grid-cols-3">
            <div className="mx-10">
              <img src={transparentPNG} alt="" className="m-auto" />
              <p className="my-5 w-full flex justify-center flex-none mx-auto font-bold font-Merriweather text-3xl">
                Transparent
              </p>
              <p className="font-Open text-sm italic w-full flex justify-center flex-none">
                Maximum privacy protect for donors
              </p>
              <p className="font-Open text-sm w-full flex justify my-5 text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua....
              </p>
            </div>
            <div className="mx-10">
              <img src={donatePNG} alt="" className="m-auto" />
              <p className="my-5 w-full flex justify-center flex-none font-bold font-Merriweather text-3xl">
                Easy to donate
              </p>
              <p className="font-Open text-sm italic w-full flex justify-center flex-none">
                Via to Metamask or Binance Wallet
              </p>
              <p className="font-Open text-sm w-full flex justify my-5 text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua....
              </p>
            </div>
            <div className="mx-10">
              <img src={nftItemPNG} alt="" className="m-auto" />
              <p className="my-5 w-full flex justify-center flex-none font-bold font-Merriweather text-3xl">
                Funny & Value
              </p>
              <p className="font-Open text-sm italic w-full flex justify-center flex-none">
                Own an NFT, forever on the blockchains
              </p>
              <p className="font-Open text-sm w-full flex justify my-5 text-center">
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
          <p className="text-sm w-1/3 m-auto font-Open mt-10 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
          </p>
        </div>

        <div className="shadow-xl px-10 py-5 m-auto rounded-full bg-yellow-nft-100 w-max">
          <ul className="flex items-center text-center justify-center cursor-pointer text-black">
            <li className="mr-10">
              <img src={ctyptoPurpleSVG} alt="" />
            </li>
            <li className="mr-10">
              <span className="font-Open text-sm">0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee</span>
            </li>
            <li className="mr-10">
              <span className="font-bold text-sm text-yellow-nft4">10ETH</span>
            </li>
            <li className="mr-10">
              <span className="text-sm font-semibold italic font-Open">Latest</span>
            </li>
            <li className="mr-10">
              <span className="text-sm italic font-Open">Thank for great action!</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center w-max m-auto">
          <div className="mx-10 flex mt-10 mr-10">
            <img src={cryptoBlackSVG} alt="" />
            <div className="ml-10">
              <p className="font-bold text-2xl font-Merriweather">By Cryptocurrency</p>
              <p className="text-sm font-Open">Donate your cryptocurency to public wallet</p>
              <button className="btn flex bg-button-purple p-2 rounded-3xl mt-5">
                <span className="font-bold text-xl text-white ml-1 px-5">View more</span>
              </button>
            </div>
          </div>
          <div className="mx-10 flex mt-10 ml-10">
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

        <div className="flex w-max m-auto mt-32 grid-col-2">
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
            <img src={designerContributorPng} alt="" className="my-5" />
            <p className="font-bold text-2xl font-Merriweather">Buffalo Rada member</p>
            <p className="text-sm font-Open">rainbow horn | diamond teeth | hologram jacket...</p>
            <button className="btn flex bg-button-purple p-2 rounded-3xl mt-5">
              <span className="font-bold text-xl text-white ml-1 px-5">View more</span>
            </button>
            <div className="flex">
              <div className="font-Open font-bold mr-10">
                <p className="text-sm">Current Bid</p>
                <p className="text-4xl">23.00 ETH</p>
                <p className="text-sm">$79.000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 w-full mt-20 p-10">
          <p className="m-auto w-full flex justify-center flex-none font-Merriweather font-bold text-4xl">
            Testimonials
          </p>
          <p className="font-Open text-sm w-1/3 m-auto mt-5 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
          </p>
          <div className="flex w-2/3 justify-center m-auto mt-10">
            <div className="flex mr-10">
              <img src={quotesPng} alt="" />
              <div className="ml-5">
                <span className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed euismod quis
                  sit gravida pharetra sit. Cursus vel enim pretium vulputate semper sem elit magna
                  neque. Aliquet adipisc
                </span>
                <div className="flex shadow-xl p-5 w-max rounded-full">
                  <img src={designerAvatar} alt="" />
                  <div className="ml-5">
                    <p className="font-bold text-sm">@chiep | rada</p>
                    <p className="italic text-sm">Contributor</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <img src={quotesPng} alt="" />
              <div className="ml-5">
                <span className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed euismod quis
                  sit gravida pharetra sit. Cursus vel enim pretium vulputate semper sem elit magna
                  neque. Aliquet adipisc
                </span>
                <div className="flex shadow-xl p-5 w-max rounded-full">
                  <img src={ceoAvatar} alt="" />
                  <div className="ml-5">
                    <p className="font-bold text-sm">@hung dinh | rada</p>
                    <p className="italic text-sm">CEO Rada Charity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

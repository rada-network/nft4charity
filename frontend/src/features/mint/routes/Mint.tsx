import Coverflow from 'react-coverflow';
import React, { useEffect, useState } from 'react';

import contentCopySVG from '@/assets/icons/content_copy.svg';
import designerAvatar from '@/assets/images/designerAvatar.png';
// import donatePNG from '@/assets/images/donate.png';
// import nftItemPNG from '@/assets/images/nftItem.png';
// import nftItemBuffaloPNG from '@/assets/images/nftItemBuffalo.png';
import { BlockLists } from '@/components/BlockLists';
import { Table, Spinner } from '@/components/Elements';
import { SelectField } from '@/components/Form';
import { InputField } from '@/components/Form/InputField';
import { LatestContributor } from '@/components/LatestContributor';
import { formatDateTypeNumber } from '@/utils/format';

import { gql, useQuery } from '@apollo/client';

interface ImageAttributes {
  name: string;
  rarity: string;
}
interface Image {
  dna: string;
  name: string;
  description: string;
  image: string;
  edition: number;
  data: number;
  attributes: ImageAttributes[];
}

const campaignId = '61a141e81998d34796f65639';
const QueryMintCampaign = gql`
  query getCampaign($id: String!) {
    campaign(id: $id) {
      _id
      name
      description
      goal
      startedAt
      endedAt
      coverImgUrl
      thumbnailImgUrl
      type
      createdAt
      updatedAt
      userId
      wallets {
        _id
        address
      }
      nftMetadata {
        _id
        campaignId
        ipfsBaseUrl
        nftUrls
      }
    }
  }
`;

const renderTable = () => {
  return (
    <Table
      isShowHeader={false}
      data={[
        {
          id: '1',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '2',
          wallet_address: '0x95O5Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '5 BNB',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '3',
          wallet_address: '0x95O5Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '0.5 BTC',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '4',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '5',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '6',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '7',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '8',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '9',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '10',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '11',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '12',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '13',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '14',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '15',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
        {
          id: '16',
          wallet_address: '0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee',
          amount: '10 ETH',
          sent_date: 1633860939,
          wishes: 'Thanks for great action!',
        },
      ]}
      columns={[
        {
          title: 'Wallet Address',
          field: 'wallet_address',
        },
        {
          title: 'Amount',
          field: 'amount',
          Cell({ entry: { amount } }) {
            return <span className="text-yellow-nft4 font-bold">{amount}</span>;
          },
        },
        {
          title: 'Sent Date',
          field: 'sent_date',
          Cell({ entry: { sent_date } }) {
            return (
              <span className="font-Open italic text-sm font-semibold">
                {formatDateTypeNumber(sent_date)}
              </span>
            );
          },
        },
        {
          title: '',
          field: 'wishes',
          Cell({ entry: { wishes } }) {
            return <span className="font-Open italic text-sm">{wishes}</span>;
          },
        },
      ]}
    />
  );
};

export const Mint = () => {
  const [imgList, setImgList] = useState<Image[]>([]);
  const [currentActiveImg, setCurrentActiveImg] = useState<number>(0);

  const {
    data: campaignData,
    loading,
    error,
  } = useQuery(QueryMintCampaign, {
    variables: { id: campaignId },
  });

  useEffect(() => {
    if (campaignData) {
      const getImg = campaignData.campaign.nftMetadata.nftUrls.map(async (url: string) => {
        return await fetch(url).then((response) => response.json());
      });
      Promise.all(getImg).then((img) => {
        setImgList(img as Image[]);
      });
    }
  }, [campaignData]);

  const attributesBlocks =
    imgList.length > 0
      ? imgList[currentActiveImg].attributes.map((item) => {
          return { title: '', content: item.name, rate: item.rarity };
        })
      : [];

  if (loading) return <Spinner />;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <div className="relative bg-main-pattern">
        <Coverflow
          width="100%"
          height="500"
          displayQuantityOfSide={2}
          navigation={false}
          enableScroll={false}
          clickable={true}
          active={currentActiveImg}
        >
          {imgList.map((img) => (
            <img
              onClick={() => {
                setCurrentActiveImg(img.edition - 1);
              }}
              key={img.edition}
              src={img.image}
              alt=""
              className="m-auto height-full"
            />
          ))}
        </Coverflow>
      </div>

      <div className="transform w-full bg-white shadow-xl p-5 m-auto">
        <ul className="flex items-start text-center justify-center cursor-pointer font-bold text-base text-black">
          <li>
            <InputField
              className="w-52 mr-10"
              label="Amount sold"
              registration={{ name: 'amountSolds' }}
              type="number"
            />
          </li>
          <li className="mr-10">
            <div className="flex">
              <SelectField
                label="Network"
                className="w-52 mr-10"
                options={[
                  { label: 'Ethereum', value: 'ethereum' },
                  { label: 'BNB', value: 'bnb' },
                ]}
                registration={{
                  name: 'network',
                }}
              />
              <InputField
                className="w-52"
                label="Units"
                registration={{ name: 'units' }}
                type="number"
              />
            </div>
            <div className="flex mt-2">
              <span className="font-Open text-sm text-black-555 mr-5 items-center flex">
                0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee
              </span>
              <img src={contentCopySVG} alt="" />
            </div>
          </li>
          <li className="mx-0 my-auto">
            <button className="btn flex bg-button-purple p-2 rounded-3xl">
              <span className="font-bold text-xl text-white ml-1">Random Mint</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="container my-10 w-4/5 m-auto">
        <BlockLists listBlock={attributesBlocks} />
      </div>

      <div className="mt-28 mb-10">
        <img src={designerAvatar} alt="" className="m-auto w-px-112" />
        <p className="m-auto w-full flex justify-center flex-none font-Merriweather font-bold text-4xl">
          Creator - Alex Ace
        </p>
        <p className="text-sm w-1/3 m-auto font-Open mt-10 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
        </p>
      </div>
      <div className="mt-28 mb-10">
        <p className="m-auto w-full flex justify-center flex-none font-Merriweather font-bold text-4xl">
          Recent NFT minting
        </p>
        <p className="text-sm w-1/3 m-auto font-Open mt-10 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
        </p>
      </div>
      <div className="w-4/5 m-auto">
        <LatestContributor />
        <div className="mt-10">{renderTable()}</div>
      </div>
    </>
  );
};

import Coverflow from 'react-coverflow';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
// import donatePNG from '@/assets/images/donate.png';
// import nftItemPNG from '@/assets/images/nftItem.png';
// import nftItemBuffaloPNG from '@/assets/images/nftItemBuffalo.png';
import { BlockLists } from '@/components/BlockLists';
import { Table, Spinner } from '@/components/Elements';
import { LatestContributor } from '@/components/LatestContributor';
import { formatDateTypeNumber } from '@/utils/format';

import { gql, useQuery } from '@apollo/client';
import { axios } from '@/lib/axios';
import { Path, useForm, UseFormRegister } from 'react-hook-form';
import { mintToken } from '@/web3/web3Client';
import useWeb3Modal from '@/hooks/useWeb3Modal';
import { useNotificationStore } from '@/stores/notifications';

interface ImageAttributes {
  trait_type: string;
  value: string;
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

const campaignId = '61be4047ab01db34394b52c5';
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
      isShowHeader={true}
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
          title: 'STT',
          field: 'id',
          Cell({ entry: { id } }) {
            return <span className="font-Open text-sm font-semibold">{id}</span>;
          },
        },
        {
          title: 'Distributor',
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

interface IFormValues {
  Network: string;
  Price: number;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  className: string;
};

const Input = ({ label, register, required, className }: InputProps) => (
  <div className="text-left">
    <label className={clsx('block text-sm font-medium text-gray-700', className)}>{label}</label>
    <input
      className={clsx(
        'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
        className
      )}
      {...register(label, { required })}
    />
  </div>
);

// eslint-disable-next-line react/display-name
const SelectInput = React.forwardRef<
  HTMLSelectElement,
  { label: string; className: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, name, label, className }, ref) => (
  <div className="text-left">
    <label className={clsx('block text-sm font-medium text-gray-700', className)}>{label}</label>
    <select
      className={clsx(
        'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md',
        className
      )}
      name={name}
      ref={ref}
      onChange={onChange}
    >
      <option value="bnb">BNB</option>
    </select>
  </div>
));

export const Mint = () => {
  const [imgList, setImgList] = useState<Image[]>([]);
  const [currentActiveImg, setCurrentActiveImg] = useState<number>(0);
  const [provider] = useWeb3Modal();
  const { register, handleSubmit } = useForm<IFormValues>();

  const {
    data: campaignData,
    loading,
    error,
  } = useQuery(QueryMintCampaign, {
    variables: { id: campaignId },
  });

  const onSubmit = (data: IFormValues) => {
    mintNFT(data['Price']);
  };

  useEffect(() => {
    if (campaignData) {
      const getImg = campaignData.campaign.nftMetadata.nftUrls.map(async (url: string) => {
        return await axios.get(url);
      });
      Promise.all(getImg).then((img) => {
        setImgList(img as Image[]);
      });
    }
  }, [campaignData]);

  const mintNFT = (price: number) => {
    mintToken(provider, imgList[currentActiveImg].edition, price)
      .then((tx: any) => {
        console.log(tx);
        const message = `Transaction complete`;
        useNotificationStore.getState().addNotification({
          type: 'success',
          title: 'Success',
          message,
        });
      })
      .catch((err: any) => {
        console.log(err);
        const message = `Transactio fail with error ${err}`;
        useNotificationStore.getState().addNotification({
          type: 'error',
          title: 'Error',
          message,
        });
      });
  };

  const attributesBlocks =
    imgList.length > 0
      ? imgList[currentActiveImg].attributes.map((item) => {
          return { title: item.trait_type, content: item.value };
        })
      : [];

  if (loading) return <Spinner />;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <div className="relative bg-main-pattern">
        <Coverflow
          width="100%"
          height="600"
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="flex items-start flex-wrap text-center justify-center cursor-pointer font-bold text-base text-black">
            <li className="lg:mr-10">
              <div className="flex items-center">
                <SelectInput
                  className="w-auto mr-10 lg:w-52"
                  label="Network"
                  {...register('Network')}
                />
                <Input
                  className="w-auto lg:w-52"
                  label="Price"
                  register={register}
                  required={false}
                />
              </div>
            </li>
            <li className="mx-0 my-auto">
              <button
                className="btn flex bg-button-purple p-2 rounded-3xl"
                onClick={() => handleSubmit(onSubmit)}
              >
                <span className="font-bold text-xl text-white ml-1">Mint</span>
              </button>
            </li>
          </ul>
        </form>
      </div>

      <div className="container my-10 w-4/5 m-auto">
        <BlockLists listBlock={attributesBlocks} />
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

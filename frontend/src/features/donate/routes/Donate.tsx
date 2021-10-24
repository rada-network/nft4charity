import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import contentCopySVG from '@/assets/icons/content_copy.svg';
import cryptoYellow from '@/assets/icons/cryptoYellow.svg';
import qrCodeSVG from '@/assets/icons/qrCode.svg';
import vaccineVirus from '@/assets/images/vaccineVirus.svg';
import { Table } from '@/components/Elements';
import { SelectField } from '@/components/Form';
import { InputField } from '@/components/Form/InputField';
import { LatestContributor } from '@/components/LatestContributor';
import { formatDate, formatDateTypeNumber } from '@/utils/format';

import { WalletFilter } from '../types/index';

const CampaignByQuery = gql`
  query Campaign($id: String!) {
    campaign(id: $id) {
      _id
      name
      description
      goal
      startedAt
      endedAt
      coverImgUrl
    }
  }
`;

const GetListWalletByCampaignId = gql`
  query wallet($campaignId: String!) {
    walletFilter(wallet: { campaignId: $campaignId }) {
      address
      platform
      balance
      _id
      currency
    }
  }
`;

const GetTransactions = gql`
  query Wallet($id: String!) {
    wallet(id: $id) {
      _id
      currency
      transaction: transaction {
        id: _id
        walletId
        currency
        amount
        createdAt
        sourceAddress
        description
      }
    }
  }
`;

export const Donate = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const { id } = useParams();

  const { data: listWallet } = useQuery(GetListWalletByCampaignId, {
    variables: { campaignId: id },
  });

  const walletAddress = useWatch({
    name: 'network',
    control,
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
        network: listWallet?.walletFilter[0].address,
      });
    }, 1000);
  }, [reset, listWallet]);

  const { data: transactions } = useQuery(GetTransactions, {
    variables: {
      id: listWallet?.walletFilter.find((item: WalletFilter) => item.address === walletAddress)
        ?._id,
    },
  });

  const onSubmit = (data: any) => alert(JSON.stringify(data));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);

    (document as any).querySelector('.editor').innerText = 'Copied';
    setTimeout(() => {
      (document as any).querySelector('.editor').innerText = '';
    }, 3000);
  };

  const { data, loading, error } = useQuery(CampaignByQuery, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const renderTable = () => {
    return (
      <Table
        isShowHeader={false}
        data={transactions?.wallet?.transaction}
        columns={[
          {
            title: '',
            field: 'id',
          },
          {
            title: 'Wallet Address',
            field: 'sourceAddress',
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
            field: 'createdAt',
            Cell({ entry: { createdAt } }) {
              return (
                <span className="font-Open italic text-sm font-semibold">
                  {formatDateTypeNumber(createdAt)}
                </span>
              );
            },
          },
          {
            title: '',
            field: 'description',
            Cell({ entry: { description } }) {
              return <p className="font-Open italic text-sm">{description}</p>;
            },
          },
        ]}
      />
    );
  };

  return (
    <>
      <div className="bg-main-pattern p-20 relative">
        <div className="w-4/5 m-auto">
          <div className="grid-cols-2 flex justify-center ">
            <div className="mt-16">
              <p className="font-black text-5xl font-Merriweather leading-tight">
                {data?.campaign?.name}
              </p>
              <p className="pt-5 text-sm">{data?.campaign?.description}</p>
              <p className="font-Merriweather font-bold text-lg mt-5">Campaign Start</p>
              <p className="font-Open text-lg">{formatDate(data?.campaign?.startedAt)}</p>
            </div>
            <div className="">
              <img className="" alt="" src={vaccineVirus} />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-16 transform right-2/4 w-full lg:w-2/3 translate-x-2/4 bg-white shadow-xl p-5 m-auto rounded-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="flex items-center text-center justify-center cursor-pointer font-bold text-base text-black">
              <li className="mr-10 flex">
                <img src={cryptoYellow} alt="" />
              </li>
              <li className="mr-10">
                <img src={qrCodeSVG} alt="" />
              </li>
              <li className="mr-10">
                <div className="flex">
                  <SelectField
                    label="Network"
                    className="w-52 mr-10"
                    options={
                      listWallet
                        ? listWallet?.walletFilter.map((item: WalletFilter) => {
                            return { label: item?.currency, value: item?.address };
                          })
                        : []
                    }
                    registration={{ ...register('network', { required: true }) }}
                  />
                  <InputField
                    className="w-52"
                    label="Amount"
                    registration={{ name: 'amountValueDonate' }}
                    type="number"
                  />
                </div>
                <div className="flex mt-2">
                  <span className="font-Open text-sm text-black-555 mr-5 items-center flex">
                    {walletAddress}
                  </span>
                  <img src={contentCopySVG} alt="" onClick={copyToClipboard} />
                  <span className="editor ml-5 text-sm italic"></span>
                </div>
              </li>
              <li className="mr-10">
                <button className="btn flex bg-button-purple p-2 rounded-3xl" type="submit">
                  <span className="font-bold text-xl text-white ml-1">Donate</span>
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>

      <div className="mt-28 mb-10">
        <p className="m-auto w-full flex justify-center flex-none font-Merriweather font-bold text-4xl">
          Recent donate
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

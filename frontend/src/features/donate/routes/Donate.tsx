import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { WalletFilter } from '../types/index';

import contentCopySVG from '@/assets/icons/content_copy.svg';
import cryptoYellow from '@/assets/icons/cryptoYellow.svg';
import qrCodeSVG from '@/assets/icons/qrCode.svg';
import vaccineVirus from '@/assets/images/vaccineVirus.svg';
import { Spinner, Table } from '@/components/Elements';
import { SelectField } from '@/components/Form';
import { InputField } from '@/components/Form/InputField';
import { LatestContributor } from '@/components/LatestContributor';
import { formatDate, formatDateTypeNumber } from '@/utils/format';

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
  if (loading) return <Spinner />;
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
      <div className="bg-main-pattern relative py-16">
        <div className="w-4/5 m-auto">
          <div className="grid-cols-2 flex justify-center ">
            <div>
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

        <div className="w-full bg-white shadow-xl mx-auto mt-16 p-5 rounded-2xl lg:w-4/5 lg:relative lg:mt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="w-full flex flex-wrap items-center text-center justify-center cursor-pointer font-bold text-base text-black">
              <li className="hidden justify-center w-full md:flex lg:w-auto lg:mr-10">
                <img src={cryptoYellow} alt="" />
              </li>
              <li className="flex justify-center w-full my-10 md:mr-10 md:w-auto">
                <img src={qrCodeSVG} alt="" />
              </li>
              <li className="flex flex-wrap justify-center w-full md:w-auto">
                <div className="flex flex-wrap justify-center w-full md:w-auto md:mr-10">
                  <SelectField
                    label="Network"
                    className="w-full md:w-52 md:mr-10"
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
                    className="w-full md:w-52"
                    label="Amount"
                    registration={{ name: 'amountValueDonate' }}
                    type="number"
                  />
                </div>
                <div className="w-full flex justify-center mt-2 md:w-auto lg:mr-10">
                  <span className="font-Open text-sm text-black-555 mr-5 items-center flex">
                    {walletAddress}
                  </span>
                  <img src={contentCopySVG} alt="" onClick={copyToClipboard} />
                  <span className="editor ml-5 text-sm italic"></span>
                </div>
              </li>
              <li className="w-full text-center lg:w-auto lg:mr-10">
                <button
                  className="btn flex bg-button-purple mx-auto mt-5 p-2 rounded-3xl"
                  type="submit"
                >
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

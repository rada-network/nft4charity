import { useForm } from 'react-hook-form';

import contentCopySVG from '@/assets/icons/content_copy.svg';
import cryptoYellow from '@/assets/icons/cryptoYellow.svg';
import qrCodeSVG from '@/assets/icons/qrCode.svg';
import vaccineVirus from '@/assets/images/vaccineVirus.svg';
import { Table } from '@/components/Elements';
import { SelectField } from '@/components/Form';
import { InputField } from '@/components/Form/InputField';
import { LatestContributor } from '@/components/LatestContributor';
import { formatDate, formatDateTypeNumber } from '@/utils/format';

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

export const Donate = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => alert(JSON.stringify(data));

  return (
    <>
      <div className="">
        <div className="bg-main-pattern p-20 relative">
          <div className="w-4/5 m-auto">
            <div className="grid-cols-2 flex justify-center ">
              <div className="mt-16">
                <p className="font-black text-5xl font-Merriweather leading-tight">
                  You can donate with your cryptocurrency
                </p>
                <p className="pt-5 text-sm">
                  Raise $1M worth of medical device & vaccine for covid-19 in Ho Chi Minh City.
                  Donate easy to public wallets.
                </p>
                <p className="font-Merriweather font-bold text-lg mt-5">Campaign Start</p>
                <p className="font-Open text-lg">{formatDate(1633920525000)}</p>
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
                      options={[
                        { label: 'Ethereum', value: 'ethereum' },
                        { label: 'BNB', value: 'bnb' },
                      ]}
                      registration={{ ...register('firstName', { required: true }) }}
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
                      0x6C35Bae9EC2C7Bbbb366AD5008444A6D354334ee
                    </span>
                    <img src={contentCopySVG} alt="" />
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
          </p>
        </div>

        <div className="w-4/5 m-auto">
          <LatestContributor />
          <div className="mt-10">{renderTable()}</div>
        </div>
      </div>
    </>
  );
};

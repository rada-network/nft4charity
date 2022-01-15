import { gql, useQuery } from '@apollo/client';

import { Spinner } from '@/components/Elements';
import { formatBalance } from '@/utils/format';
import { Link } from '@/components/Elements/Link/Link';
import Countdown from 'react-countdown';

const AllCampaignsQuery = gql`
  query wallet {
    walletFilter {
      _id
      address
      currency
      createdAt
      updatedAt
      campaignId
      transaction: transaction {
        data {
          amount
          status
          walletId
        }
      }
    }
  }
`;

export const Campaigns = () => {
  const { data, loading, error } = useQuery(AllCampaignsQuery);
  console.log('data', data);
  if (loading) return <Spinner />;
  if (error) return <p>Oh no... {error.message}</p>;

  const calculateTotaBalance = (data: Record<string, any>[]) => {
    let res = 0;
    console.log(data);
    data.map((item: Record<string, any>) => {
      console.log(item);
      return (res += item.amount);
    });

    return formatBalance(res.toString());
  };

  const renderCountdown = (props: any) => {
    if (props.completed) {
      return 'The event has ended';
    } else {
      return (
        <>
          <p className="font-bold text-lg">Ending</p>
          <span>
            {props.formatted.days > 0 ? `${props.formatted.days} D -` : ''} {props.formatted.hours}:
            {props.formatted.minutes}:{props.formatted.seconds}
          </span>
        </>
      );
    }
  };

  return (
    <>
      <div className="">
        <div className="w-full h-px-530 relative mb-8">
          <img
            src="https://static.devfdg.net/static/media/primary-bg.796d6fdc.png"
            className="w-full h-full bottom-0 absolute top-0 right-0 left-0 object-cover"
          />
          <div className="absolute top-10 right-10 rounded-lg p-5 w-1/3 bg-black bg-opacity-25 backdrop-blur text-white">
            <h2 className="text-4xl font-Open font-bold">Rada NFT 4 Charity</h2>
            <span className="text-base mt-5">
              The Charity Wallet is designed for donors who do not specify the donation projects and
              allow BCF to distribute the fund accordingly. Our blockchain-based system will allow
              people to track the flow of financial transactions with transparency. Our team will
              perform professional and rigorous due diligence to select projects and on-ground
              collaborative organizations, ensuring that the social impact of each currency unit
              will be maximized. On behalf of the end-beneficiaries, we would like to express our
              thankfulness for your generosity.
            </span>
          </div>
        </div>

        <div className="w-2/3 m-auto grid grid-cols-2 gap-4 mt-16">
          {/* <Link to={`/donate/${link._id}`}>{link.name}</Link> */}
          {data?.walletFilter.map((item: Record<string, any>, index: number) => {
            return (
              <div key={index} className="w-full">
                <Link to={`/donate/${item?.campaign?._id}`}>
                  <div className="relative">
                    <img src={item?.campaign?.coverImgUrl} alt="" />
                    <div className="absolute bottom-0 p-5 w-full bg-black bg-opacity-25">
                      <p className="text-white text-lg font-bold font-Merriweather">
                        {item?.campaign?.name}
                      </p>
                      <p className="text-white font-Open text-sm whitespace-pre-wrap overflow-hidden overflow-ellipsis line-clamp-1">
                        {item?.campaign?.description}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="shadow">
                  <div className="p-5">
                    <span className="font-bold text-xl font-Merriweather">Total raised: </span>
                    <span>
                      {calculateTotaBalance(item?.transaction)} {item?.currency}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-5 font-Open">
                    <div className="">
                      <p className="font-bold text-lg">{item?.transaction.length}</p>
                      <p>Donation</p>
                    </div>
                    <div className="h-12">
                      <Countdown date={item?.campaign?.endedAt} renderer={renderCountdown} />
                    </div>
                    <div>
                      <button className="flex btn bg-button-purple w-2/3 p-2 rounded-lg m-auto">
                        <span className="text-white m-auto font-Open">Donate</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

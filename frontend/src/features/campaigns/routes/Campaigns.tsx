import { gql, useQuery } from '@apollo/client';

import { Spinner } from '@/components/Elements';
import { Link } from '@/components/Elements/Link/Link';

const AllCampaignsQuery = gql`
  query wallet {
    walletFilter {
      _id
      address
      currency
      createdAt
      updatedAt
      campaign: campaign {
        name
        description
        startedAt
        endedAt
        coverImgUrl
        thumbnailImgUrl
      }
      transaction: transaction {
        _id
        walletId
        description
        currency
        amount
        status
        createdAt
      }
    }
  }
`;

export const Campaigns = () => {
  const { data, loading, error } = useQuery(AllCampaignsQuery);
  console.log('data', data);
  if (loading) return <Spinner />;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <div className="">
        <div className="mt-28 mb-10">
          <p className="m-auto w-full flex justify-center flex-none font-Merriweather font-bold text-4xl">
            Campaigns
          </p>
          <p className="text-sm w-1/3 m-auto font-Open mt-10 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...
          </p>
        </div>

        <div className="w-4/5 m-auto">
          <div>
            <ul>
              {data.campaigns.map((link: any) => (
                <li key={link.name} className="shadow max-w-md rounded cursor-pointer">
                  <Link to={`/donate/${link._id}`}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

import { UpdateProfile } from '../components/UpdateProfile';

import designerAvatar from '@/assets/images/designerAvatar.png';
import { ContentLayout } from '@/components/Layout';

// import { useAuth } from '@/lib/auth';

type EntryProps = {
  label: string;
  value: string;
};
const Entry = ({ label, value }: EntryProps) => (
  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
);

export const UserProfile = () => {
  // const { user } = useAuth();

  // if (!user) return null;

  return (
    <ContentLayout title="">
      <div className="m-auto my-10">
        <img src={designerAvatar} alt="" className="m-auto w-px-112" />
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
            <UpdateProfile />
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details of the user.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <Entry label="First Name" value="" />
            <Entry label="Last Name" value="" />
            <Entry label="Email Address" value="" />
            <Entry label="Role" value="" />
          </dl>
        </div>
      </div>
    </ContentLayout>
  );
};

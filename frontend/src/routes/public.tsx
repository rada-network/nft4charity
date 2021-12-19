import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { Campaigns } from '@/features/campaigns';
import { Contractor } from '@/features/contractor';
import { Donate } from '@/features/donate';
import { Mint } from '@/features/mint';
import { Landing } from '@/features/misc';
import { UserProfile } from '@/features/users';

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const publicRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/donate/:id', element: <Donate /> },
      { path: '/campaigns', element: <Campaigns /> },
      { path: '/contractor', element: <Contractor /> },
      { path: '/mint', element: <Mint /> },
      { path: '/user/profile', element: <UserProfile /> },
    ],
  },
];

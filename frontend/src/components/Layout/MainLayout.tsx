import * as React from 'react';

import { Head } from '@/components/Head';
import { Footer } from '@/components/Layout/Footer';
import { Header } from '@/components/Layout/Header';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Head description="Welcome to RADA.Charity" />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

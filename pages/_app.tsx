import '../styles/globals.css';
import 'antd/dist/antd.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout ) {
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        { getLayout(<Component {...pageProps} />) }
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp

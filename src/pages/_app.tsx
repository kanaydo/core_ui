import { AppPropsWithLayout } from '@coretypes/layout_types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'antd/dist/antd.css';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import '../../styles/globals.css';
import "reflect-metadata"

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

import "~/common/reset.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { SearchContextWrapper } from "~/components/Search/hooks/SearchContext";
import Layout from "~/pages/layout";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SearchContextWrapper>
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </SearchContextWrapper>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

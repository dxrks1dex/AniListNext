import type { AppProps } from 'next/app'
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import {useState} from "react";
import {ReactQueryDevtools} from "react-query/devtools";
import {MainPage} from "~/pages/main/MainPage";
import {SearchContextWrapper} from "~/components/Search/hooks/SearchContext";

export default function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient())

    return <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
            <SearchContextWrapper>
            <Component {...pageProps} />
            </SearchContextWrapper>
        </Hydrate>
        <ReactQueryDevtools />
    </QueryClientProvider>
}
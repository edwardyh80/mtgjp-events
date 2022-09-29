import type { AppProps } from "next/app";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/globals.css";
import "../i18n/i18n";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Script
        async
        id="google-tag"
        src="https://www.googletagmanager.com/gtag/js?id=G-VM91P3BTLH"
      ></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-VM91P3BTLH');
        `}
      </Script>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;

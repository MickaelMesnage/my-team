import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { NhostClient, NhostProvider } from "@nhost/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

const NHOST_SUBDOMAIN = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN as string;
const NHOST_REGION = process.env.NEXT_PUBLIC_NHOST_REGION as string;

if (!NHOST_SUBDOMAIN) throw new Error("NHOST env vars are not set");

const nhost = new NhostClient({
  subdomain: NHOST_SUBDOMAIN,
  region: NHOST_REGION,
});

// To show explicit apollo graphql error in dev mode
const env = process.env.NODE_ENV;
if (env == "development") {
  loadDevMessages();
  loadErrorMessages();
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <NextUIProvider className="w-screen h-screen">
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer position="top-center" />
        </NextUIProvider>
      </NhostApolloProvider>
    </NhostProvider>
  );
}

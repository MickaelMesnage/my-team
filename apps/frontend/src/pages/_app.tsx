import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { NhostClient, NhostProvider } from "@nhost/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainLayout } from "@/components/organisms/MainLayout";

const NHOST_SUBDOMAIN = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN as string;
const NHOST_REGION = process.env.NEXT_PUBLIC_NHOST_REGION as string;

if (!NHOST_SUBDOMAIN) throw new Error("NHOST env vars are not set");

const nhost = new NhostClient({
  subdomain: NHOST_SUBDOMAIN,
  region: NHOST_REGION,
});

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { NhostApolloProvider } from "@nhost/react-apollo";

loadDevMessages();
loadErrorMessages();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <NextUIProvider className="w-screen h-screen">
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
          <ToastContainer />
        </NextUIProvider>
      </NhostApolloProvider>
    </NhostProvider>
  );
}

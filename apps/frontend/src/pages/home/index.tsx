import { ConnectedLayout } from "@/components/layouts/ConnectedLayout";
import { Inter } from "next/font/google";
import { ReactElement } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  return <main>Dashboard en construction</main>;
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ConnectedLayout>{page}</ConnectedLayout>;
};

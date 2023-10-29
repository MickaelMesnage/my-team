import { ReactNode } from "react";
import { Header } from "@/components/organisms/Header";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header className="w-full h-[4rem]" />
      <div className="h-[calc(100%-4rem)]">{children}</div>
    </div>
  );
};

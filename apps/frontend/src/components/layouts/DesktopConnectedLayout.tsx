import { ComponentProps, ReactNode } from "react";
import { Header } from "@/components/organisms/Header";
import { ContainerWrapper } from "@/components/molecules/ContainerWrapper";

export type DesktopConnectedLayoutProps = ComponentProps<"div">;

export const DesktopConnectedLayout = ({
  className,
  children,
}: DesktopConnectedLayoutProps) => {
  return (
    <div className={`w-full h-full flex flex-col ${className || ""}`}>
      <ContainerWrapper className="border-b-2 ">
        <Header className="w-full h-[6rem]" />
      </ContainerWrapper>
      <div className="h-[calc(100%-6rem)]">
        <ContainerWrapper className="p-4 h-full">{children}</ContainerWrapper>
      </div>
    </div>
  );
};

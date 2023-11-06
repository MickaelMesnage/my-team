import { ComponentProps, ReactNode } from "react";
import { Header } from "@/components/organisms/Header";
import { ContainerWrapper } from "@/components/molecules/ContainerWrapper";

export type DesktopConnectedLayoutProps = ComponentProps<"div">;

export const DesktopConnectedLayout = ({
  className,
  children,
}: DesktopConnectedLayoutProps) => {
  return (
    <div
      className={`flex flex-col ${className || ""}`}
      style={{ width: "100vw", height: "100dvh" }}
    >
      <Header className="w-full h-[5rem]" />
      <div className="h-[calc(100%-5rem)]">{children}</div>
    </div>
  );
};

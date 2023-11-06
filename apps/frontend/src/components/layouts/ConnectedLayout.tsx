import { ReactNode } from "react";
import { MobileConnectedLayout } from "@/components/layouts/MobileConnectedLayout";
import { DesktopConnectedLayout } from "@/components/layouts/DesktopConnectedLayout";

export const ConnectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full">
      <MobileConnectedLayout className="block md:hidden">
        {children}
      </MobileConnectedLayout>
      <DesktopConnectedLayout className="hidden md:block">
        {children}
      </DesktopConnectedLayout>
    </div>
  );
};

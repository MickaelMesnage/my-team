import { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { DashboardIcon } from "@/components/icons/DashboardIcon";
import { TeamIcon } from "@/components/icons/TeamIcon";
import { GameIcon } from "@/components/icons/GameIcon";
import { ProfileIcon } from "@/components/icons/ProfileIcon";
import { useSignOut } from "@nhost/nextjs";
import { LogoutIcon } from "@/components/icons/LogoutIcon";

export type MobileConnectedLayoutProps = ComponentProps<"div">;

const NAVBAR_ITEMS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <DashboardIcon className="w-8 h-8" />,
  },
  {
    label: "Mes équipes",
    href: "/team/list",
    icon: <TeamIcon className="w-8 h-8" />,
  },
  {
    label: "Mes matchs",
    href: "/game/list",
    icon: <GameIcon className="w-8 h-8" />,
  },
  {
    label: "Profil",
    href: "/profile",
    icon: <ProfileIcon className="w-8 h-8" />,
  },
];

export const MobileConnectedLayout = ({
  className,
  children,
}: MobileConnectedLayoutProps) => {
  const { signOut } = useSignOut();

  const onSignoutClick = async () => {
    await signOut();
    return false;
  };
  return (
    <div className={`w-full h-full flex flex-col ${className || ""}`}>
      <div className="w-full h-[calc(100%-6rem)] p-4 overflow-y-auto">
        {children}
      </div>
      <header className="w-full h-[6rem] p-4 flex shrink grow basis-0 justify-between items-center border-t-2">
        {NAVBAR_ITEMS.map(({ label, href, icon }, index) => (
          <Link
            key={index}
            href={href}
            className="flex flex-col gap-2 items-center"
          >
            {icon} <span className="text-small">{label}</span>
          </Link>
        ))}
        <Link
          href="#"
          onClick={onSignoutClick}
          className="flex flex-col gap-2 items-center"
        >
          <LogoutIcon className="w-8 h-8" />
          <span className="text-small">Se déconnecter</span>
        </Link>
      </header>
    </div>
  );
};

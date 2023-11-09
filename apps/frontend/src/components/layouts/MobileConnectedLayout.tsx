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
    label: "Équipes",
    href: "/team/list",
    icon: <TeamIcon className="w-8 h-8" />,
  },
  {
    label: "Matchs",
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
    <div
      className={`flex flex-col ${className || ""}`}
      style={{ width: "100vw", height: "100dvh" }}
    >
      <div className="w-full h-[calc(100%-6rem)] relative">
        <div className="w-full h-full p-4 overflow-y-auto">{children}</div>
      </div>
      <header className="w-full h-[6rem] px-1 py-4 flex shrink grow basis-0 justify-between items-center border-t-2">
        {NAVBAR_ITEMS.map(({ label, href, icon }, index) => (
          <Link
            key={index}
            href={href}
            className="flex flex-col gap-2 items-center"
          >
            {icon} <span className="text-xs">{label}</span>
          </Link>
        ))}
        <button
          className="flex flex-col gap-2 items-center"
          onClick={onSignoutClick}
        >
          <LogoutIcon className="w-8 h-8" />
          <span className="text-xs">Déconnecter</span>
        </button>
        {/* <Link
          href="#"
          onClick={onSignoutClick}
          className="flex flex-col gap-2 items-center"
        >
          <LogoutIcon className="w-8 h-8" />
          <span className="text-xs">Déconnecter</span>
        </Link> */}
      </header>
    </div>
  );
};

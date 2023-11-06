import { ErrorHandler } from "@/components/molecules/ErrorHandler";
import { useUserInfoQuery } from "@/components/organisms/HeaderConnectedDropdown.generated";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSignOut, useUserId } from "@nhost/nextjs";
import Link from "next/link";

export const HeaderConnectedDropdown = () => {
  const { signOut } = useSignOut();
  const userId = useUserId();

  if (!userId)
    throw new Error("HeaderConnectedDropdown: User id is not defined");

  const { data, loading, error } = useUserInfoQuery({ variables: { userId } });

  if (loading) return null;

  if (error) return <ErrorHandler error={error} />;

  if (!data?.user) return null;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          name={data.user.displayName}
          src={data.user.profile?.avatar || undefined}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem as={Link} href="/profile" key="settings">
          Mon profil
        </DropdownItem>
        <DropdownItem key="logout" onClick={signOut}>
          Se déconnecter
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

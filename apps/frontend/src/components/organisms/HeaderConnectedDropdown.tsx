import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSignOut } from "@nhost/nextjs";

export const HeaderConnectedDropdown = () => {
  const { signOut } = useSignOut();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          name="JD"
          // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="logout" onClick={signOut}>
          Se déconnecter
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

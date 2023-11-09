import { Avatar } from "@nextui-org/react";
import { useMemo } from "react";

export type AvatarListProps = {
  userList: {
    displayName: string;
    avatarURL: string | undefined;
  }[];
};

export const AvatarList = ({ userList }: AvatarListProps) => {
  // Sort the users so that the ones with an avatar are first
  const sortedUsers = useMemo(() => {
    return userList.sort((a, b) => {
      if (a.avatarURL) return -1;
      if (b.avatarURL) return 1;
      return 0;
    });
  }, [userList]);

  return (
    <div className="flex gap-3 flex-wrap">
      {sortedUsers.map(({ avatarURL, displayName }, index) => (
        <Avatar key={index} name={displayName} src={avatarURL} />
      ))}
    </div>
  );
};

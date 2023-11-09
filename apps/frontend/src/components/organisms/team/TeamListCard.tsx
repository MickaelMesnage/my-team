import { useRouter } from "next/router";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import { TeamListCardFragment } from "@/components/organisms/team/TeamListCard.generated";
import Image from "next/image";
import { useMemo } from "react";

export type TeamListCardProps = {
  fragment: TeamListCardFragment;
};

export const TeamListCard = ({ fragment }: TeamListCardProps) => {
  const router = useRouter();

  const sortedUsers: {
    displayName: string;
    avatarURL: string | undefined;
  }[] = useMemo(() => {
    return fragment.user_teams
      .map((user_team) => ({
        displayName: user_team.user?.displayName as string, // Display name is always string
        avatarURL: user_team.user?.profile?.avatar || undefined,
      }))
      .sort((a, b) => {
        if (a.avatarURL) return -1;
        if (b.avatarURL) return 1;
        return 0;
      });
  }, [fragment.user_teams]);

  return (
    <Card className="w-full max-w-md">
      <CardBody>
        <div className="flex flex-col gap-2 justify-start">
          <Image
            className="w-full h-auto rounded-large"
            src="/team.png"
            width={400}
            height={300}
            alt=""
          />
          <h1 className="">{fragment.name}</h1>
          <span>Créé par {fragment.creator?.displayName}</span>
          <span>{fragment.description}</span>
          <span>{fragment.user_teams.length} joueur(s)</span>
          <div className="flex gap-3 flex-wrap">
            {sortedUsers.map(({ avatarURL, displayName }, index) => (
              <Avatar key={index} name={displayName} src={avatarURL} />
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

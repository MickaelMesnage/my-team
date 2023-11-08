import { useRouter } from "next/router";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { TeamListCardFragment } from "@/components/organisms/team/TeamListCard.generated";
import Image from "next/image";

export type TeamListCardProps = {
  fragment: TeamListCardFragment;
};

export const TeamListCard = ({ fragment }: TeamListCardProps) => {
  const router = useRouter();

  const onPress = () => router.push(`/team/${fragment.id}`);

  return (
    // isPressable onPress={onPress}
    <Card className="w-full max-w-md">
      <CardBody>
        <div className="flex flex-col gap-2">
          <Image
            className="w-full h-auto rounded-large"
            src="/team.png"
            width={400}
            height={300}
            alt=""
          />
          <h1>{fragment.name}</h1>
          <span>Createur: {fragment.creator?.email}</span>
          <span>{fragment.description}</span>
          <span>Nombre de joueurs: {fragment.user_teams.length}</span>
        </div>
      </CardBody>
    </Card>
  );
};

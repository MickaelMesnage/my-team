import { useRouter } from "next/router";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { TeamListCardFragment } from "@/components/organisms/TeamListCard.generated";

export type TeamListCardProps = {
  fragment: TeamListCardFragment;
};

export const TeamListCard = ({ fragment }: TeamListCardProps) => {
  const router = useRouter();

  const onPress = () => router.push(`/team/${fragment.id}`);

  return (
    <Card isPressable onPress={onPress} className="w-full max-w-xs">
      <CardHeader className="flex justify-center">{fragment.name}</CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-col gap-2">
          <span>Createur: {fragment.creator?.email}</span>
          <span>{fragment.description}</span>
        </div>
      </CardBody>
    </Card>
  );
};

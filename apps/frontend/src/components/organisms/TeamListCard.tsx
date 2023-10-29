import { useRouter } from "next/router";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { TeamListCardFragment } from "@/components/organisms/TeamListCard.generated";

export type TeamListCardProps = {
  fragment: TeamListCardFragment;
};

export const TeamListCard = ({ fragment }: TeamListCardProps) => {
  const router = useRouter();

  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="flex justify-center">{fragment.name}</CardHeader>
      <Divider />
      <CardBody>{fragment.id}</CardBody>
    </Card>
  );
};

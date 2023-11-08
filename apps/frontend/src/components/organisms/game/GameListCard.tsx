import { useRouter } from "next/router";
import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react";
import { GameListCardFragment } from "@/components/organisms/game/GameListCard.generated";
import { GameJoinModal } from "@/components/organisms/game/GameJoinModal";

export type GameListCardProps = {
  fragment: GameListCardFragment;
};

export const GameListCard = ({ fragment }: GameListCardProps) => {
  const router = useRouter();
  const formattedDate = new Date(fragment.timestamp).toLocaleDateString();
  const formattedTime = new Date(fragment.timestamp).toLocaleTimeString();

  const disclosure = useDisclosure();

  const onPress = () => router.push(`/game/${fragment.id}`);

  return (
    <>
      <Card isPressable onPress={onPress} className="w-full max-w-xs">
        <CardBody>
          <div className="flex flex-col gap-2">
            <span>Createur: {fragment.creator?.email}</span>
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
            <span>Nombre de participants: {fragment.user_games.length}</span>
            {!fragment.joinedByUser && (
              <Button color="primary" onClick={disclosure.onOpen}>
                Participer
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <GameJoinModal
        disclosure={disclosure}
        timestamp={fragment.timestamp}
        gameId={fragment.id}
      />
    </>
  );
};

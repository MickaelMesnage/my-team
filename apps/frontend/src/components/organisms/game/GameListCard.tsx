import { useRouter } from "next/router";
import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react";
import { GameListCardFragment } from "@/components/organisms/game/GameListCard.generated";
import { GameJoinModal } from "@/components/organisms/game/GameJoinModal";
import { useMemo } from "react";
import { AvatarList } from "@/components/molecules/AvatarList";

export type GameListCardProps = {
  fragment: GameListCardFragment;
};

export const GameListCard = ({ fragment }: GameListCardProps) => {
  const userList = useMemo(() => {
    return fragment.user_games.map((user_team) => ({
      displayName: user_team.user?.displayName as string, // Display name is always string
      avatarURL: user_team.user?.profile?.avatar || undefined,
    }));
  }, [fragment.user_games]);

  const formattedDate = new Date(fragment.timestamp).toLocaleDateString();
  const formattedTime = new Date(fragment.timestamp).toLocaleTimeString();

  const disclosure = useDisclosure();

  return (
    <>
      <Card className="w-full max-w-xs">
        <CardBody>
          <div className="flex flex-col gap-2">
            <span>Créé par {fragment.creator?.displayName}</span>
            <span>
              {formattedDate} - {formattedTime}
            </span>
            <span>Nombre de participants: {fragment.user_games.length}</span>
            <AvatarList userList={userList} />
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

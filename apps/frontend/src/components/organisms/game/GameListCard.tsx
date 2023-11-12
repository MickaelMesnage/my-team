import { useRouter } from "next/router";
import { Button, Card, CardBody, useDisclosure, user } from "@nextui-org/react";
import { GameListCardFragment } from "@/components/organisms/game/GameListCard.generated";
import { GameJoinModal } from "@/components/organisms/game/GameJoinModal";
import { useMemo } from "react";
import { AvatarList } from "@/components/molecules/AvatarList";
import { isPast } from "date-fns";
import { Game_Status_Enum } from "@/graphql/types";
import { GameLeaveConnected } from "@/components/organisms/game/GameLeaveConnected";
import { useUserId } from "@nhost/nextjs";

export type GameListCardProps = {
  fragment: GameListCardFragment;
};

export const GameListCard = ({ fragment }: GameListCardProps) => {
  const userId = useUserId();
  console.log({ fragment });

  if (!userId) throw new Error("GameListCard: User id is undefined");

  const isGamePast = useMemo(() => {
    return isPast(new Date(fragment.timestamp));
  }, [fragment.timestamp]);

  const canJoin = useMemo(() => {
    return (
      !isGamePast &&
      !fragment.joinedByUser &&
      fragment.status === Game_Status_Enum.Create
    );
  }, [isGamePast, fragment.joinedByUser, fragment.status]);

  const canLeave = useMemo(() => {
    return (
      !isGamePast &&
      fragment.joinedByUser &&
      fragment.status === Game_Status_Enum.Create
    );
  }, [isGamePast, fragment.joinedByUser, fragment.status]);

  const userList = useMemo(() => {
    return fragment.user_games.map((user_team) => ({
      displayName: user_team.user?.displayName as string, // Display name is always string
      avatarURL: user_team.user?.profile?.avatar || undefined,
    }));
  }, [fragment.user_games]);

  const userGameId = useMemo(() => {
    return fragment.user_games.find((user_game) => user_game.userId === userId)
      ?.id;
  }, [fragment.user_games, userId]);

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
            {canJoin && (
              <Button color="primary" onClick={disclosure.onOpen}>
                Participer
              </Button>
            )}
            {canLeave && (
              <GameLeaveConnected
                render={(onLeave, loading) => (
                  <Button
                    isDisabled={loading}
                    isLoading={loading}
                    color="primary"
                    onClick={() => onLeave(userGameId)}
                  >
                    Ne plus participer
                  </Button>
                )}
              />
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

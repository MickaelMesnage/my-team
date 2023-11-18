import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import { GameListCardFragment } from "@/components/organisms/game/GameListCard.generated";
import { useMemo } from "react";
import { AvatarList } from "@/components/molecules/AvatarList";
import { GameLeaveConnected } from "@/components/organisms/game/GameLeaveConnected";
import { GameJoinConnected } from "@/components/organisms/game/GameJoinConnected";
import { useGame } from "@/components/organisms/game/useGame";
import { GameValidConnected } from "@/components/organisms/game/GameValidConnected";

export type GameListCardProps = {
  fragment: GameListCardFragment;
};

export const GameListCard = ({ fragment }: GameListCardProps) => {
  const {
    formattedDate,
    formattedTime,
    canJoin,
    canLeave,
    canValid,
    statusLabel,
  } = useGame({
    ...fragment,
    date: new Date(fragment.timestamp),
    joinedByUser: !!fragment.joinedByUser,
  });

  const userList = useMemo(() => {
    return fragment.user_games.map((user_team) => ({
      displayName: user_team.user?.displayName as string, // Display name is always string
      avatarURL: user_team.user?.profile?.avatar || undefined,
    }));
  }, [fragment.user_games]);

  return (
    <>
      <Card className="w-full max-w-md">
        <CardBody>
          <div className="flex flex-col items-start gap-2">
            <span>Équipe: {fragment.team.name}</span>
            <Chip>{statusLabel}</Chip>
            <span>Créé par {fragment.creator?.displayName}</span>
            <span>
              {formattedDate} - {formattedTime}
            </span>
            <span>Nombre de participants: {fragment.user_games.length}</span>
            <AvatarList userList={userList} />
            {canJoin && (
              <GameJoinConnected
                render={(onJoin, loading) => (
                  <Button
                    color="primary"
                    onClick={() => onJoin(fragment.id)}
                    isDisabled={loading}
                  >
                    Rejoindre
                  </Button>
                )}
              />
            )}
            {canLeave && (
              <GameLeaveConnected
                fragment={fragment}
                render={(onLeave, loading) => (
                  <Button
                    isDisabled={loading}
                    color="primary"
                    onClick={onLeave}
                  >
                    Ne plus participer
                  </Button>
                )}
              />
            )}
            {canValid && (
              <GameValidConnected
                render={(onValid, loading) => (
                  <Button
                    color="primary"
                    isDisabled={loading}
                    onClick={() => onValid(fragment.id)}
                  >
                    Valider
                  </Button>
                )}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

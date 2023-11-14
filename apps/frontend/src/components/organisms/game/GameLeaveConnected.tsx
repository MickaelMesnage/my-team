import {
  GameLeaveConnectedFragment,
  GameLeaveConnectedFragmentDoc,
  useGameLeaveMutation,
} from "@/components/organisms/game/GameLeaveConnected.generated";
import { useUserId } from "@nhost/nextjs";
import React, { ReactNode, cache } from "react";
import { toast } from "react-toastify";

export type GameLeaveConnectedProps = {
  render: (
    onLeave: (fragment: GameLeaveConnectedFragment) => void,
    loading: boolean
  ) => ReactNode;
};

export const GameLeaveConnected = ({ render }: GameLeaveConnectedProps) => {
  const userId = useUserId();
  const [leaveGame, { loading }] = useGameLeaveMutation();

  if (!userId) throw new Error("GameLeaveConnected: User id is undefined");

  const onLeave = async (fragment: GameLeaveConnectedFragment) => {
    try {
      const userGameId = fragment.user_games.find(
        (e) => e.userId === userId
      )?.id;

      if (!userGameId)
        throw new Error("GameLeaveConnected: User Id not consistent");

      await leaveGame({
        variables: {
          id: userGameId,
        },
        // Update in cache to prevent loading if response ok
        update: (cache) => {
          cache.writeFragment({
            id: cache.identify({
              __typename: "games",
              id: fragment.id,
            }),
            fragment: GameLeaveConnectedFragmentDoc,
            data: {
              ...fragment,
              user_games: fragment.user_games.filter(
                (e) => e.id !== userGameId
              ),
              joinedByUser: false,
            },
          });
        },
      });
      toast.success("Vous avez annulé votre participation !");
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.error(error);
    }
  };

  return <div>{render(onLeave, loading)}</div>;
};

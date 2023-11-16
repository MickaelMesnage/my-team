import {
  GameLeaveConnectedFragment,
  GameLeaveConnectedFragmentDoc,
  useGameLeaveMutation,
} from "@/components/organisms/game/GameLeaveConnected.generated";
import { useUserId } from "@nhost/nextjs";
import { useRouter } from "next/router";
import React, { ReactNode, cache } from "react";
import { toast } from "react-toastify";

export type GameLeaveConnectedProps = {
  fragment: GameLeaveConnectedFragment;
  render: (onLeave: () => void, loading: boolean) => ReactNode;
};

export const GameLeaveConnected = ({
  fragment,
  render,
}: GameLeaveConnectedProps) => {
  const userId = useUserId();
  const router = useRouter();

  const [leaveGame, { loading }] = useGameLeaveMutation();

  if (!userId) throw new Error("GameLeaveConnected: User id is undefined");

  const onLeave = async () => {
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
        update: (cache, { data }) => {
          const game = data?.delete_user_game_by_pk?.game;

          if (!game) throw new Error("GameLeaveConnected: game not consistent");
          cache.writeFragment({
            id: cache.identify({
              __typename: "games",
              id: fragment.id,
            }),
            fragment: GameLeaveConnectedFragmentDoc,
            data: data?.delete_user_game_by_pk?.game,
          });
        },
      });
      toast.success("Vous avez annulé votre participation !");
    } catch (error) {
      toast.error("Une erreur est survenue");
      router.push("/");
    }
  };

  return <>{render(onLeave, loading)}</>;
};

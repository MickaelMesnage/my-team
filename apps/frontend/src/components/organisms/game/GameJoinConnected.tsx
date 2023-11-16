import {
  GameJoinConnectedFragment,
  GameJoinConnectedFragmentDoc,
  useGameJoinMutation,
} from "@/components/organisms/game/GameJoinConnected.generated";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { toast } from "react-toastify";

export type GameJoinConnectedProps = {
  fragment: GameJoinConnectedFragment;
  render: (onJoin: () => Promise<void>, loading: boolean) => ReactNode;
};

export const GameJoinConnected = ({
  fragment,
  render,
}: GameJoinConnectedProps) => {
  const router = useRouter();
  const [joinGame, { loading }] = useGameJoinMutation();

  const onJoin = async () => {
    try {
      await joinGame({
        variables: {
          gameId: fragment.id,
        },
        // Update in cache to prevent loading if response ok
        update: (cache, { data }) => {
          const gameUpdated = data?.insert_user_game_one?.game;

          if (!gameUpdated)
            throw new Error("GameJoinConnected: updatedGame not consistent");

          cache.writeFragment({
            id: cache.identify({
              __typename: "games",
              id: fragment.id,
            }),
            fragment: GameJoinConnectedFragmentDoc,
            data: gameUpdated,
          });
        },
      });
      toast.success("Vous participez au match !");
    } catch (error) {
      console.log({ error });
      toast.error("Une erreur est survenue");
      router.push("/");
    }
  };

  return <div>{render(onJoin, loading)}</div>;
};

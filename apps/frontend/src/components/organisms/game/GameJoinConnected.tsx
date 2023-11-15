import {
  GameJoinConnectedFragment,
  GameJoinConnectedFragmentDoc,
  useGameJoinMutation,
} from "@/components/organisms/game/GameJoinConnected.generated";
import { ReactNode } from "react";
import { toast } from "react-toastify";

export type GameJoinConnectedProps = {
  render: (
    onJoin: (fragment: GameJoinConnectedFragment) => Promise<void>,
    loading: boolean
  ) => ReactNode;
};

export const GameJoinConnected = ({ render }: GameJoinConnectedProps) => {
  const [joinGame, { loading }] = useGameJoinMutation();

  const onJoin = async (fragment: GameJoinConnectedFragment) => {
    try {
      await joinGame({
        variables: {
          gameId: fragment.id,
        },
        // Update in cache to prevent loading if response ok
        update: (cache, { data }) => {
          const userGameAdded = data?.insert_user_game_one;
          if (!userGameAdded)
            throw new Error(
              "GameJoinConnected: User game added not consistent"
            );

          cache.writeFragment({
            id: cache.identify({
              __typename: "games",
              id: fragment.id,
            }),
            fragment: GameJoinConnectedFragmentDoc,
            data: {
              ...fragment,
              user_games: [...fragment.user_games, userGameAdded],
              joinedByUser: false,
            },
          });
        },
        // refetchQueries: ["GameListPage"],
      });
      toast.success("Vous participez au match !");
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return <div>{render(onJoin, loading)}</div>;
};

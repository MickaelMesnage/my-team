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
      console.log("onjoin start", fragment.id);
      await joinGame({
        variables: {
          gameId: fragment.id,
        },
        // Update in cache to prevent loading if response ok
        update: (cache, { data }) => {
          console.log({ join: data?.insert_user_game_one?.game });

          console.log(
            cache.writeFragment({
              id: cache.identify({
                __typename: "games",
                id: fragment.id,
              }),
              fragment: GameJoinConnectedFragmentDoc,
              data: data?.insert_user_game_one?.game,
            })
          );
          // cache.gc();
        },
        // refetchQueries: ["GameListPage"],
      });
      console.log("ok");
      console.log("onjoin end");
      toast.success("Vous participez au match !");
    } catch (error) {
      console.log({ error });
      toast.error("Une erreur est survenue");
      router.push("/");
    }
  };

  return <div>{render(onJoin, loading)}</div>;
};

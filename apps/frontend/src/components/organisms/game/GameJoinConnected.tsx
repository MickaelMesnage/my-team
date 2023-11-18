import { useGameJoinMutation } from "@/components/organisms/game/GameJoinConnected.generated";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { toast } from "react-toastify";

export type GameJoinConnectedProps = {
  render: (
    onJoin: (gameId: string) => Promise<void>,
    loading: boolean
  ) => ReactNode;
};

export const GameJoinConnected = ({ render }: GameJoinConnectedProps) => {
  const router = useRouter();
  const [joinGame, { loading }] = useGameJoinMutation();

  const onJoin = async (gameId: string) => {
    try {
      await joinGame({
        variables: {
          gameId,
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

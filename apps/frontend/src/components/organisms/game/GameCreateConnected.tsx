import { toast } from "react-toastify";
import { useUserData } from "@nhost/nextjs";
import { GameFormFieldsValue } from "@/components/organisms/game/GameForm";
import { ReactNode } from "react";
import { useInsertGameMutation } from "@/components/organisms/game/GameCreateConnected.generated";
import { useRouter } from "next/router";

export type GameCreateConnectedProps = {
  render: (
    onCreate: (game: GameFormFieldsValue) => Promise<void>,
    loading: boolean
  ) => ReactNode;
};

export const GameCreateConnected = ({ render }: GameCreateConnectedProps) => {
  const user = useUserData();
  const router = useRouter();
  const [insertTeam, { loading }] = useInsertGameMutation();

  if (!user?.id) throw new Error("GameCreateConnected: User not logged");

  const onCreateGame = async (game: GameFormFieldsValue) => {
    try {
      await insertTeam({
        variables: {
          game: {
            timestamp: new Date(`${game.date} ${game.time}`).toISOString(),
            teamId: game.teamId,
            ...(game.participate && { user_games: { data: [{}] } }),
          },
        },
        //refetchQueries: ["GameListPage"],
      });

      toast.success("Match créé !");
    } catch (error) {
      toast.error("Une erreur est survenue");
      router.push("/");
    }
  };

  return <>{render(onCreateGame, loading)}</>;
};

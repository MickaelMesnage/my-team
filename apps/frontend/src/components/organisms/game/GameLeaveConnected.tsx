import { useGameLeaveMutation } from "@/components/organisms/game/GameLeaveConnected.generated";
import { useUserId } from "@nhost/nextjs";
import React, { ReactNode } from "react";
import { toast } from "react-toastify";

export type GameLeaveConnectedProps = {
  render: (onLeave: (id: string) => void, loading: boolean) => ReactNode;
};

export const GameLeaveConnected = ({ render }: GameLeaveConnectedProps) => {
  const userId = useUserId();
  const [leaveGame, { loading }] = useGameLeaveMutation();

  if (!userId) throw new Error("GameLeaveConnected: User id is undefined");

  const onLeave = async (id: string) => {
    try {
      await leaveGame({
        variables: {
          id,
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

import { useNhostClient } from "@nhost/nextjs";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { toast } from "react-toastify";

export type GameValidConnectedProps = {
  render: (
    onValid: (gameId: string) => Promise<void>,
    loading: boolean
  ) => ReactNode;
};

export const GameValidConnected = ({ render }: GameValidConnectedProps) => {
  const router = useRouter();
  const nhostClient = useNhostClient();
  const [isLoading, setIsLoading] = React.useState(false);

  const onValid = async (gameId: string) => {
    try {
      setIsLoading(true);
      const { error } = await nhostClient.functions.call("routes/valid-game", {
        gameId,
      });
      if (error) throw new Error("une erreur est survenue");
      toast.success("Vous avez validé le match !");
    } catch (error) {
      toast.error("Une erreur est survenue");
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  return <>{render(onValid, isLoading)}</>;
};

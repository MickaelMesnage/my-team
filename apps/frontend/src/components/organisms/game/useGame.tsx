import { Game_Status_Enum } from "@/graphql/types";
import { useUserId } from "@nhost/nextjs";
import { isPast } from "date-fns";
import { useMemo } from "react";

export type useGameProps = {
  date: Date;
  joinedByUser: boolean;
  status: Game_Status_Enum;
  creator: {
    id: string;
  };
};

export const useGame = ({
  date,
  joinedByUser,
  status,
  creator: { id: creatorId },
}: useGameProps) => {
  const userId = useUserId();

  const isGamePast = useMemo(() => {
    return isPast(date);
  }, [date]);

  const isCreator = useMemo(() => {
    return creatorId === userId;
  }, [creatorId, userId]);

  const canJoin = useMemo(() => {
    return !isGamePast && !joinedByUser && status === Game_Status_Enum.Create;
  }, [isGamePast, joinedByUser, status]);

  const canLeave = useMemo(() => {
    return !isGamePast && joinedByUser && status === Game_Status_Enum.Create;
  }, [isGamePast, joinedByUser, status]);

  const canValid = useMemo(() => {
    return isCreator && status === Game_Status_Enum.Full;
  }, [isCreator, status]);

  const statusLabel = useMemo(() => {
    if (status === Game_Status_Enum.Create) {
      return "Inscrivez-vous !";
    }

    if (status === Game_Status_Enum.Validate) {
      return isGamePast ? "Terminé" : "Ca va jouer !";
    }

    if (status === Game_Status_Enum.Full) {
      return "En attente de validation";
    }

    return "Annulé";
  }, [isGamePast, status]);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return {
    canJoin,
    canLeave,
    canValid,
    statusLabel,
    formattedDate,
    formattedTime,
  };
};

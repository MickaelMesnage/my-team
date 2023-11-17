import { useUserId } from "@nhost/nextjs";

export type useTeamProps = {
  id: string;
  creator: {
    id: string;
  };
};

export const useTeam = ({ id, creator: { id: creatorId } }: useTeamProps) => {
  const userId = useUserId();
  const isCreator = userId === creatorId;
  const canUpdate = isCreator;

  const computedShareURL = `${process.env.NEXT_PUBLIC_APP_URL}/team/join/${id}`;

  return { computedShareURL, canUpdate };
};

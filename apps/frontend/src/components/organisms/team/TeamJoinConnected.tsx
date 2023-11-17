import { toast } from "react-toastify";
import { ReactNode } from "react";
import { useTeamJoinMutation } from "@/components/organisms/team/TeamJoinConnected.generated";

export type TeamJoinConnectedProps = {
  render: (
    onTeamJoin: (teamId: string) => Promise<void>,
    loading: boolean
  ) => ReactNode;
};

export const TeamJoinConnected = ({ render }: TeamJoinConnectedProps) => {
  const [teamJoin, { loading }] = useTeamJoinMutation();

  const onTeamJoin = async (teamId: string) => {
    try {
      await teamJoin({
        variables: {
          teamId,
        },
      });
    } catch (error) {
      throw new Error("error");
      // if (error instanceof ApolloError) {
      //   if (
      //     error &&
      //     error.graphQLErrors[0].extensions.code === "constraint-violation"
      //   ) {
      //     toast.success("Vous aviez déjà rejoint cette équipe petit coquin");
      //     router.push("/team/list");
      //     return;
      //   }
      // }
    }
  };

  return <>{render(onTeamJoin, loading)}</>;
};

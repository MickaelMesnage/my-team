import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export type AutomaticTeamJoinProps = {
  teamId: string;
  onTeamJoin: (teamId: string) => Promise<void>;
};

export const AutomaticTeamJoin = ({
  onTeamJoin,
  teamId,
}: AutomaticTeamJoinProps) => {
  const router = useRouter();

  useEffect(() => {
    const asyncJoin = async () => {
      try {
        await onTeamJoin(teamId);
        toast.success("Vous avez rejoint l'équipe");
        router.push("/team/list");
      } catch (error: any) {
        if (error instanceof ApolloError) {
          if (
            error &&
            error.graphQLErrors[0].extensions.code === "constraint-violation"
          ) {
            toast.success("Vous aviez déjà rejoint cette équipe petit coquin");
            router.push("/team/list");
            return;
          }
        }

        toast.error("Une erreur est survenue");
      }
    };

    asyncJoin();
  }, []);

  return <CenteredSpinner />;
};

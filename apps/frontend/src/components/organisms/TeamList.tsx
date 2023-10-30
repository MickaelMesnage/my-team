import {
  TeamCreationGateway,
  TeamCreationGatewayProps,
} from "@/components/organisms/TeamCreationGateway";
import { useRouter } from "next/router";
import { useTeamListSubscription } from "@/components/organisms/TeamList.generated";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { toast } from "react-toastify";
import { TeamListCard } from "@/components/organisms/TeamListCard";

export type TeamListProps = TeamCreationGatewayProps;

export const TeamList = (props: TeamListProps) => {
  const router = useRouter();
  const { data, error, loading } = useTeamListSubscription();

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    toast.error("Une erreur est survenue");
    router.push("/");
    console.error({ error });
    return;
  }

  return (
    <div>
      <div className="flex gap-4 flex-wrap">
        {data &&
          data.teams.map((team) => (
            <TeamListCard key={team.id} fragment={team} />
          ))}
      </div>
      <TeamCreationGateway {...props} />
    </div>
  );
};

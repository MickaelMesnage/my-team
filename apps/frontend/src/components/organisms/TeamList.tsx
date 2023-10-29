import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { CenteredSpinner } from "@/components//molecules/CenteredSpinner";
import { useTeamListSubscription } from "@/components/organisms/TeamList.generated";

export const TeamList = () => {
  const router = useRouter();
  const { data, error, loading } = useTeamListSubscription();

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    toast.error("Une erreur est survenue");
    router.push("/");
    return;
  }

  return (
    <ul>
      {data && data.teams.map((team) => <li key={team.id}>{team.name}</li>)}
    </ul>
  );
};

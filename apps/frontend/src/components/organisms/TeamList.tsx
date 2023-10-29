import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { CenteredSpinner } from "@/components//molecules/CenteredSpinner";
import { useTeamListSubscription } from "@/components/organisms/TeamList.generated";
import { TeamListCard } from "@/components/organisms/TeamListCard";

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
    <section className="flex gap-4 flex-wrap">
      {data &&
        data.teams.map((team) => (
          <TeamListCard key={team.id} fragment={team} />
        ))}
    </section>
  );
};

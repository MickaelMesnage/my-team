import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useTeamByIdQuery } from "@/components/pageGraphqlRequests/TeamById.generated";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { TeamDetails } from "@/components/organisms/team/TeamDetails";
import { ErrorHandler } from "@/components/molecules/ErrorHandler";

export default function TeamByIdPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useTeamByIdQuery({ variables: { id } });

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  return (
    <main>
      <section>
        {data?.teams_by_pk && <TeamDetails fragment={data.teams_by_pk} />}
      </section>
    </main>
  );
}

TeamByIdPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedRoute>{page}</AuthenticatedRoute>;
};

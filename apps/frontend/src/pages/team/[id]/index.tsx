import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useTeamByIdQuery } from "@/components/pageGraphqlRequests/TeamById.generated";

export default function TeamByIdPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useTeamByIdQuery({ variables: { id } });

  return (
    <main>
      <section>
        <span>teamid</span>
      </section>
    </main>
  );
}

TeamByIdPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedRoute>{page}</AuthenticatedRoute>;
};

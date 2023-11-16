import { useRouter } from "next/router";
import { ReactElement } from "react";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { ErrorHandler } from "@/components/molecules/ErrorHandler";
import { ConnectedLayout } from "@/components/layouts/ConnectedLayout";

export default function TeamByIdPage() {
  const router = useRouter();
  const { id } = router.query;

  const data = null;
  const loading = false;
  const error = null;

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  return (
    <main>
      <section>
        {/* {data?.teams_by_pk && <TeamDetails fragment={data.teams_by_pk} />} */}
      </section>
    </main>
  );
}

TeamByIdPage.getLayout = function getLayout(page: ReactElement) {
  return <ConnectedLayout>{page}</ConnectedLayout>;
};

import { Button, useDisclosure } from "@nextui-org/react";
import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";
import { ReactElement } from "react";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { useTeamListSubscription } from "@/components/pageGraphqlRequests/TeamList.generated";
import { useRouter } from "next/router";
import { TeamListCard } from "@/components/organisms/TeamListCard";
import { TeamCreationGateway } from "@/components/organisms/TeamCreationGateway";
import { ErrorHandler } from "@/components/molecules/ErrorHandler";

export default function TeamListPage() {
  const router = useRouter();
  const disclosure = useDisclosure();
  const { data, error, loading } = useTeamListSubscription();

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  return (
    <main>
      <section>
        <div className="w-full flex items-center justify-between mb-4">
          <h1>Liste de mes équipes</h1>
          <Button onClick={disclosure.onOpen}>Créer une nouvelle équipe</Button>
        </div>
        <div>
          <div className="flex gap-4 flex-wrap">
            {data && data.teams.length ? (
              <>
                {data.teams.map((team) => (
                  <TeamListCard key={team.id} fragment={team} />
                ))}
              </>
            ) : (
              <span>Tu n&apos;as pas rejoins d&apos;équipe pour le moment</span>
            )}
          </div>
          <TeamCreationGateway disclosure={disclosure} />
        </div>
      </section>
    </main>
  );
}

TeamListPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedRoute>{page}</AuthenticatedRoute>;
};

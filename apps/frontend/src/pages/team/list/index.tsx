import { Button, useDisclosure } from "@nextui-org/react";
import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";
import { ReactElement } from "react";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { toast } from "react-toastify";
import { useTeamListSubscription } from "@/components/pageGraphqlRequests/TeamList.generated";
import { useRouter } from "next/router";
import { TeamListCard } from "@/components/organisms/TeamListCard";
import { TeamCreationGateway } from "@/components/organisms/TeamCreationGateway";
import { handleApolloError } from "@/utils/handleApolloError";

export default function TeamListPage() {
  const router = useRouter();
  const disclosure = useDisclosure();
  const { data, error, loading } = useTeamListSubscription();

  if (loading) {
    return <CenteredSpinner />;
  }

  handleApolloError(error, router.push);

  return (
    <main>
      <section>
        <div className="w-full flex items-center justify-between mb-4">
          <h1>Liste de mes équipes</h1>
          <Button onClick={disclosure.onOpen}>Créer une nouvelle équipe</Button>
        </div>
        <div>
          <div className="flex gap-4 flex-wrap">
            {data &&
              data.teams.map((team) => (
                <TeamListCard key={team.id} fragment={team} />
              ))}
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

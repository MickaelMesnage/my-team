import { Button, useDisclosure } from "@nextui-org/react";
import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";
import { ReactElement } from "react";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { useGameListSubscription } from "@/components/pageGraphqlRequests/GameList.generated";
import { useRouter } from "next/router";
import { GameListCard } from "@/components/organisms/GameListCard";
import { TeamCreationGateway } from "@/components/organisms/TeamCreationGateway";
import { ErrorHandler } from "@/components/molecules/ErrorHandler";
import { GameCreateModal } from "@/components/organisms/GameCreateModal";

export default function GameListPage() {
  const router = useRouter();
  const disclosure = useDisclosure();
  const { data, error, loading } = useGameListSubscription();

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  console.log({ data });

  return (
    <main>
      <section>
        <div className="w-full flex items-center justify-between mb-4">
          <h1>Liste de mes matchs</h1>
          <Button onClick={disclosure.onOpen}>Créer un nouveau match</Button>
        </div>
        <div>
          <div className="flex gap-4 flex-wrap">
            {data && data.games.length ? (
              <>
                {data.games.map((game) => (
                  <GameListCard key={game.id} fragment={game} />
                ))}
              </>
            ) : (
              <span>Tu n&apos;as pas de match pour le moment</span>
            )}
          </div>
          <GameCreateModal disclosure={disclosure} />
        </div>
      </section>
    </main>
  );
}

GameListPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedRoute>{page}</AuthenticatedRoute>;
};

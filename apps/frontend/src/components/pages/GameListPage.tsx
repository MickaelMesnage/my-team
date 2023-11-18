import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { GameListCard } from "@/components/organisms/game/GameListCard";
import { ErrorHandler } from "@/components/molecules/ErrorHandler";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { ContainerWrapper } from "@/components/molecules/ContainerWrapper";
import { GameCreateModal } from "@/components/organisms/game/GameCreateModal";
import { GameCreateConnected } from "@/components/organisms/game/GameCreateConnected";
import { Game_Status_Enum } from "@/graphql/types";
import { useMemo } from "react";
import { useGameListPageSubscription } from "@/components/pages/GameListPage.generated";

export const GameListPage = () => {
  const disclosure = useDisclosure();
  const today = useMemo(() => new Date(), []);
  const { data, error, loading } = useGameListPageSubscription({
    variables: {
      where: {
        _or: [
          { timestamp: { _gte: today.toISOString() } },
          { status: { _eq: Game_Status_Enum.Validate } },
        ],
      },
    },
  });

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  return (
    <section className="w-full h-full">
      <div className="w-full h-full">
        <div className="w-full flex items-center justify-between mb-4">
          <h1>Mes matchs</h1>
          <Button className="hidden" onClick={disclosure.onOpen}>
            Créer une nouvelle équipe
          </Button>
        </div>
        <div>
          <div className="flex gap-4 flex-wrap pb-32">
            {data && data.games.length ? (
              <>
                {data.games.map((game) => (
                  <GameListCard key={game.id} fragment={game} />
                ))}
              </>
            ) : (
              <div className="flex flex-col gap-4 items-start">
                <span>
                  Tu n&apos;as pas de match de prévu pour le moment pour le
                  moment
                </span>
                <Button color="primary" onClick={disclosure.onOpen}>
                  Créer un match
                </Button>
              </div>
            )}
          </div>
          <GameCreateConnected
            render={(onCreate, loading) => (
              <GameCreateModal
                disclosure={disclosure}
                onCreateGame={onCreate}
                loading={loading}
              />
            )}
          />
        </div>
        <Dropdown placement="top-end">
          <DropdownTrigger className="absolute bottom-8 right-12">
            <button className="bg-primary p-4 rounded-full">
              <PlusIcon className="w-6 h-6" />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new" onClick={disclosure.onOpen}>
              Créer une nouveau match
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {/* </ContainerWrapper> */}
    </section>
  );
};

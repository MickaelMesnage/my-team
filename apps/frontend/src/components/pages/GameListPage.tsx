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
import { useGameListPageQuery } from "@/components/pages/GameListPage.generated";

export const GameListPage = () => {
  const disclosure = useDisclosure();
  const { data, error, loading } = useGameListPageQuery();

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  return (
    <section className="w-full h-full">
      <ContainerWrapper>
        <div className="w-full h-full relative">
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
            <GameCreateModal disclosure={disclosure} />
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
      </ContainerWrapper>
    </section>
  );
};

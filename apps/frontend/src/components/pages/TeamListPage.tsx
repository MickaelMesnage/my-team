import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { TeamListCard } from "@/components/organisms/TeamListCard";
import { TeamCreationGateway } from "@/components/organisms/TeamCreationGateway";
import { ErrorHandler } from "@/components/molecules/ErrorHandler";
import { useTeamListPageSubscription } from "@/components/pages/TeamListPage.generated";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { ContainerWrapper } from "@/components/molecules/ContainerWrapper";

export const TeamListPage = () => {
  const disclosure = useDisclosure();
  const { data, error, loading } = useTeamListPageSubscription();

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
            <h1>Liste de mes équipes</h1>
            <Button className="hidden" onClick={disclosure.onOpen}>
              Créer une nouvelle équipe
            </Button>
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
                <span>
                  Tu n&apos;as pas rejoins d&apos;équipe pour le moment
                </span>
              )}
            </div>
            <TeamCreationGateway disclosure={disclosure} />
          </div>
          <Dropdown placement="top-end">
            <DropdownTrigger className="absolute bottom-0 right-0 md:bottom-6 md:right-6">
              <button className="bg-primary p-4 rounded-full">
                <PlusIcon className="w-6 h-6" />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new" onClick={disclosure.onOpen}>
                Créer une nouvelle équipe
              </DropdownItem>
              <DropdownItem key="copy">Rejoindre une équipe</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </ContainerWrapper>
    </section>
  );
};

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { TeamListCard } from "@/components/organisms/team/TeamListCard";
import { ErrorHandler } from "@/components/molecules/ErrorHandler";
import { useTeamListPageSubscription } from "@/components/pages/TeamListPage.generated";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { ContainerWrapper } from "@/components/molecules/ContainerWrapper";
import { TeamCreateModal } from "@/components/organisms/team/TeamCreateModal";
import { TeamJoinModal } from "@/components/organisms/team/TeamJoinModal";

export const TeamListPage = () => {
  const createDisclosure = useDisclosure();
  const joinDisclosure = useDisclosure();
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
        <div className="w-full h-full">
          <div className="w-full flex items-center justify-between mb-4">
            <h1>Liste de mes équipes</h1>
            <Button className="hidden" onClick={createDisclosure.onOpen}>
              Créer une nouvelle équipe
            </Button>
          </div>
          <div className="flex gap-4 flex-wrap pb-32">
            {data && data.teams.length ? (
              <>
                {data.teams.map((team) => (
                  <TeamListCard key={team.id} fragment={team} />
                ))}
              </>
            ) : (
              <div className="flex flex-col gap-4 items-start">
                <span>
                  Tu n&apos;as pas rejoins d&apos;équipe pour le moment
                </span>
                <Button color="primary" onClick={createDisclosure.onOpen}>
                  Rejoindre une équipe
                </Button>
              </div>
            )}
          </div>
          <TeamCreateModal disclosure={createDisclosure} />
          <TeamJoinModal disclosure={joinDisclosure} />
        </div>
        <Dropdown placement="top-end">
          <DropdownTrigger className="absolute bottom-8 right-12">
            <button className="bg-primary p-4 rounded-full">
              <PlusIcon className="w-6 h-6" />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem onClick={createDisclosure.onOpen}>
              Créer une nouvelle équipe
            </DropdownItem>
            <DropdownItem onClick={joinDisclosure.onOpen}>
              Rejoindre une équipe
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ContainerWrapper>
    </section>
  );
};

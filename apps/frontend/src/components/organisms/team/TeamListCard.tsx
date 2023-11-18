import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { TeamListCardFragment } from "@/components/organisms/team/TeamListCard.generated";
import { useMemo } from "react";
import { AvatarList } from "@/components/molecules/AvatarList";
import { useTeam } from "@/components/organisms/team/useTeam";
import { TeamUpdateModal } from "@/components/organisms/team/TeamUpdateModal";
import { TeamUpdateConnected } from "@/components/organisms/team/TeamUpdateConnected";
import { BurgerIcon } from "@/components/icons/BurgerIcon";

export type TeamListCardProps = {
  fragment: TeamListCardFragment;
};

export const TeamListCard = ({ fragment }: TeamListCardProps) => {
  // Why fragment creator could be null ?
  const updatDislosure = useDisclosure();
  const { computedShareURL, canUpdate } = useTeam({
    ...fragment,
    creator: fragment.creator!,
  });
  const userList = useMemo(() => {
    return fragment.user_teams.map((user_team) => ({
      displayName: user_team.user?.displayName as string, // Display name is always string
      avatarURL: user_team.user?.profile?.avatar || undefined,
    }));
  }, [fragment.user_teams]);

  const copyComputedShareURLToClipboard = () => {
    navigator.clipboard.writeText(computedShareURL);
  };

  const copyGameIdToClipboard = () => {
    navigator.clipboard.writeText(fragment.id);
  };

  return (
    <Card className="w-full max-w-md">
      <CardBody>
        <div className="flex flex-col gap-2 items-start">
          <div className="w-full flex justify-between items-start">
            <h1>{fragment.name}</h1>

            <Dropdown placement="bottom-end">
              <DropdownTrigger className="cursor-pointer">
                <Button isIconOnly>
                  <BurgerIcon className="w-6 h-auto" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Actions" variant="flat">
                {/* <DropdownItem
                  onClick={copyComputedShareURLToClipboard}
                  key="copy-shared-url"
                >
                  Copier le lien de partage
                </DropdownItem> */}
                <DropdownItem
                  onClick={copyGameIdToClipboard}
                  key="necopy-game-id"
                >
                  Copier l&apos;id de partage
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <span>Créé par {fragment.creator?.displayName}</span>
          <span>{fragment.description}</span>
          <span>{fragment.user_teams.length} joueur(s)</span>
          <AvatarList userList={userList} />
          {canUpdate && (
            <>
              <Button color="primary" onClick={updatDislosure.onOpen}>
                Modifier
              </Button>
              <TeamUpdateConnected
                fragment={fragment}
                render={(onUpdate, loading) => (
                  <TeamUpdateModal
                    defaultValues={fragment}
                    onTeamUpdate={onUpdate}
                    loading={loading}
                    disclosure={updatDislosure}
                  />
                )}
              />
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

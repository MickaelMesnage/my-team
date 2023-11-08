import { CopyIcon } from "@/components/icons/CopyIcon";
import { TeamDetailsFragment } from "@/components/organisms/team/TeamDetails.generated";
import { TeamUpdateModal } from "@/components/organisms/team/TeamUpdateModal";
import { Button, useDisclosure } from "@nextui-org/react";
import { useUserData } from "@nhost/nextjs";

export type TeamDetailsProps = {
  fragment: TeamDetailsFragment;
};

export const TeamDetails = ({ fragment }: TeamDetailsProps) => {
  const updatDislosure = useDisclosure();
  // TODO Test compute field
  const user = useUserData();
  const canUpdate = fragment.creator?.id === user?.id;
  const canShare = true;
  const computedShareURL = `${process.env.NEXT_PUBLIC_APP_URL}/team/join/${fragment.id}`;

  const copyComputedShareURLToClipboard = () => {
    navigator.clipboard.writeText(computedShareURL);
  };

  return (
    <section className="flex flex-col gap-4">
      <h1>{fragment.name}</h1>
      <div>Creé par: {fragment.creator?.email}</div>
      {fragment.description && <div>Description: {fragment.description}</div>}
      {canUpdate && (
        <>
          <Button onClick={updatDislosure.onOpen}>Modifier</Button>
          <TeamUpdateModal
            defaultValues={fragment}
            disclosure={updatDislosure}
            teamId={fragment.id}
          />
        </>
      )}
      {canShare && (
        <div className="flex flex-col gap-4">
          <p>
            Vous pouvez inviter des gens dans votre team en partageant le lien
            suivant :
          </p>
          {computedShareURL}
          <Button onClick={copyComputedShareURLToClipboard} isIconOnly>
            <CopyIcon />
          </Button>
        </div>
      )}
    </section>
  );
};

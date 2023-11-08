import { useInsertTeamMutation } from "@/components/organisms/team/TeamCreateModal.generated";
import {
  TeamForm,
  TeamFormFieldsValue,
} from "@/components/organisms/team/TeamForm";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";

export type TeamCreateModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
};

export const TeamCreateModal = ({ disclosure }: TeamCreateModalProps) => {
  const { isOpen, onOpenChange } = disclosure;
  const [insertTeam, { loading }] = useInsertTeamMutation();

  const onTeamCreate = async (team: TeamFormFieldsValue) => {
    try {
      await insertTeam({
        variables: {
          team: {
            ...team,
            user_teams: { data: [{}] },
          },
        },
      });
      toast.success("Équipe créée !");
      disclosure.onClose();
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Création d&apos;une équipe
            </ModalHeader>
            <ModalBody>
              <TeamForm onSubmit={onTeamCreate} isLoading={loading} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

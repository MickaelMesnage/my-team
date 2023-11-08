import { useInsertTeamMutation } from "@/components/organisms/team/Team/TeamCreationModal.generated";
import {
  TeamForm,
  TeamFormFieldsValue,
  TeamFormProps,
} from "@/components/organisms/team/TeamForm";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";

export type TeamCreationModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
};

export const TeamCreationModal = ({ disclosure }: TeamCreationModalProps) => {
  const { isOpen, onOpenChange } = disclosure;
  const [insertTeam, { loading }] = useInsertTeamMutation();

  const onTeamCreation = async (team: TeamFormFieldsValue) => {
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
              <TeamForm onSubmit={onTeamCreation} isLoading={loading} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

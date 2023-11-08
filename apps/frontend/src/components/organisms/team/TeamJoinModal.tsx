import { useTeamJoinMutation } from "@/components/organisms/team/TeamJoinModal.generated";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import {
  TeamJoinForm,
  TeamJoinFormFieldsValue,
} from "@/components/organisms/team/TeamJoinForm";

export type TeamJoinModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
};

export const TeamJoinModal = ({ disclosure }: TeamJoinModalProps) => {
  const { isOpen, onOpenChange } = disclosure;
  const [teamJoin, { loading }] = useTeamJoinMutation();

  const onSubmit = async (team: TeamJoinFormFieldsValue) => {
    try {
      await teamJoin({
        variables: {
          ...team,
        },
      });
      toast.success("Équipe rejointe !");
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
              Rejoindre une équipe
            </ModalHeader>
            <ModalBody>
              <TeamJoinForm onSubmit={onSubmit} isLoading={loading} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

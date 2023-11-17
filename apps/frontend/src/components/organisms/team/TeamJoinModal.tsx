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
  onTeamJoin: (teamId: string) => Promise<void>;
  loading?: boolean;
  disclosure: ReturnType<typeof useDisclosure>;
};

export const TeamJoinModal = ({
  disclosure,
  onTeamJoin,
  loading = false,
}: TeamJoinModalProps) => {
  const { isOpen, onOpenChange } = disclosure;

  const onSubmit = async ({ teamId }: TeamJoinFormFieldsValue) => {
    try {
      await onTeamJoin(teamId);
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

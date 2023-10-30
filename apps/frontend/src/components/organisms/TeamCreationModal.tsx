import { TeamForm, TeamFormProps } from "@/components/organisms/TeamForm";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export type TeamCreationModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
} & TeamFormProps;

export const TeamCreationModal = ({
  disclosure,
  onSubmit,
}: TeamCreationModalProps) => {
  const { isOpen, onOpenChange } = disclosure;
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Création d&apos;une équipe
            </ModalHeader>
            <ModalBody>
              <TeamForm onSubmit={onSubmit} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

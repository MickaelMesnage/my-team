import {
  TeamCreationForm,
  TeamCreationFormProps,
} from "@/components/organisms/TeamCreationForm";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export type TeamCreationModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
} & TeamCreationFormProps;

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
              <TeamCreationForm onSubmit={onSubmit} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

import { TeamForm, TeamFormProps } from "@/components/organisms/TeamForm";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export type TeamUpdateModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
} & TeamFormProps;

export const TeamUpdateModal = ({
  disclosure,
  ...rest
}: TeamUpdateModalProps) => {
  const { isOpen, onOpenChange } = disclosure;
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modification d&apos;une équipe
            </ModalHeader>
            <ModalBody>
              <TeamForm {...rest} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

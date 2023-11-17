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

export type TeamUpdateModalProps = {
  onTeamUpdate: (data: TeamFormFieldsValue) => Promise<void>;
  loading: boolean;
  disclosure: ReturnType<typeof useDisclosure>;
} & Pick<TeamFormProps, "defaultValues">;

export const TeamUpdateModal = ({
  disclosure,
  defaultValues,
  onTeamUpdate,
  loading,
}: TeamUpdateModalProps) => {
  const { isOpen, onOpenChange, onClose } = disclosure;

  const onSubmit = async (data: TeamFormFieldsValue) => {
    try {
      await onTeamUpdate(data);
      toast.success("L'équipe a été modifiée !");
      onClose();
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.log({ error });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modification d&apos;une équipe
            </ModalHeader>
            <ModalBody>
              <TeamForm
                onSubmit={onSubmit}
                defaultValues={defaultValues}
                isLoading={loading}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

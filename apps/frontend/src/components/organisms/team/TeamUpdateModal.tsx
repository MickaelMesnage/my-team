import {
  TeamForm,
  TeamFormFieldsValue,
  TeamFormProps,
} from "@/components/organisms/team/TeamForm";
import { useTeamUpdateMutation } from "@/components/organisms/team/TeamUpdateModal.generated";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";

export type TeamUpdateModalProps = {
  teamId: string;
  disclosure: ReturnType<typeof useDisclosure>;
} & Pick<TeamFormProps, "defaultValues">;

export const TeamUpdateModal = ({
  teamId,
  disclosure,
  defaultValues,
}: TeamUpdateModalProps) => {
  const { isOpen, onOpenChange } = disclosure;
  const [updateTeam, { loading }] = useTeamUpdateMutation();

  const onTeamUpdate = async (data: TeamFormFieldsValue) => {
    try {
      await updateTeam({
        variables: { data, teamId },
      });
      toast.success("Équipe Modifiée !");
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
              Modification d&apos;une équipe
            </ModalHeader>
            <ModalBody>
              <TeamForm
                onSubmit={onTeamUpdate}
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

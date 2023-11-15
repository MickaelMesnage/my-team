import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import {
  GameForm,
  GameFormFieldsValue,
} from "@/components/organisms/game/GameForm";

export type GameCreateModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
  onCreateGame: (game: GameFormFieldsValue) => Promise<void>;
  loading?: boolean;
};

export const GameCreateModal = ({
  disclosure,
  onCreateGame,
  loading,
}: GameCreateModalProps) => {
  const { isOpen, onOpenChange } = disclosure;

  const onSubmit = async (game: GameFormFieldsValue) => {
    await onCreateGame(game);
    disclosure.onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Création d&apos;un match
            </ModalHeader>
            <ModalBody>
              <GameForm onSubmit={onSubmit} isLoading={loading} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

import { GameJoinConnectedFragment } from "@/components/organisms/game/GameJoinConnected.generated";
import { GameJoinModalFragment } from "@/components/organisms/game/GameJoinModal.generated";
import { useApolloClient } from "@apollo/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
} from "@nextui-org/react";

export type GameJoinModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
  fragment: GameJoinModalFragment;
  loading: boolean;
  onJoin: () => Promise<void>;
};

export const GameJoinModal = ({
  disclosure,
  fragment,
  loading,
  onJoin,
}: GameJoinModalProps) => {
  const { isOpen, onOpenChange, onClose } = disclosure;
  const { timestamp } = fragment;
  const formattedDate = new Date(timestamp).toLocaleDateString();
  const formattedTime = new Date(timestamp).toLocaleTimeString();

  const onClick = async () => {
    await onJoin();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Participer au match
            </ModalHeader>
            <ModalBody>
              <p>{`Êtes-vous sur de vouloir participer au match à ${formattedTime} le ${formattedDate} ?`}</p>
              <div className="w-full flex justify-end">
                <div className="flex gap-2">
                  <Button color="default" onClick={onClose}>
                    Annuler
                  </Button>
                  <Button
                    isLoading={loading}
                    isDisabled={loading}
                    onClick={onClick}
                    color="primary"
                  >
                    Participer
                  </Button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

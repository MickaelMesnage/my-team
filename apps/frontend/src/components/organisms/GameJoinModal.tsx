import { useGameJoinMutation } from "@/components/organisms/GameJoinModal.generated";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { toast } from "react-toastify";

export type GameJoinModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
  gameId: string;
  timestamp: Date;
};

export const GameJoinModal = ({
  disclosure,
  gameId,
  timestamp,
}: GameJoinModalProps) => {
  const { isOpen, onOpenChange, onClose } = disclosure;
  const formattedDate = new Date(timestamp).toLocaleDateString();
  const formattedTime = new Date(timestamp).toLocaleTimeString();

  const [joinGame, { loading }] = useGameJoinMutation();

  const onClick = async () => {
    try {
      await joinGame({
        variables: {
          gameId,
        },
      });
      toast.success("Vous participez au match !");
      onClose();
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
              Participer au match
            </ModalHeader>
            <ModalBody>
              <p>{`Êtes-vous sur de vouloir participer au match à ${formattedTime} le ${formattedDate} ?`}</p>
              <div className="w-full flex justify-end">
                <div className="flex gap-2">
                  <Button color="default" onClick={onClose}>
                    Annuler
                  </Button>
                  <Button onClick={onClick}>Participer</Button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useUserData } from "@nhost/nextjs";
import { useInsertGameMutation } from "@/components/organisms/GameCreateModal.generated";
import { GameForm, GameFormFieldsValue } from "@/components/organisms/GameForm";

export type GameCreateModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
};

export const GameCreateModal = ({ disclosure }: GameCreateModalProps) => {
  const { isOpen, onOpenChange } = disclosure;
  const user = useUserData();
  const [insertTeam, { loading, error }] = useInsertGameMutation();

  if (!user?.id) throw new Error("GameCreateModal: User not logged");

  const onCreateGame = async (game: GameFormFieldsValue) => {
    try {
      await insertTeam({
        variables: {
          game: {
            timestamp: new Date(`${game.date} ${game.time}`).toISOString(),
            teamId: game.teamId,
            ...(game.participate && { user_games: { data: [{}] } }),
          },
        },
      });

      toast.success("Match créé !");
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
              Création d&apos;un match
            </ModalHeader>
            <ModalBody>
              <GameForm onSubmit={onCreateGame} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

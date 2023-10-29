import { TeamCreationFormFieldsValue } from "@/components/organisms/TeamCreationForm";
import { useInsertTeamMutation } from "@/components/organisms/TeamCreationGateway.generated";
import {
  TeamCreationModal,
  TeamCreationModalProps,
} from "@/components/organisms/TeamCreationModal";
import { toast } from "react-toastify";

export type TeamCreationGatewayProps = Pick<
  TeamCreationModalProps,
  "disclosure"
>;

export const TeamCreationGateway = (props: TeamCreationGatewayProps) => {
  const { disclosure } = props;
  const [insertTeam, { loading, error }] = useInsertTeamMutation();

  const onTeamCreation = async (team: TeamCreationFormFieldsValue) => {
    try {
      await insertTeam({ variables: { team } });
      toast.success("Équipe créée !");
      disclosure.onClose();
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return <TeamCreationModal onSubmit={onTeamCreation} {...props} />;
};

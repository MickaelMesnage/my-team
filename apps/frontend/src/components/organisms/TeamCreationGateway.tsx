import { TeamFormFieldsValue } from "@/components/organisms/TeamForm";
import { useInsertTeamMutation } from "@/components/organisms/TeamCreationGateway.generated";
import {
  TeamCreationModal,
  TeamCreationModalProps,
} from "@/components/organisms/TeamCreationModal";
import { toast } from "react-toastify";
import { useUserData } from "@nhost/nextjs";

export type TeamCreationGatewayProps = Pick<
  TeamCreationModalProps,
  "disclosure"
>;

export const TeamCreationGateway = (props: TeamCreationGatewayProps) => {
  const { disclosure } = props;
  const user = useUserData();
  const [insertTeam, { loading, error }] = useInsertTeamMutation();

  if (!user?.id) throw new Error("User not logged in in TeamCreationGateway");

  const onTeamCreation = async (team: TeamFormFieldsValue) => {
    try {
      const { data } = await insertTeam({
        variables: {
          team: {
            ...team,
            user_teams: { data: [{}] },
          },
        },
      });
      toast.success("Équipe créée !");
      disclosure.onClose();
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return <TeamCreationModal onSubmit={onTeamCreation} {...props} />;
};

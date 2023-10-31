import { TeamFormFieldsValue } from "@/components/organisms/TeamForm";
import { TeamCreationModal } from "@/components/organisms/TeamCreationModal";
import { toast } from "react-toastify";
import { useTeamUpdateMutation } from "@/components/organisms/TeamUpdateGateway.generated";
import {
  TeamUpdateModal,
  TeamUpdateModalProps,
} from "@/components/organisms/TeamUpdateModal";

export type TeamUpdateGatewayProps = Pick<
  TeamUpdateModalProps,
  "disclosure" | "defaultValues"
> & {
  teamId: string;
};

export const TeamUpdateGateway = ({
  teamId,
  ...rest
}: TeamUpdateGatewayProps) => {
  const { disclosure } = rest;
  const [updateTeam, { loading, error }] = useTeamUpdateMutation();

  const onTeamCreation = async (data: TeamFormFieldsValue) => {
    try {
      await updateTeam({
        variables: { data, teamId },
      });
      toast.success("Équipe créée !");
      disclosure.onClose();
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return <TeamUpdateModal onSubmit={onTeamCreation} {...rest} />;
};

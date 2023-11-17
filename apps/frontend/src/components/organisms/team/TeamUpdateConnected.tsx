import { TeamFormFieldsValue } from "@/components/organisms/team/TeamForm";
import {
  TeamUpdateConnectedFragment,
  useTeamUpdateMutation,
} from "@/components/organisms/team/TeamUpdateConnected.generated";

import { ReactNode } from "react";

export type TeamUpdateConnectedProps = {
  fragment: TeamUpdateConnectedFragment;
  render: (
    onTeampUpdate: (data: TeamFormFieldsValue) => Promise<void>,
    loading: boolean
  ) => ReactNode;
};

export const TeamUpdateConnected = ({
  fragment,
  render,
}: TeamUpdateConnectedProps) => {
  const [updateTeam, { loading }] = useTeamUpdateMutation();

  const onTeamUpdate = async (data: TeamFormFieldsValue) => {
    await updateTeam({
      variables: { data, teamId: fragment.id },
    });
  };

  return <>{render(onTeamUpdate, loading)}</>;
};

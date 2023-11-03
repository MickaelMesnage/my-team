import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { Error } from "@/components/molecules/Error";
import { useTeamSelectQuery } from "@/components/organisms/TeamSelect.generated";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";

export type TeamSelectProps = Pick<
  SelectProps,
  "value" | "onChange" | "errorMessage"
>;

export const TeamSelect = (props: TeamSelectProps) => {
  const { data, loading, error } = useTeamSelectQuery();

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!data || !data.teams.length) {
    return <span>error</span>;
  }

  return (
    <Select
      label="Equipe"
      placeholder="Ex: Les copains"
      labelPlacement="outside"
      {...props}
    >
      {data.teams.map((team) => (
        <SelectItem key={team.id} value={team.id}>
          {team.name}
        </SelectItem>
      ))}
    </Select>
  );
};

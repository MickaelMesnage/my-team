import { AutomaticTeamJoin } from "@/components/organisms/team/AutomaticTeamJoin";
import { TeamJoinConnected } from "@/components/organisms/team/TeamJoinConnected";
import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function TeamJoinPage() {
  const router = useRouter();
  const { id: teamId } = router.query;

  if (typeof teamId !== "string") {
    return <span>Erreur sur le team id</span>;
  }

  return (
    <main>
      <section>
        <TeamJoinConnected
          render={(onTeamJoin) => (
            <AutomaticTeamJoin onTeamJoin={onTeamJoin} teamId={teamId} />
          )}
        />
      </section>
    </main>
  );
}

TeamJoinPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedRoute>{page}</AuthenticatedRoute>;
};

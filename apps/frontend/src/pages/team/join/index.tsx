import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { useTeamJoinMutation } from "@/components/pageGraphqlRequests/TeamJoin.generated";
import { Button } from "@nextui-org/react";
import { useAuthenticationStatus } from "@nhost/nextjs";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function TeamJoinPage() {
  const router = useRouter();
  const [joinTeam, { loading }] = useTeamJoinMutation();
  const { team_id } = router.query;
  // const team_id = "1";
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  const onClick = async () => {
    try {
      const { errors } = await joinTeam({ variables: { teamId: team_id } });

      if (errors) throw new Error(errors[0].message);

      toast.success("Vous avez rejoint l'équipe");
      router.push("/team/list");
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.log(error);
    }
  };

  if (typeof team_id !== "string") {
    <span>Erreur sur le team id</span>;
  }

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col gap-4">
        <span>vous devez être connecté avant de rejoindre une équipe</span>
        <Button as={NextLink} href="/auth/signin">
          Se connecter
        </Button>
        <Button as={NextLink} href="/auth/signup">
          S&apos;inscrire
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <CenteredSpinner />;
  }

  return (
    <main>
      <section>
        <h1>Rejoindre la team</h1>
        <Button isLoading={loading} disabled={loading} onClick={onClick}>
          Rejoindre
        </Button>
      </section>
    </main>
  );
}

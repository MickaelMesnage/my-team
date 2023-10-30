import { Button, useDisclosure } from "@nextui-org/react";
import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";
import { useUserData } from "@nhost/nextjs";
import { TeamList } from "@/components/organisms/TeamList";

export default function TeamListPage() {
  const user = useUserData();
  const disclosure = useDisclosure();

  return (
    <AuthenticatedRoute>
      <main>
        <section>
          <div>{user?.email}</div>
          <div className="w-full flex items-center justify-between mb-4">
            <h1>Liste de mes équipes</h1>
            <Button onClick={disclosure.onOpen}>
              Créer une nouvelle équipe
            </Button>
          </div>
          <TeamList disclosure={disclosure} />
        </section>
      </main>
    </AuthenticatedRoute>
  );
}

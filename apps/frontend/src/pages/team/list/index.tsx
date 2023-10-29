import { TeamList } from "@/components/organisms/TeamList";
import { Button, useDisclosure } from "@nextui-org/react";
import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";
import { TeamCreationGateway } from "@/components/organisms/TeamCreationGateway";

export default function TeamListPage() {
  const disclosure = useDisclosure();

  return (
    <AuthenticatedRoute>
      <main>
        <div className="w-full flex items-center justify-between">
          <h1>Liste de mes équipes</h1>
          <Button onClick={disclosure.onOpen}>Créer une nouvelle équipe</Button>
        </div>
        <TeamList />
        <TeamCreationGateway disclosure={disclosure} />
      </main>
    </AuthenticatedRoute>
  );
}

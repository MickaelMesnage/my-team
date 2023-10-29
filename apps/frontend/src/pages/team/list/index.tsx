import { TeamList } from "@/components/organisms/TeamList";
import { AuthenticatedRoute } from "@/pages/team/AuthenticatedRoute";

export default function TeamListPage() {
  return (
    <AuthenticatedRoute>
      <main>
        <TeamList />
      </main>
    </AuthenticatedRoute>
  );
}

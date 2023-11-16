import { ReactElement } from "react";
import { TeamListPage } from "@/components/pages/TeamListPage";
import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";

export default function Page() {
  return (
    <main className="w-full h-full">
      <TeamListPage />
    </main>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedRoute>{page}</AuthenticatedRoute>;
};

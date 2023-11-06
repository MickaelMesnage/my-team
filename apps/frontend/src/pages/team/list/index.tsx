import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";
import { ReactElement } from "react";
import { TeamListPage } from "@/components/pages/TeamListPage";

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

import { ReactElement } from "react";
import { GameListPage } from "@/components/pages/GameListPage";
import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";

export default function Page() {
  return (
    <main className="w-full h-full">
      <GameListPage />
    </main>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedRoute>{page}</AuthenticatedRoute>;
};

import { ProfilePage } from "@/components/pages/ProfilePage";
import { AuthenticatedRoute } from "@/components/providers/AuthenticatedRoute";
import { ReactElement } from "react";

export default function Page() {
  return (
    <main className="w-full h-full">
      <ProfilePage />
    </main>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedRoute>{page}</AuthenticatedRoute>;
};

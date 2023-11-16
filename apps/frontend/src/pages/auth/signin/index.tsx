import { SigninGateway } from "@/components/organisms/SigninGateway";
import { UnauthenticatedRoute } from "@/components/providers/UnauthenticatedRoute";
import { ReactElement } from "react";

export default function SigninPage() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <SigninGateway />
    </main>
  );
}

SigninPage.getLayout = function getLayout(page: ReactElement) {
  return <UnauthenticatedRoute>{page}</UnauthenticatedRoute>;
};

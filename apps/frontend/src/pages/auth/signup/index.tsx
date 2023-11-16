import { SignupGateway } from "@/components/organisms/SignupGateway";
import { UnauthenticatedRoute } from "@/components/providers/UnauthenticatedRoute";
import { ReactElement } from "react";

export default function SignupPage() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <SignupGateway />
    </main>
  );
}

SignupPage.getLayout = function getLayout(page: ReactElement) {
  return <UnauthenticatedRoute>{page}</UnauthenticatedRoute>;
};

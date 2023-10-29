import { SigninGateway } from "@/components/organisms/SigninGateway";
import { UnauthenticatedRoute } from "@/components/providers/UnauthenticatedRoute";

export default function SigninPage() {
  return (
    <UnauthenticatedRoute>
      <main className="w-full h-full flex items-center justify-center">
        <SigninGateway />
      </main>
    </UnauthenticatedRoute>
  );
}

import { SignupGateway } from "@/components/organisms/SignupGateway";
import { UnauthenticatedRoute } from "@/components/providers/UnauthenticatedRoute";

export default function SignupPage() {
  return (
    <UnauthenticatedRoute>
      <main className="w-full h-full flex items-center justify-center">
        <SignupGateway />
      </main>
    </UnauthenticatedRoute>
  );
}

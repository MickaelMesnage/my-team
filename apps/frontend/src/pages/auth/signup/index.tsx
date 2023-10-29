import { ConnectedSignupForm } from "@/components/organisms/ConnectedSignupForm";
import { UnauthenticatedRoute } from "@/pages/auth/UnauthenticatedRoute";

export default function SignupPage() {
  return (
    <UnauthenticatedRoute>
      <main className="w-full h-full flex items-center justify-center">
        <ConnectedSignupForm />
      </main>
    </UnauthenticatedRoute>
  );
}

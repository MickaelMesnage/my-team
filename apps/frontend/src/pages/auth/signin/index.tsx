import { ConnectedSigninForm } from "@/components/organisms/ConnectedSigninForm";
import { UnauthenticatedRoute } from "@/pages/auth/UnauthenticatedRoute";

export default function SigninPage() {
  return (
    <UnauthenticatedRoute>
      <main className="w-full h-full flex items-center justify-center">
        <ConnectedSigninForm />
      </main>
    </UnauthenticatedRoute>
  );
}

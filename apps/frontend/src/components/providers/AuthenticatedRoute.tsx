import { useAuthenticationStatus } from "@nhost/nextjs";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { ConnectedLayout } from "@/components/layouts/ConnectedLayout";

export const AuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const router = useRouter();

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (!isAuthenticated) {
    router.push("/auth/signin");
    return;
  }

  return <ConnectedLayout>{children}</ConnectedLayout>;
};

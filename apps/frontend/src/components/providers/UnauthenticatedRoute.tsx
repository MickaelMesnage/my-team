import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { useAuthenticationStatus } from "@nhost/nextjs";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export const UnauthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const router = useRouter();

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (isAuthenticated) {
    router.push("/");
    return;
  }

  return children;
};

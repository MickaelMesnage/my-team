import { useAuthenticationStatus } from "@nhost/nextjs";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { CenteredSpinner } from "../../components/molecules/CenteredSpinner";

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

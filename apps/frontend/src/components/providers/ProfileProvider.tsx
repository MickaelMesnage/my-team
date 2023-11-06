import { useUserData } from "@nhost/nextjs";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { useProfileSubscription } from "@/components/providers/ProfileProvider.generated";
import { ErrorHandler } from "@/components/molecules/ErrorHandler";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const user = useUserData();
  const router = useRouter();

  if (!user) throw new Error("No user");

  const { data, loading, error } = useProfileSubscription({
    variables: { userId: user.id },
  });

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  console.log("dede");
  console.log({ data });
  // if (!data?.profiles_by_pk) {
  //   router.push("/profile");
  //   return;
  // }

  return children;
};

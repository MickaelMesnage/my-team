import { CenteredSpinner } from "@/components/molecules/CenteredSpinner";
import { ErrorHandler } from "@/components/molecules/ErrorHandler";
import { ProfileFormConnected } from "@/components/organisms/ProfileFormConnected";
import { useProfilePageSubscription } from "@/components/pages/ProfilePage.generated";
import { useUserId } from "@nhost/nextjs";
import { ContainerWrapper } from "../molecules/ContainerWrapper";

export const ProfilePage = () => {
  const userId = useUserId();

  if (!userId) throw new Error("ProfilePage: User id is not defined");

  const { data, loading, error } = useProfilePageSubscription({
    variables: { userId },
  });

  if (loading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <ErrorHandler error={error} />;
  }

  const defaultValues = {
    nickname: data?.user?.displayName || "",
    avatar: data?.user?.profile?.avatar || "",
  };

  return (
    <section>
      <h1>Profile</h1>
      <ProfileFormConnected defaultValues={defaultValues} />
    </section>
  );
};

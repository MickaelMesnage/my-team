import {
  ProfileForm,
  ProfileFormFieldsValue,
  ProfileFormProps,
} from "@/components/organisms/ProfileForm";
import {
  useUpdateProfileMutation,
  useUpdateUserMutation,
} from "@/components/organisms/ProfileFormConnected.generated";
import { useUserId } from "@nhost/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export type ProfileFormConnectedProps = Pick<ProfileFormProps, "defaultValues">;

export const ProfileFormConnected = (props: ProfileFormConnectedProps) => {
  const router = useRouter();
  const userId = useUserId();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateUser] = useUpdateUserMutation();
  const [updateProfile] = useUpdateProfileMutation();

  if (!userId) throw new Error("ProfileFormConnected: User id is not defined");

  const onSubmit = async (data: ProfileFormFieldsValue) => {
    try {
      setIsLoading(true);
      await updateUser({
        variables: { userId, user: { displayName: data.nickname } },
      });
      await updateProfile({
        variables: { profile: { avatar: data.avatar } },
      });
      toast.success("Votre profil a été modifié !");
      // router.push("/");
    } catch (error: any) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return <ProfileForm onSubmit={onSubmit} isLoading={isLoading} {...props} />;
};

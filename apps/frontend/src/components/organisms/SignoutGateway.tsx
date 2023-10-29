import { Button } from "@nextui-org/react";
import { useSignOut } from "@nhost/nextjs";

export const SignoutGateway = () => {
  const { signOut } = useSignOut();

  return <Button onClick={signOut}>Se déconnecter</Button>;
};

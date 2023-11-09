import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import NextLink from "next/link";
import { SigninForm, SigninFormFieldsValue } from "./SigninForm";
import { useSignInEmailPassword } from "@nhost/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useRef } from "react";

export const SigninGateway = () => {
  const router = useRouter();
  const { signInEmailPassword, isLoading } = useSignInEmailPassword();
  const formRef = useRef(null);

  const resetForm = () => {
    // @ts-ignore TODO
    formRef?.current?.resetForm();
  };

  const onSubmit = async (data: SigninFormFieldsValue) => {
    try {
      const { isSuccess } = await signInEmailPassword(
        data.email,
        data.password
      );

      if (!isSuccess) throw new Error();
      // toast.success("Vous êtes connecté !");
      resetForm();
      router.push("/");
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex justify-center">Connexion</CardHeader>
      <Divider />
      <CardBody>
        <SigninForm isLoading={isLoading} ref={formRef} onSubmit={onSubmit} />
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-center gap-1">
        <span>Vous n&apos;avez pas de compte ?</span>
        <Link href="/auth/signup" as={NextLink}>
          Créer un compte
        </Link>
      </CardFooter>
    </Card>
  );
};

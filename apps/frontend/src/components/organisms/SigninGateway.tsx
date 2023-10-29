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
  const { signInEmailPassword } = useSignInEmailPassword();
  const formRef = useRef(null);

  const resetForm = () => {
    // @ts-ignore TODO
    formRef?.current?.resetForm();
  };

  const onSubmit = async (data: SigninFormFieldsValue) => {
    try {
      await signInEmailPassword(data.email, data.password);
      toast("Vous êtes connecté !", { type: "success" });
      resetForm();
      router.push("/");
    } catch (error) {
      toast("Une erreur est survenue", { type: "error" });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex justify-center">Connexion</CardHeader>
      <Divider />
      <CardBody>
        <SigninForm ref={formRef} onSubmit={onSubmit} />
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

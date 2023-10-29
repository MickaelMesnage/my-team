import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { useSignUpEmailPassword } from "@nhost/nextjs";
import NextLink from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  SignupForm,
  SignupFormFieldsValue,
} from "@/components/organisms/SignupForm";

export const ConnectedSignupForm = () => {
  const router = useRouter();
  const { signUpEmailPassword } = useSignUpEmailPassword();

  const onSubmit = async (data: SignupFormFieldsValue) => {
    try {
      await signUpEmailPassword(data.email, data.password);
      toast.success("Vous êtes inscris ! Vérifiez vos mails");
      router.push("/");
    } catch (error) {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex justify-center">Inscription</CardHeader>
      <Divider />
      <CardBody>
        <SignupForm onSubmit={onSubmit} />
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-center gap-1">
        <span>Vous avez déjà un compte ?</span>
        <Link href="/auth/signin" as={NextLink}>
          Se connecter
        </Link>
      </CardFooter>
    </Card>
  );
};

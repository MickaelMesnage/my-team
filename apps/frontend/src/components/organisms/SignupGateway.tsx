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

export const SignupGateway = () => {
  const router = useRouter();
  const { signUpEmailPassword, isLoading } = useSignUpEmailPassword();

  const onSubmit = async (data: SignupFormFieldsValue) => {
    try {
      const { isError } = await signUpEmailPassword(data.email, data.password);
      if (isError) throw new Error();

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
        <SignupForm isLoading={isLoading} onSubmit={onSubmit} />
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

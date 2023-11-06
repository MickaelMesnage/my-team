import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "@/components/molecules/PasswordInput";

export const signupFormZodSchema = z.object({
  email: z.string().email("L'email n'est pas valide"),
  password: z
    .string()
    .min(9, "Le mot de passe doit faire au moins 9 caractères"),
  nickname: z.string().min(1, "Le pseudo est obligatoire"),
});

export type SignupFormFieldsValue = z.infer<typeof signupFormZodSchema>;

const DEFAULT_VALUES: SignupFormFieldsValue = {
  email: "",
  password: "",
  nickname: "",
};

export type SignupFormProps = {
  isLoading: boolean;
  onSubmit: (data: SignupFormFieldsValue) => Promise<void>;
};

export const SignupForm = ({
  onSubmit,
  isLoading = false,
}: SignupFormProps) => {
  const methods = useForm<SignupFormFieldsValue>({
    resolver: zodResolver(signupFormZodSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { handleSubmit, control } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              type="email"
              label="Email"
              placeholder="Ex: zinedine@gmail.com"
              labelPlacement="outside"
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              autoComplete="email"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <PasswordInput
              label="Mot de passe"
              placeholder="Ex: *********"
              labelPlacement="outside"
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              autoComplete="new-password"
            />
          )}
        />
        <Controller
          control={control}
          name="nickname"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              type="text"
              label="Pseudo"
              placeholder="Ex: Zizou"
              labelPlacement="outside"
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          type="submit"
          color="primary"
        >
          S&apos;inscrire
        </Button>
      </form>
    </FormProvider>
  );
};

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "@/components/molecules/PasswordInput";

export const signupFormZodSchema = z.object({
  email: z.string(),
  password: z.string().min(9),
});

export type SignupFormFieldsValue = z.infer<typeof signupFormZodSchema>;

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
              key="email"
              type="email"
              label="Email"
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
              key="password"
              label="Mot de passe"
              errorMessage={error?.message}
              value={value}
              onChange={onChange}
              autoComplete="new-password"
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

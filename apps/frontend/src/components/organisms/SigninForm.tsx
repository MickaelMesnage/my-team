import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "@/components/molecules/PasswordInput";
import { forwardRef, useImperativeHandle } from "react";

export const signinFormZodSchema = z.object({
  email: z.string(),
  password: z.string().min(9),
});

export type SigninFormFieldsValue = z.infer<typeof signinFormZodSchema>;

export type SigninFormProps = {
  isLoading: boolean;
  onSubmit: (data: SigninFormFieldsValue) => Promise<void>;
};
export const SigninForm = forwardRef(
  ({ onSubmit, isLoading = false }: SigninFormProps, ref) => {
    const methods = useForm<SigninFormFieldsValue>({
      resolver: zodResolver(signinFormZodSchema),
    });

    const { handleSubmit, control, reset } = methods;

    const resetForm = () => {
      reset({ email: "", password: "" });
    };

    useImperativeHandle(ref, () => ({
      resetForm,
    }));

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
                autoComplete="current-password"
              />
            )}
          />
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            color="primary"
          >
            Se connecter
          </Button>
        </form>
      </FormProvider>
    );
  }
);

SigninForm.displayName = "SigninForm";

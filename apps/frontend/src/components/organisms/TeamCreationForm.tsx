import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { forwardRef, useImperativeHandle } from "react";

export const teamCreationformZodSchema = z.object({
  name: z.string(),
});

export type TeamCreationFormFieldsValue = z.infer<
  typeof teamCreationformZodSchema
>;

export type TeamCreationFormProps = {
  onSubmit: (data: TeamCreationFormFieldsValue) => Promise<void>;
};
export const TeamCreationForm = forwardRef(
  ({ onSubmit }: TeamCreationFormProps, ref) => {
    const methods = useForm<TeamCreationFormFieldsValue>({
      resolver: zodResolver(teamCreationformZodSchema),
      defaultValues: { name: "" },
    });

    const { handleSubmit, control, reset } = methods;

    const resetForm = () => {
      reset({ name: "" });
    };

    useImperativeHandle(ref, () => ({
      resetForm,
    }));

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                key="name"
                type="text"
                label="Nom de l'équipe"
                errorMessage={error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Button type="submit" color="primary">
            Créer
          </Button>
        </form>
      </FormProvider>
    );
  }
);

TeamCreationForm.displayName = "TeamCreationForm";

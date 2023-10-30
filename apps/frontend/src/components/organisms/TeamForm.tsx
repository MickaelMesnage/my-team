import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { forwardRef, useImperativeHandle } from "react";

export const TeamFormZodSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type TeamFormFieldsValue = z.infer<typeof TeamFormZodSchema>;

export type TeamFormProps = {
  onSubmit: (data: TeamFormFieldsValue) => Promise<void>;
  defaultValues?: TeamFormFieldsValue;
};

const DEFAULT_VALUES: TeamFormFieldsValue = { name: "", description: "" };

export const TeamForm = forwardRef(
  ({ onSubmit, defaultValues = DEFAULT_VALUES }: TeamFormProps, ref) => {
    const methods = useForm<TeamFormFieldsValue>({
      resolver: zodResolver(TeamFormZodSchema),
      defaultValues,
    });

    const { handleSubmit, control, reset } = methods;

    const resetForm = () => {
      reset(DEFAULT_VALUES);
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
                type="text"
                label="Nom de l'équipe"
                errorMessage={error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                isRequired={false}
                type="text"
                label="Descritpion de l'équipe"
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

TeamForm.displayName = "TeamForm";

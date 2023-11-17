import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeEvent, forwardRef, useImperativeHandle } from "react";

export const TeamFormZodSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  description: z.string().optional().nullable(),
  gameFullTreshold: z.number().optional().nullable(),
  // gameAlmostFullTreshold: z.number().optional().nullable(),
});

export type TeamFormFieldsValue = z.infer<typeof TeamFormZodSchema>;

export type TeamFormProps = {
  isLoading?: boolean;
  onSubmit: (data: TeamFormFieldsValue) => Promise<void>;
  defaultValues?: TeamFormFieldsValue;
};

const DEFAULT_VALUES: TeamFormFieldsValue = {
  name: "",
  description: "",
};

export const TeamForm = forwardRef(
  (
    {
      isLoading = false,
      onSubmit,
      defaultValues = DEFAULT_VALUES,
    }: TeamFormProps,
    ref
  ) => {
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
                placeholder="Ex: Les champions"
                labelPlacement="outside"
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
                label="Description de l'équipe"
                placeholder="Ex: Une équipe de champions"
                labelPlacement="outside"
                errorMessage={error?.message}
                value={value || ""}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="gameFullTreshold"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                isRequired={false}
                type="number"
                label="Nombre de joueurs maximum"
                placeholder="Ex: 10"
                labelPlacement="outside"
                errorMessage={error?.message}
                // Bug of nextui
                value={
                  value !== null && value !== undefined ? value.toString() : ""
                }
                inputMode="numeric"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onChange(event.target.valueAsNumber)
                }
              />
            )}
          />
          {/* <Controller
            control={control}
            name="gameAlmostFullTreshold"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                isRequired={false}
                type="number"
                label="Limite de joueurs avant notification mail"
                placeholder="Ex: 8"
                labelPlacement="outside"
                errorMessage={error?.message}
                // Bug of nextui
                value={
                  value !== null && value !== undefined ? value.toString() : ""
                }
                inputMode="numeric"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onChange(event.target.valueAsNumber)
                }
              />
            )}
          /> */}
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            type="submit"
            color="primary"
          >
            Créer
          </Button>
        </form>
      </FormProvider>
    );
  }
);

TeamForm.displayName = "TeamForm";

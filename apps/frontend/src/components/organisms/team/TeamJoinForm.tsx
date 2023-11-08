import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { forwardRef, useImperativeHandle } from "react";

export const teamJoinFormZodSchema = z.object({
  teamId: z.string().min(1, "L'id est obligatoire"),
});

export type TeamJoinFormFieldsValue = z.infer<typeof teamJoinFormZodSchema>;

export type TeamJoinFormProps = {
  isLoading?: boolean;
  onSubmit: (data: TeamJoinFormFieldsValue) => Promise<void>;
  defaultValues?: TeamJoinFormFieldsValue;
};

const DEFAULT_VALUES: TeamJoinFormFieldsValue = {
  teamId: "",
};

export const TeamJoinForm = forwardRef(
  (
    {
      isLoading = false,
      onSubmit,
      defaultValues = DEFAULT_VALUES,
    }: TeamJoinFormProps,
    ref
  ) => {
    const methods = useForm<TeamJoinFormFieldsValue>({
      resolver: zodResolver(teamJoinFormZodSchema),
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
            name="teamId"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                type="text"
                label="Id de l'équipe"
                placeholder="Ex: 45fgyt-535f5ff-frrz4"
                labelPlacement="outside"
                errorMessage={error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            type="submit"
            color="primary"
          >
            Rejoindre
          </Button>
        </form>
      </FormProvider>
    );
  }
);

TeamJoinForm.displayName = "TeamJoinForm";

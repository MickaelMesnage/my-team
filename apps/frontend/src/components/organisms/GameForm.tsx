import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { forwardRef, useImperativeHandle } from "react";
import { TeamSelect } from "@/components/organisms/team/TeamSelect";

export const GameFormZodSchema = z.object({
  teamId: z.string().min(1, "L'équipe est obligatoire"),
  date: z.string().min(1, "La date est obligatoire"),
  time: z.string().min(1, "L'heure est obligatoire"),
  participate: z.boolean().nullable(),
});

export type GameFormFieldsValue = z.infer<typeof GameFormZodSchema>;

export type GameFormProps = {
  isLoading?: boolean;
  onSubmit: (data: GameFormFieldsValue) => Promise<void>;
  defaultValues?: GameFormFieldsValue;
};

const DEFAULT_VALUES: GameFormFieldsValue = {
  time: "",
  date: "",
  teamId: "",
  participate: false,
};

export const GameForm = forwardRef(
  (
    {
      isLoading = false,
      onSubmit,
      defaultValues = DEFAULT_VALUES,
    }: GameFormProps,
    ref
  ) => {
    const methods = useForm<GameFormFieldsValue>({
      resolver: zodResolver(GameFormZodSchema),
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
              <TeamSelect
                errorMessage={error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                type="date"
                label="Date"
                placeholder="jj/mm/aaaa"
                labelPlacement="outside"
                min={new Date().toISOString().split("T")[0]}
                errorMessage={error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="time"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                type="time"
                label="Heure"
                placeholder="hh:mm"
                labelPlacement="outside"
                errorMessage={error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="participate"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Checkbox checked={value || false} onChange={onChange}>
                  Je compte participer
                </Checkbox>
                {error && <span>{error.message}</span>}
              </>
            )}
          />
          <Button
            isLoading={isLoading}
            disabled={isLoading}
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

GameForm.displayName = "GameForm";

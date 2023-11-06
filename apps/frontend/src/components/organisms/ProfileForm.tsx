import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, FormProvider, set, useForm } from "react-hook-form";
import { z } from "zod";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { convertImageToBase64 } from "@/utils/convertImageToBase64";
import Image from "next/image";

export const profileFormZodSchema = z.object({
  nickname: z.string().min(1, "Le pseudo est obligatoire"),
  avatar: z.string().nullable(),
});

export type ProfileFormFieldsValue = z.infer<typeof profileFormZodSchema>;

const DEFAULT_VALUES: ProfileFormFieldsValue = { nickname: "", avatar: "" };

export type ProfileFormProps = {
  isLoading: boolean;
  onSubmit: (data: ProfileFormFieldsValue) => Promise<void>;
  defaultValues?: ProfileFormFieldsValue;
};
export const ProfileForm = forwardRef(
  ({ onSubmit, defaultValues, isLoading = false }: ProfileFormProps, ref) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const methods = useForm<ProfileFormFieldsValue>({
      resolver: zodResolver(profileFormZodSchema),
      defaultValues: defaultValues || DEFAULT_VALUES,
    });

    const {
      handleSubmit,
      control,
      reset,
      watch,
      setValue,
      formState: { errors },
    } = methods;

    useEffect(() => {
      if (defaultValues?.avatar) {
        setValue("avatar", defaultValues?.avatar);
      }
    }, [setValue, defaultValues?.avatar]);

    const base64Image = watch("avatar");
    const base64ImageError = errors.avatar;

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
            name="nickname"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                type="text"
                label="Pseudo"
                labelPlacement="outside"
                placeholder="Ex: Zizou"
                errorMessage={error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <div>
            <label className="text-small font-medium text-foreground">
              Avatar
            </label>
            <div className="flex gap-4 mt-2">
              {base64Image ? (
                <Image
                  className="rounded-full"
                  alt=""
                  src={base64Image}
                  width="40"
                  height="40"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400" />
              )}
              <input
                className="hidden"
                type="file"
                ref={hiddenFileInput}
                onChange={async (event) => {
                  const file = (event.target as HTMLInputElement).files?.[0];
                  if (file) {
                    try {
                      const base64String = await convertImageToBase64(file);
                      setValue("avatar", base64String);
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              />
              <Button onClick={() => hiddenFileInput.current?.click()}>
                Ajouter un avatar
              </Button>
            </div>
            {base64ImageError?.message && (
              <span>{base64ImageError.message}</span>
            )}
          </div>
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            color="primary"
          >
            Modifier
          </Button>
        </form>
      </FormProvider>
    );
  }
);

ProfileForm.displayName = "ProfileForm";

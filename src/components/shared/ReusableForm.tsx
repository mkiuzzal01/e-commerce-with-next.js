"use client";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
  type Resolver,
} from "react-hook-form";

type FormProps<T extends FieldValues> = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  defaultValues?: UseFormProps<T>["defaultValues"];
  resolver?: Resolver<T>;
};

export default function ReusableForm<T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    resolver,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}

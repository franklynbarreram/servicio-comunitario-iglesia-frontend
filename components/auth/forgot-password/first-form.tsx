import * as React from "react";
import { Button } from "components/common/button";
import { useForm } from "react-hook-form";
import { Icons } from "consts/icons";
import { InputEmail } from "components/common/form/input-email";

type FirstFormProps = {
  isLoading: boolean;
  onHandleSubmit: (data: any) => void;
};

export const FirstForm: React.FC<FirstFormProps> = ({
  onHandleSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,

    formState: { isDirty, isValid, errors },
    watch,
  } = useForm({ mode: "onChange" });
  const rules = {
    email: {
      required: { value: true, message: "Este campo es requerido" },
    },
  };
  const isDisabled = isLoading || !isDirty || !isValid;
  return (
    <form className="w-full" onSubmit={handleSubmit(onHandleSubmit)}>
      <InputEmail
        name="email"
        title="Correo electrónico"
        isFill={!!watch("email")}
        register={register}
        rules={rules.email}
        error={errors.email}
        leftImg={Icons.user}
        className="mb-3 md:mb-5"
      />
      <div className="flex items-center justify-center mt-16 w-full">
        <Button
          labelProps="f-24 font-normal"
          label={isLoading ? "Continuar" : "Continuar"}
          fill
          loading={isLoading}
          boderRadius="rounded-full"
          size="full"
          type="submit"
          disabled={isDisabled}
        />
      </div>
    </form>
  );
};

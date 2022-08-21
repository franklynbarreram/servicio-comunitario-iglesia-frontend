import * as React from "react";
import { Button } from "components/common/button";
import { InputPassword } from "components/common/form/input-password";
import { useForm } from "react-hook-form";
import { Icons } from "consts/icons";

type FirstFormProps = {
  onHandleSubmit: (data: any) => void;
  isLoading: boolean;
};

export const SecondForm: React.FC<FirstFormProps> = ({
  onHandleSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,

    watch,
    formState: { isDirty, isValid, errors },
  } = useForm<{
    newPassword: string;
    confirmPassword: string;
  }>({ mode: "onChange" });

  const rules = React.useMemo(() => {
    return {
      newPassword: {
        required: { value: true, message: "Este campo es requerido" },
        // pattern: {
        //   value:
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$/&*])[A-Za-z\d@$!%*?&]{8,12}$/,
        //   message:
        //     "La contraseña debe tener entre 8 y 12 caracteres, una Mayúscula, una minúscula y un carácter especial (#$/&*)",
        // },
      },
      confirmPassword: {
        required: { value: true, message: "Este campo es requerido" },
        validate: (value: string) =>
          value === watch("newPassword") || `Las contraseñas no coinciden`,
      },
    };
  }, []);
  const isDisabled = isLoading || !isDirty || !isValid;
  return (
    <form
      className="w-full"
      onSubmit={handleSubmit((data) => onHandleSubmit(data))}
    >
      <InputPassword
        name="newPassword"
        title="Nueva contraseña"
        isFill={!!watch("newPassword")}
        validate={false}
        register={register}
        rules={rules.newPassword}
        error={errors.newPassword}
        leftImg={Icons.locked}
      />
      <InputPassword
        name="confirmPassword"
        title="Confirmar contraseña"
        isFill={!!watch("confirmPassword")}
        validate={false}
        register={register}
        rules={rules.confirmPassword}
        error={errors.confirmPassword}
        leftImg={Icons.locked}
      />
      <div className="flex items-center justify-center mt-16 w-full">
        <Button
          labelProps="f-24 font-normal"
          label={isLoading ? "Cambiar contraseña" : "Cambiar contraseña"}
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

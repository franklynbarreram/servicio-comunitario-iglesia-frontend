import { getSession, signIn } from "next-auth/client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "components/common/button/button";
import { AuthService, PersonasServices } from "services";
import { Spinner } from "components/common/spinner/spinner";
import { useToasts } from "react-toast-notifications";
import { GenerateErrorToast } from "lib/helper";
import { get } from "lodash";
import { useRouter } from "next/router";
import { useUser } from "hooks/user";
import { InputPassword } from "components/common/form/input-password";
import { Icons } from "consts";

const EditPassword = ({ hide, refetch }: any) => {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });
  const rules = {
    oldPassword: {
      required: { value: true, message: "Este campo es requerido" },
      // pattern: {
      //   value:
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$/&*])[A-Za-z\d@$!%*?&]{8,12}$/,
      //   message:
      //     "La contraseña debe tener entre 8 y 12 caracteres, una Mayúscula, una minúscula y un carácter especial (#$/&*)",
      // },
    },
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

  const handleSubmitData = (form: any) => {
    setIsLoading(true);
    PersonasServices.changePassword({
      new_password: form?.newPassword,
      password: form?.oldPassword,
    })
      .then((response: any) => {
        addToast("Contraseña actualizada exitosamente", {
          appearance: "success",
        });
        hide();
        refetch();
        console.log("response change password:", response);
        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log("Error actualizar contraseña: ", e);
        GenerateErrorToast(e, addToast);
        setIsLoading(false);
      });
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold">Editar contraseña</h2>
      <div className="container-form mt-5 mb-11 text-left">
        {isLoading ? (
          <Spinner type="loadingPage" className="py-10" />
        ) : (
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className={"relative py-2 w-full mb-3 md:mb-5"}>
              <InputPassword
                name="oldPassword"
                title="Contraseña anterior"
                isFill={!!watch("oldPassword")}
                validate={false}
                register={register}
                rules={rules.oldPassword}
                error={errors.oldPassword}
                leftImg={Icons.locked}
                otherStyles="rounded-full text-sm pt-3 pb-3"
              />
              <InputPassword
                name="newPassword"
                title="Nueva contraseña"
                isFill={!!watch("newPassword")}
                validate={false}
                register={register}
                rules={rules.newPassword}
                error={errors.newPassword}
                leftImg={Icons.locked}
                otherStyles="rounded-full text-sm pt-3 pb-3"
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
                otherStyles="rounded-full text-sm pt-3 pb-3"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-10 px-4 md:px-20">
              <Button
                labelProps="f-18 font-normal"
                label={"Cancelar"}
                // loading={isLoading}
                boderRadius="rounded-full"
                size="full"
                type="button"
                sizesButton="py-3"
                onClick={hide}
                // disabled={!isDirty || !isValid || !!isLoading}
              />
              <Button
                labelProps="f-18 font-normal"
                label={"Guardar"}
                fill
                // loading={isLoading}
                boderRadius="rounded-full"
                size="full"
                type="submit"
                sizesButton="py-3"
                disabled={!isDirty || !isValid || !!isLoading}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPassword;

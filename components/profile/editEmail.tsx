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
import { InputEmail } from "components/common/form/input-email";

const EditEmail = ({ data, hide, refetch }: any) => {
  console.log("pa editar", data);

  const profile = useUser();
  const dataUser = get(profile, "data", []);
  const { addToast } = useToasts();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: { email: data?.user?.email },
  });
  const rules = {
    email: {
      required: { value: true, message: "Este campo es requerido" },
    },
  };

  const handleSubmitData = (form: any) => {
    setIsLoading(true);
    PersonasServices.changeEmail({ email: form?.email })
      .then((response: any) => {
        addToast("Email actualizado exitosamente", {
          appearance: "success",
        });
        addToast(
          "Se ha enviado un correo electronico para la confirmación de su cuenta",
          {
            appearance: "warning",
            autoDismiss: false,
          }
        );
        hide();
        refetch();
        console.log("response change email:", response);
        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log("Error actualizar correo: ", e);
        GenerateErrorToast(e, addToast);
        setIsLoading(false);
      });
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold">Editar email</h2>
      <div className="container-form mt-5 mb-11 text-left">
        {isLoading ? (
          <Spinner type="loadingPage" className="py-10" />
        ) : (
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className={"relative py-2 w-full mb-3 md:mb-5"}>
              <InputEmail
                name="email"
                labelVisible
                title="Correo electrónico"
                isFill={!!watch("email")}
                register={register}
                rules={rules.email}
                error={errors.email}
                className="mb-0"
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

export default EditEmail;

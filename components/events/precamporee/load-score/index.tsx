import * as React from "react";
import { Button } from "components/common/button/button";
import { Spinner } from "components/common/spinner/spinner";
import { useToasts } from "react-toast-notifications";
import { GenerateErrorToast } from "lib/helper";
import { MiembrosServices } from "services/Miembros";
import { CamporeeServices } from "services/Camporee";
import { Input } from "components/common/form/input";
import { useForm } from "react-hook-form";

const LoadScore = ({ data, hide, refetch }: any) => {
  const { addToast } = useToasts();
  const {
    register,
    control,
    handleSubmit,
    setError: setErrorRHF,
    setValue: setValueRHF,
    formState: { isDirty, isValid, errors },
    watch,
  } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      puntuacion: data?.puntuacion,
      nota: data?.observacion,
    },
  });

  const rules = {
    puntuacion: {
      required: { value: true, message: "This is required" },
      min: { value: 1, message: "Debe ser mayor a 0" },
    },
    nota: {
      required: { value: true, message: "This is required" },
    },
  };
  const [isLoading, setIsLoading] = React.useState(false);
  console.log("id de el informe", data?.id);

  const onHandleSubmit = (form: any) => {
    setIsLoading(true);
    const finalData = {
      puntuacion: form.puntuacion,
      observacion: form.nota,
    };
    CamporeeServices.LoadScoreInformePrecamporee(
      {
        id_informe_precamporee: data?.id,
      },
      finalData
    )
      .then((response: any) => {
        addToast("Se ha agregado la puntuación exitosamente", {
          appearance: "success",
        });
        console.log("response agregar puntuacion:", response);
        refetch();
        hide();
        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log("Error: ", e);
        GenerateErrorToast(e, addToast);
        setIsLoading(false);
      });
  };

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-alert-success">Puntuar Informe</h2>

      {isLoading ? (
        <Spinner type="loadingPage" className="py-10" />
      ) : (
        <>
          {isLoading ? (
            <Spinner type="loadingPage" className="py-10" />
          ) : (
            <form
              className="w-full text-left mt-16"
              onSubmit={handleSubmit(onHandleSubmit)}
            >
              <Input
                name="puntuacion"
                title="Puntuación"
                type="number"
                labelVisible
                register={register}
                rules={rules.puntuacion}
                error={errors.puntuacion}
                className="mb-3 md:mb-5"
                otherStyles="pt-3 pb-3 rounded-lg text-sm"
              />

              <Input
                name="nota"
                title="Nota"
                labelVisible
                isTextArea
                register={register}
                rules={rules.nota}
                error={errors.nota}
                className="mb-3 md:mb-5"
                otherStyles="pt-3 pb-3 rounded-lg text-sm"
              />

              <div className="flex flex-col md:flex-row gap-4 mt-10 px-4 md:px-20">
                <Button
                  labelProps="f-18 font-normal"
                  label={"Cancelar"}
                  boderRadius="rounded-full"
                  size="full"
                  type="button"
                  sizesButton="py-3"
                  onClick={hide}
                />
                <Button
                  className="bg-alert-success border-alert-success hover:bg-transparent hover:text-alert-success hover:border-alert-success"
                  labelProps="f-18 font-normal"
                  label={"Aprobar"}
                  fill
                  boderRadius="rounded-full"
                  size="full"
                  type="submit"
                  sizesButton="py-3"
                />
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default LoadScore;

import * as React from "react";
import { Button } from "components/common/button/button";
import { Spinner } from "components/common/spinner/spinner";
import { useToasts } from "react-toast-notifications";
import { GenerateErrorToast } from "lib/helper";
import { InformesMensualesService } from "services/InformesMensuales";

type DeleteActividadProps = {
	id_actividad: number;
	name_actividad: string;
	hide: () => void;
	refetch: any;
}

const DeleteActividad = ({ id_actividad, name_actividad, hide, refetch }: DeleteActividadProps) => {
  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = React.useState(false);

  const onDelete = () => {
    setIsLoading(true);
    InformesMensualesService.deleteActivity(id_actividad)
      .then((response: any) => {
        addToast("Actividad eliminada", {
          appearance: "success",
        });
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
      <h2 className="text-lg font-bold text-alert-error">Eliminar Actividad</h2>

      {isLoading ? (
        <Spinner type="loadingPage" className="py-10" />
      ) : (
        <>
          <div className="mt-5 text-left">
            <h5 className="text-center text-base">
              ¿Está seguro de eliminar la actividad <strong>{name_actividad}</strong>?
            </h5>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-5 px-2 md:px-5">
            <Button
              labelProps="f-18 font-normal"
              label={"Cancelar"}
              boderRadius="rounded-full"
              size="full"
              type="button"
              sizesButton="py-2"
              onClick={hide}
            />
            <Button
              className="bg-alert-error border-alert-error hover:bg-transparent hover:text-alert-error hover:border-alert-error"
              labelProps="f-18 font-normal"
              label={"Eliminar"}
              fill
              boderRadius="rounded-full"
              size="full"
              type="submit"
              sizesButton="py-2"
              onClick={onDelete}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteActividad;
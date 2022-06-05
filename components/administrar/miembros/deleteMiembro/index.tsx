import * as React from "react";
import { Button } from "components/common/button/button";
import { Spinner } from "components/common/spinner/spinner";
import { useToasts } from "react-toast-notifications";
import { GenerateErrorToast } from "lib/helper";
import { MiembrosServices } from "services/Miembros";

const DeleteMiembro = ({ data, hide, refetch }: any) => {
  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = React.useState(false);
  console.log("a eliminar", data);

  const onDelete = () => {
    setIsLoading(true);
    MiembrosServices.delete({ id_persona: data?.cedula })
      .then((response: any) => {
        addToast("Se ha dado de baja al miembro exitosamente", {
          appearance: "success",
        });
        console.log("response dar de baja miembro:", response);
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
      <h2 className="text-4xl font-bold text-alert-error">Dar de baja</h2>

      {isLoading ? (
        <Spinner type="loadingPage" className="py-10" />
      ) : (
        <>
          <div className="mt-10 text-left">
            <h5 className="text-center text-xl">
              Está seguro de dar de baja a {data?.nombre}?
            </h5>
          </div>

          <div className="flex gap-4 mt-10 px-20">
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
              className="bg-alert-error border-alert-error hover:bg-transparent hover:text-alert-error hover:border-alert-error"
              labelProps="f-18 font-normal"
              label={"Dar de baja"}
              fill
              boderRadius="rounded-full"
              size="full"
              type="submit"
              sizesButton="py-3"
              onClick={onDelete}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteMiembro;

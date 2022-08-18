import * as React from "react";
import { Button } from "components/common/button/button";
import { Spinner } from "components/common/spinner/spinner";
import { useToasts } from "react-toast-notifications";
import { GenerateErrorToast } from "lib/helper";
import { MiembrosServices } from "services/Miembros";
import { CamporeeServices } from "services/Camporee";
import { InformesMensualesService } from "services/InformesMensuales";

const ApproveInforme = ({ id_informe, hide, refetch }: any) => {
  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = React.useState(false);
  console.log("a aprobar", id_informe);

  const onApprove = () => {
    setIsLoading(true);
    InformesMensualesService.aprobarInforme({
      id_informe: id_informe,
    })
      .then((response: any) => {
        addToast("Se ha aprobado el informe exitosamente", {
          appearance: "success",
        });
        console.log("response aprobar informe:", response);
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
      <h2 className="text-4xl font-bold text-alert-success">Aprobar Informe</h2>

      {isLoading ? (
        <Spinner type="loadingPage" className="py-10" />
      ) : (
        <>
          <div className="mt-10 text-left">
            <h5 className="text-center text-xl">
              Está seguro de dar de aprobar este informe?
            </h5>
          </div>

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
              onClick={onApprove}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ApproveInforme;

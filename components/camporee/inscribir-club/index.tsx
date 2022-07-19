import * as React from "react";
import { Button } from "components/common/button/button";
import { Spinner } from "components/common/spinner/spinner";
import { useToasts } from "react-toast-notifications";
import { GenerateErrorToast } from "lib/helper";
import { MiembrosServices } from "services/Miembros";
import { ClubesServices } from "services/Clubes";
import { CamporeeServices } from "services/Camporee";

const InscribirClub = ({ data, hide, refetch }: any) => {
  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = React.useState(false);

  const onDelete = () => {
    setIsLoading(true);
    CamporeeServices.inscribirClubToCamporee(data?.id)
      .then((response: any) => {
        addToast("Se ha dado inscrito el club exitosamente", {
          appearance: "success",
        });
        console.log("response de inscribir club:", response);
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
      <h2 className="text-4xl font-bold text-alert-success">Inscribir</h2>

      {isLoading ? (
        <Spinner type="loadingPage" className="py-10" />
      ) : (
        <>
          <div className="mt-10 text-left">
            <h5 className="text-center text-xl">Está seguro de inscribirse?</h5>
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
              label={"Inscribir"}
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

export default InscribirClub;

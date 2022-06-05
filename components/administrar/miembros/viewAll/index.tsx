import * as React from "react";
import { Typography } from "components/common/typography";
import clsx from "clsx";
import { ValidateString } from "lib/helper";
import { IconWithText } from "components/icon-with-text";

const ViewAllDataMiembros = ({ data, hide, refetch }: any) => {
  console.log("detalle all miembros", data);
  const {
    primer_anciano,
    distrito,
    nro_conquistadores,
    nro_gm,
    nombre,
    foto_primer_anciano,
  } = data;
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold">Detalle de Iglesia</h2>
      <div className="item flex flex-col gap-2 text-center justify-center mt-8">
        <Typography
          type="label"
          className={clsx(
            "ml-3 font-bold mb-2 block text-yellow text-xl capitalize"
          )}
        >
          {nombre}
        </Typography>
      </div>
      <div className="container-form mt-8 gap-6 grid grid-cols-3 text-left">
        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Nombre
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18 capitalize")}
          >
            {ValidateString(nombre)}
          </Typography>
        </div>
        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Distrito
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18 capitalize")}
          >
            {ValidateString(distrito)}
          </Typography>
        </div>
        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Nro. Conquis
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18")}
          >
            {nro_conquistadores}
          </Typography>
        </div>
        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Nro. GM
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18")}
          >
            {nro_gm}
          </Typography>
        </div>
      </div>

      <div className="item mx-auto text-center justify-center mt-8">
        <Typography
          type="title"
          className={clsx("ml-3 font-bold mb-2 block f-24")}
        >
          Anciano
        </Typography>
        <Typography
          type="label"
          className={clsx("ml-3 font-normal mb-2 block f-20")}
        >
          <IconWithText
            classNameContainer="justify-center"
            icon={foto_primer_anciano}
            text={primer_anciano}
            isUser
          />
        </Typography>
      </div>
    </div>
  );
};

export default ViewAllDataMiembros;

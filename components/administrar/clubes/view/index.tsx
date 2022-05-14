import * as React from "react";
import { Typography } from "components/common/typography";
import clsx from "clsx";
import { ValidateImage, ValidateString } from "lib/helper";
import { IconWithText } from "components/icon-with-text";

const ViewClub = ({ data, hide, refetch }: any) => {
  console.log("detalle", data);
  const {
    nombre,
    director,
    direccion,
    foto_director,
    iglesia,
    lema,
    logo,
    tipo,
    nro_conquistadores,
    nro_gm,
  } = data;
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold">Detalle de Club</h2>
      <div className="item flex flex-col gap-2 text-center justify-center mt-8">
        <img
          src={ValidateImage(logo)}
          alt=""
          className="w-28 h-28 mx-auto object-cover object-center rounded-full"
        />
        <Typography
          type="label"
          className={clsx("ml-3 font-bold mb-2 block text-yellow text-xl")}
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
            Tipo
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18 capitalize")}
          >
            {ValidateString(tipo)}
          </Typography>
        </div>
        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Dirección
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18 capitalize")}
          >
            {ValidateString(direccion)}
          </Typography>
        </div>
        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Iglesia
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18 capitalize")}
          >
            {ValidateString(iglesia)}
          </Typography>
        </div>
        <div className="item col-span-1">
          <Typography
            type="label"
            className={clsx("ml-3 font-bold mb-2 block f-18")}
          >
            Lema
          </Typography>
          <Typography
            type="span"
            className={clsx("ml-3 font-normal mb-2 block f-18 capitalize")}
          >
            {ValidateString(lema)}
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
          Director
        </Typography>
        <Typography
          type="label"
          className={clsx("ml-3 font-normal mb-2 block f-20")}
        >
          <IconWithText
            classNameContainer="justify-center"
            icon={foto_director}
            text={director}
            isUser
          />
        </Typography>
      </div>
    </div>
  );
};

export default ViewClub;

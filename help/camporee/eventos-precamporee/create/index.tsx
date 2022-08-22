import { RoleEnums } from "consts/rolesEnum";
import { useUser } from "hooks/user";
import { isRole } from "lib/helper";
import { get } from "lodash";
import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpCreateEventoPrecamporee: React.FC<HelpProps> = ({ hide }) => {
  const profile = useUser();
  const dataUser = get(profile, "data", []);
  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ayuda</h2>
      </div>
      <div className="text-left">
        <p>
          Hay 2 tipos de eventos precamporee: únicos y mensuales.
          <br />
          <br />
          Los <strong>eventos únicos</strong> se realizan solo una vez y deben
          realizarse e informarse en el rango de fechas especificado, la fecha
          de inicio debe ser posterior a la actual.
          <br />
          <br />
          Los <strong>eventos mensuales</strong> se realizan cada mes desde el
          mes de la fecha de inicio hasta el mes de la fecha final. El evento
          debe realizarse en el mes correspondiente y puede ser informado hasta
          el 15 del mes siguiente. La fecha de inicio de este tipo de eventos
          debe pertenecer al mes siguiente del actual.
          <br />
          <br />
          El puntaje máximo en los eventos mensuales se refiere a la máxima
          calificación que podrá obtener el informe de cada mes.
          <br />
          <br />
        </p>
      </div>
    </>
  );
};

import { RoleEnums } from "consts/rolesEnum";
import { useUser } from "hooks/user";
import { isRole } from "lib/helper";
import { get } from "lodash";
import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpCreateCamporee: React.FC<HelpProps> = ({ hide }) => {
  const profile = useUser();
  const dataUser = get(profile, "data", []);
  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ayuda</h2>
      </div>
      <div className="text-left">
        <p>
          Puedes crear 4 tipos de camporee: conquistadores, guías mayores,
          integrado y aventureros. Para crear un camporee no debe haber un
          camporee del mismo tipo planificado o en ejecución.
          <br />
          <br />
          La<strong> fecha de inicio</strong> del camporee naturalmente debe ser
          posterior a la fecha actual. La{" "}
          <strong>fecha de inicio de informes</strong> marca el punto a partir
          del cual los informes mensuales serán evaluados, esta fecha debe ser
          posterior a la actual y anterior a la fecha de inicio del camporee.
          <br />
          <br />
          La <strong>puntuación máxima de informe</strong> se refiere a la
          máxima calificación que se puede obtener en un informe mensual.
          <br />
          <br />
          Los <strong>niveles</strong> son para clasificar a los clubes de
          acuerdo a la puntuación porcentual obtenida en el camporee. El nivel 1
          es el límite inferior del nivel más alto, le sigue el nivel 2, 3 y 4.
          Los niveles deben estar entre el rango 1-100. Ejemplo:
          <br />
          <br />
          <ul className="space-y-1 ml-5 max-w-md list-disc list-inside text-[black] ">
            <li>Nivel 1: 90</li>
            <li>Nivel 2: 75</li>
            <li>Nivel 3: 60</li>
            <li> Nivel 4: 30</li>
          </ul>
          <br />
          Si el <strong> capellán</strong> del camporee está registrado en el
          sistema elige "capellán interno", en caso contrario elige "capellán
          externo".
        </p>
      </div>
    </>
  );
};

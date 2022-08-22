import { RoleEnums } from "consts/rolesEnum";
import { useUser } from "hooks/user";
import { isRole } from "lib/helper";
import { get } from "lodash";
import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpCreateEventoCamporee: React.FC<HelpProps> = ({ hide }) => {
  const profile = useUser();
  const dataUser = get(profile, "data", []);
  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ayuda</h2>
      </div>
      <div className="text-left">
        <p>
          Hay 2 tipos de eventos: eventos por federación y eventos por clubes.
          Intuitivamente el tipo de evento restringe el tipo de sus
          participantes.
          <br />
          <br />
          Los eventos de clubes pueden ser de{" "}
          <strong>participación total</strong>, en caso de serlo todos los
          miembros del club deben participar en el evento. El campo de
          <strong>distinción sexo</strong> indica las restricciones de sexo de
          los participantes del evento:
          <br />
          <br />
          <ul className="space-y-1 ml-5 max-w-md list-disc list-inside text-[black] ">
            <li>
              <strong>Hombres</strong>: el evento es solo para hombres.
            </li>
            <li>
              <strong>Mujeres</strong>: el evento es solo para mujeres.
            </li>
            <li>
              <strong>Ambos</strong>: el evento es para hombres y mujeres y
              necesita una cantidad específica de participantes de cada sexo.
            </li>
            <li>
              <strong>Sin distinción</strong>: el evento es para ambos sexos y
              no limita la cantidad de participantes por sexo.
            </li>
          </ul>
          <br />
          Los campos de <strong>oro</strong>, <strong>plata</strong>,{" "}
          <strong>bronce</strong> y hierro definirán la puntuación mínima que se
          necesita para alcanzar dicho nivel en la calificación del evento.
        </p>
      </div>
    </>
  );
};

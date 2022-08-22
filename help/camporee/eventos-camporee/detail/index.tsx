import { RoleEnums } from "consts/rolesEnum";
import { useUser } from "hooks/user";
import { isRole } from "lib/helper";
import { get } from "lodash";
import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpListEventCamporeeDetail: React.FC<HelpProps> = ({ hide }) => {
  const profile = useUser();
  const dataUser = get(profile, "data", []);
  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ayuda</h2>
      </div>
      <div className="text-left">
        <p>
          {isRole(dataUser, [
            RoleEnums.DIRECTOR,
            RoleEnums.SECRETARIO_CLUB,
          ]) && (
            <span>
              El plazo de inscripción en los eventos camporee inicia 90 días
              antes del camporee y termina 45 días antes del camporee, esto con
              el fin de que los consejos regionales y la asociación puedan
              cuadrar bien la logística de evaluación de los eventos camporee.
              <br />
              <br />
              Al momento de inscribir el evento, si no es un evento de
              participación general debes indicar los participantes de cada
              categoría admitida de manera que concuerde con las cantidades
              requeridas para el evento.
              <br />
              <br />
              En caso de no poseer la cantidad de participantes suficientes en
              una categoría se pueden sustituir:
              <br />
              <br />
              <ul className="space-y-1 ml-5 max-w-md list-disc list-inside text-[black] ">
                <li>hombres por mujeres.</li>
                <li>
                  guías mayores por conquistadores (En camporees integrados)
                </li>
              </ul>
              <br />
              No se pueden sustituir:
              <br />
              <br />
              <ul className="space-y-1 ml-5 max-w-md list-disc list-inside text-[black] ">
                <li>mujeres por hombres.</li>
                <li>conquistadores por guías mayores.</li>
              </ul>
              <br />
              Por ejemplo: en un camporee integrado no se puede sustituir una
              guía mayor por un conquistador ya que eso viola la primera
              condición.
            </span>
          )}
          {isRole(dataUser, [
            RoleEnums.LIDER_JUVENIL,
            RoleEnums.PRESIDENTE_CONSEJO,
            RoleEnums.PASTOR,
            RoleEnums.ANCIANO,
          ]) && (
            <span>
              Aquí puedes ver la lista de clubes inscritos en el evento y los
              datos de sus participantes. Un punto rojo en un club indica que
              los participantes de ese club no cumplen exactamente con las
              categorías requeridas por el evento.
            </span>
          )}
        </p>
      </div>
    </>
  );
};

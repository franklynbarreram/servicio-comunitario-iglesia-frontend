import { RoleEnums } from "consts/rolesEnum";
import { useUser } from "hooks/user";
import { isRole } from "lib/helper";
import { get } from "lodash";
import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpFormInformeEventoPrecamporee: React.FC<HelpProps> = ({
  hide,
}) => {
  const profile = useUser();
  const dataUser = get(profile, "data", []);
  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ayuda</h2>
      </div>
      <div className="text-left">
        <p>
          Si el evento precamporee es <strong>mensual</strong> primero debes
          seleccionar la pestaña del mes que quieres informar y luego llenar el
          formulario. En caso contrario solo debes llenar el formulario.
          <br />
          <br />
          El informe requiere <strong>3 fotos</strong> de la actividad
          precamporee a informar.
          <br />
          <br />
          La <strong>fecha de realizado</strong> se refiere a la fecha en que se
          realizó el evento precamporee, la cual debe estar en el rango de
          fechas del evento precamporee único o en el mes correspondiente del
          evento precamporee mensual. Se permiten fechas de realización del
          evento precamporee retrasadas, pero esto conlleva a una penalización
          en la puntuación del informe.
          <br />
          <br />
          Puedes editar el informe hasta que reciba la primera firma.
          <br />
          <br />
          Se pueden llenar informes con máximo 1 mes de retraso a partir de la
          fecha límite de envío del informe. En el caso de eventos precamporee
          mensuales la fecha límite de envío del informe es el 15 del mes
          siguiente; en los eventos precamporee únicos la fecha límite es la
          fecha final del evento. Los informes retrasados tendrán menos
          puntuación.
        </p>
      </div>
    </>
  );
};

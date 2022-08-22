import { RoleEnums } from "consts/rolesEnum";
import { useUser } from "hooks/user";
import { isRole } from "lib/helper";
import { get } from "lodash";
import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpFormInformesMensuales: React.FC<HelpProps> = ({ hide }) => {
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
            <>
              <span>
                {" "}
                Este módulo te permite ver, llenar o editar el informe del mes
                seleccionado (por defecto el mes actual).
                <br />
                <br />
                El primer paso para empezar a llenar un informe mensual es
                registrar una <strong>actividad</strong>.
                <br />
                <br />
                Las actividades pueden ser de <strong>tipo</strong>: recreativa,
                educativa, espiritual, misionera y regular.
                <br />
                <br />
                Las actividades deben haberse realizado en el mes del informe.
                <br />
                <br />
                Se requiere una foto por actividad.
                <br />
                <br />
                Las actividades creadas y el formulario del informe se pueden
                editar hasta que el informe reciba la primera firma o hasta que
                se acabe el plazo para informar.
                <br />
                <br />
              </span>
            </>
          )}
          {isRole(dataUser, [
            RoleEnums.LIDER_JUVENIL,
            RoleEnums.PRESIDENTE_CONSEJO,
            RoleEnums.PASTOR,
            RoleEnums.ANCIANO,
          ]) && (
            <>
              <span>
                Este módulo te permite revisar los informes mensuales del mes
                seleccionado que han enviado los clubes de tu zona.
                <br />
                <br />
                El plazo para firmar el informe es hasta 1 mes después de la
                fecha límite para enviar el informe o hasta que el informe sea
                calificado. Una vez firmado el informe no se puede retractar.
                <br />
                <br />
                Para poder calificar un informe esté debe tener mínimo 2 firmas
                de las 3 posibles. El plazo para calificar o editar la
                calificación de un informe es hasta el día antes de iniciar del
                camporee. Al momento de calificar se ingresa una puntuación y se
                puede registrar una observación donde se expliquen los motivos
                de la puntuación.
              </span>
            </>
          )}
        </p>
      </div>
    </>
  );
};

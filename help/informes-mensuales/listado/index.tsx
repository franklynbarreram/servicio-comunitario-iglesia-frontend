import { RoleEnums } from "consts/rolesEnum";
import { useUser } from "hooks/user";
import { isRole } from "lib/helper";
import { get } from "lodash";
import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpListInformesMensuales: React.FC<HelpProps> = ({ hide }) => {
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
                Aquí puedes ver los informes mensuales que has enviado y puedes
                enviar los informes que tienes pendientes.
              </span>

              <br />
              <br />
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
                Aquí puedes revisar los informes mensuales que han enviado los
                clubes de tu zona.
              </span>
            </>
          )}
        </p>
      </div>
    </>
  );
};

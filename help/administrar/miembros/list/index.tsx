import { RoleEnums } from "consts/rolesEnum";
import { useUser } from "hooks/user";
import { isRole } from "lib/helper";
import { get } from "lodash";
import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpListMiembros: React.FC<HelpProps> = ({ hide }) => {
  const profile = useUser();
  const dataUser = get(profile, "data", []);
  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ayuda</h2>
      </div>
      <div className="text-center">
        <p>
          {isRole(dataUser, [
            RoleEnums.LIDER_JUVENIL,
            RoleEnums.PRESIDENTE_CONSEJO,
            RoleEnums.PASTOR,
            RoleEnums.ANCIANO,
          ]) && (
            <span>
              Aquí está la lista de miembros de clubes que están registrados con
              algunos datos. Los miembros están organizados por clubes.
            </span>
          )}
          {isRole(dataUser, [
            RoleEnums.DIRECTOR,
            RoleEnums.SECRETARIO_CLUB,
          ]) && (
            <span>
              Aquí está la lista de miembros registrados en tu club, además
              puedes agregar, cambiar rol y dar de baja a los miembros.
            </span>
          )}
        </p>
      </div>
    </>
  );
};

import { RoleEnums } from "consts/rolesEnum";
import { useUser } from "hooks/user";
import { isRole } from "lib/helper";
import { get } from "lodash";
import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpListClubes: React.FC<HelpProps> = ({ hide }) => {
  const profile = useUser();
  const dataUser = get(profile, "data", []);
  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ayuda</h2>
      </div>
      <div className="text-center">
        <p>
          Aquí está la lista de clubes que están registrados con algunos datos.
          Puedes filtrar los clubes por federación.
          {isRole(dataUser, [
            RoleEnums.DIRECTOR,
            RoleEnums.SECRETARIO_CLUB,
          ]) && <span> Puedes editar los datos de tu club.</span>}
        </p>
      </div>
    </>
  );
};

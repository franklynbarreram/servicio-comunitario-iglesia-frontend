import { RoleEnums } from "consts/rolesEnum";
import { useUser } from "hooks/user";
import { isRole } from "lib/helper";
import { get } from "lodash";
import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpResultadosCamporee: React.FC<HelpProps> = ({ hide }) => {
  const profile = useUser();
  const dataUser = get(profile, "data", []);
  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ayuda</h2>
      </div>
      <div className="text-left">
        <p>
          En esta sección puedes ver la lista de clubes inscritos en el camporee
          con sus puntuaciones porcentuales y su nivel en la clasificación.
          <br />
          <br />
          En esta sección puedes ver la lista de clubes inscritos en el camporee
          con sus puntuaciones porcentuales y su nivel en la clasificación.
          <br />
          <br />
          <ul className="space-y-1 ml-5 max-w-md list-disc list-inside text-[black] ">
            <li>Nivel 1: 5 estrellas</li>
            <li>Nivel 2: 4 estrellas</li>
            <li>Nivel 3: 3 estrellas</li>
            <li> Nivel 4: 2 estrellas</li>
            <li> Nivel 5: 1 estrellas</li>
          </ul>
          <br />
          Las puntuaciones y el nivel se pueden ver una vez finalice el
          camporee.
          <br />
          <br />
          Este módulo tiene 5 filtros:
          <br />
          <br />
          <ul className="space-y-1 ml-5 max-w-md list-disc list-inside text-[black] ">
            <li>
              <strong>Categoría:</strong>
              hay 9 categorías: Total, Camporee, Precamporee, Eventos
              Deportivos, Eventos Bíblicos, Eventos de Pionerismo, Eventos
              Especiales, Eventos Precamporee, Informes Mensuales. Al
              seleccionar una categoría se mostrarán las puntuaciones y niveles
              solo de esa categoría y sus subcategorías. Las categorías están
              agrupadas de la siguiente manera:
            </li>
            <li>
              <strong>Evento Camporee:</strong> lista de eventos camporee. Al
              seleccionar uno se muestra la puntuación y nivel de ese evento.
              Cuando se usa este filtro se ignora el de Categoría y Evento
              Precamporee.
            </li>
            <li>
              <strong>Evento Precamporee:</strong> lista de eventos precamporee.
              Al seleccionar uno se muestra la puntuación y nivel de ese evento.
              Cuando se usa este filtro se ignora el de Categoría.
            </li>
            <li>
              {" "}
              <strong>Consejo Regional:</strong> lista de Consejos Regionales.
              Al seleccionar uno solo se muestran los clubes de dicho consejo
              regional.
            </li>
            <li>
              <strong>Club:</strong> lista de clubes. Al seleccionar uno solo se
              muestran los datos de dicho club. Cuando se usa este filtro se
              ignora el de Consejo Regional.
            </li>
          </ul>
          <br />
          El líder juvenil puede ver la puntuación neta de los clubes, y cada
          director puede ver la puntuación neta de su club. En ambos casos la
          puntuación se puede ver desde la creación del camporee. El director
          debe usar el filtro <strong>Club</strong> para ver la puntuación neta
          de su club.
        </p>
      </div>
    </>
  );
};

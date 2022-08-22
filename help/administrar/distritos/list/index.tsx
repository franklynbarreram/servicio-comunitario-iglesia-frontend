import React from "react";

export interface HelpProps {
  hide: any;
}

export const HelpListDistritos: React.FC<HelpProps> = ({ hide }) => {
  return (
    <>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ayuda</h2>
      </div>
      <div className="text-center">
        <p>
          Aquí está la lista de distritos que están registradas con algunos
          datos. Puedes filtrar los distritos por federación.
        </p>
      </div>
    </>
  );
};

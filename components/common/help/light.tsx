import { Icons } from "consts";
import React from "react";

export const LightHelp = ({ showModal }: any) => {
  return (
      <img
        onClick={showModal}
        className="w-5 cursor-pointer"
        src={Icons.iconHelp}
        alt="help"
      />
  );
};

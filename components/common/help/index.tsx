import { Icons } from "consts";
import React from "react";

export const Help = ({ showModal }: any) => {
  return (
    <div className="flex justify-end mb-6 items-center w-full">
      <img
        onClick={showModal}
        className="w-5 cursor-pointer"
        src={Icons.iconHelp}
        alt="help"
      />
    </div>
  );
};

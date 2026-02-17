import { Icons } from "consts";
import React from "react";
import { LightHelp } from "./light";

export const Help = ({ showModal }: any) => {
  return (
    <div className="flex justify-end mb-6 items-center w-full">
      <LightHelp
        showModal={showModal}
      />
    </div>
  );
};

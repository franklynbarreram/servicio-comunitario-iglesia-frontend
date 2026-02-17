import { Icons } from "consts";
import React from "react";

export const DownloadFile = ({ download }: any) => {
  return (
      <img
        onClick={download}
        className="w-5 cursor-pointer mx-2"
        src={Icons.arrowDownTray}
        alt="download file"
      />
  );
};

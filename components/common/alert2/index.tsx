import * as React from "react";
import SVG from "react-inlinesvg";
import clsx from "clsx";
import { Icon } from "components/icon";
import { Icons } from "consts";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export interface AlertProps {
  title: string;
  children: React.ReactNode;
  type: "success" | "error" | "info";
}

/**
 * Use to notificate the user something happened
 */
export const Alert: React.FC<AlertProps> = ({ title, children, type }) => {
  return (
    <div
      className={clsx(
        "rounded-md p-4 w-full",
        { "bg-red-50": type === "error" },
        { "bg-green-50": type === "success" },
        { "bg-blue-50": type === "info" }
      )}
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-center">
          <ExclamationCircleIcon
            className={clsx(
              "w-10",
              { " text-red-400": type === "error" },
              { " text-green-400": type === "success" },
              { " text-blue-400": type === "info" }
            )}
            aria-hidden="true"
          />
        </div>
        <div className="flex justify-center">
          <h3
            className={clsx(
              "text-lg mt-1 font-bold",
              {
                "text-red-800": type === "error",
              },
              {
                "text-green-800": type === "success",
              },
              {
                "text-blue-800": type === "info",
              }
            )}
          >
            {title}
          </h3>
        </div>
      </div>
      <div
        className={clsx(
          "mt-2 text-sm",
          { " text-red-700": type === "error" },
          { " text-green-700": type === "success" },
          { " text-blue-700": type === "info" }
        )}
      >
        {children}
      </div>
    </div>
  );
};

import clsx from "clsx";
import { ValidateImage } from "lib/helper";
import * as React from "react";

interface ItemIconoProps {
  icon: string;
  title: string;
  className?: string;
}

const ItemIcon = ({ icon, title, className }: ItemIconoProps) => {
  return (
    <div className={clsx("container", className)}>
      <div
        className={clsx("flex flex-row gap-x-2 items-center", className)}
        key={title}
      >
        {icon && (
          <img className="w-5" src={ValidateImage(icon)} title={title} />
        )}
        <p className="text-black text-sm">{title}</p>
      </div>
    </div>
  );
};
export default ItemIcon;

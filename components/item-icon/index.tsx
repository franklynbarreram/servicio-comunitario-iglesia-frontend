import clsx from "clsx";
import { ValidateImage } from "lib/helper";
import * as React from "react";

interface ItemIconoProps {
  icon: string;
  content: string;
  className?: string;
}

const ItemIcon = ({ icon, className, content }: ItemIconoProps) => {
  return (
    <div className={clsx("container", className)}>
      <div className={clsx("flex flex-row gap-x-2 items-center", className)}>
        {icon && <img className="w-5" src={ValidateImage(icon)} />}
        <p className="text-black text-sm"> {content}</p>
      </div>
    </div>
  );
};
export default ItemIcon;

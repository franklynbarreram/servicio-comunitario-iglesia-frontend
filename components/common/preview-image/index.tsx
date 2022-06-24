import clsx from "clsx";
import * as React from "react";

interface PreviewImageProps {
  src: string;
  className?: string;
}

const PreviewImage = ({ src, className }: PreviewImageProps) => {
  return (
    <div
      className={clsx(
        "pt-6 pb-4 px-4 flex items-center justify-center",
        className
      )}
    >
      <img src={src} alt="image preview" />
    </div>
  );
};
export default PreviewImage;

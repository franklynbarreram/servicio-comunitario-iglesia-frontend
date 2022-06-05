import { Icons, Images } from "consts";
import { isNil, isEmpty } from "lodash";

export const ValidateImageUser = (img: any) => {
  if (img === "" || img === " " || !img) return Icons.noImgUser;

  return img;
};

export const ValidateImage = (img: any, isUser = false) => {
  const image = isUser ? Icons.noImgUser : Images.noImg;

  if (
    img === "" ||
    img === " " ||
    !img ||
    isNil(img) ||
    img.toLowerCase() === "string"
  )
    return image;

  return img;
};

export const ValidateString = (name: any) => {
  console.log("llee", name);
  if (name === "" || name === " " || !name || isNil(name)) return "N/A";

  return name;
};

export const GenerateErrorHtml = (errors: any) => {
  let errorHtml: any;
  if (Object.keys(errors).length > 0) {
    errorHtml = (
      <ul className="m-0" key={Math.floor(Math.random() * 1000)}>
        {Object.keys(errors).map((item, posicion) => {
          return (
            <li key={posicion}>
              {item} : {errors}
            </li>
          );
        })}
      </ul>
    );
    console.log(errors.propertiesErrors);
  } else {
    errorHtml = (
      <ul className="m-0">
        <li>
          {"Error: "} {errors.message}
        </li>
      </ul>
    );
  }

  return errorHtml;
};

export const GenerateErrorToast = (error: any, addToast: any) => {
  if (error?.errors && Object.keys(error.errors).length > 0) {
    {
      error = error.errors;
      Object.keys(error).map((item) => {
        console.log(error[item]);
        return addToast(`${item} : ${error[item]}`, {
          appearance: "error",
        });
      });
    }
    // console.log(errors.propertiesErrors);
  } else {
    addToast(`${"Error: "} ${error.message}`, {
      appearance: "error",
    });
  }
};

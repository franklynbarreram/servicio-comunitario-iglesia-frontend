import * as React from "react";
import clsx from "clsx";
import styles from "./input-check.module.scss";
import { Typography } from "../../typography";
import { Icon } from "components/icon";
import { Icons } from "consts/icons";
import { InputProps } from "interfaces/common";
import { Input } from "../input/input";

export const InputCheck: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  name,
  register,
  rules,
  error,
  children,
  className,
  onChangeCustom,
  defaultChecked,
  ...props
}) => {
  const registerAux = register(name, rules);

  return (
    <div className={clsx(className, "flex justify-start w-full items-center")}>
      <div className={clsx(styles.content, "flex items-start justify-start")}>
        {/* <input
          className={clsx(styles.checkbox)}
          type="checkbox"
          id={name}
          name={name}
          ref={register && register(name, rules).ref}
          {...props}
        /> */}
        <input
          id={name}
          type="checkbox"
          name={name}
          autoComplete="off"
          className={clsx(styles.checkbox)}
          defaultChecked={defaultChecked}
          ref={registerAux && registerAux.ref}
          onChange={(e) => {
            registerAux && registerAux.onChange(e); // method from hook form register
            onChangeCustom && onChangeCustom(e); // your method
          }}
          {...props}
        />
        <label htmlFor={name}>{name}</label>
      </div>

      <Typography type="span" className={"ml-2"}>
        <label
          htmlFor={name}
          className={clsx(
            { "cursor-not-allowed": props.disabled },
            { "cursor-pointer": !props.disabled }
          )}
        >
          {children}
        </label>
      </Typography>
      {error && error.message && (
        <span className="flex ml-5 mt-3 text-alert-error font-montserrat">
          <Icon
            src={Icons.exclamation}
            fillPath
            className="mr-5 text-alert-error"
          />{" "}
          <Typography type="label">{error.message}</Typography>
        </span>
      )}
    </div>
  );
};

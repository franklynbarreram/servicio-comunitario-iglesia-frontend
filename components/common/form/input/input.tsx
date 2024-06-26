import * as React from "react";
import clsx from "clsx";
import styles from "./input.module.scss";
import { Typography } from "../../typography";
import { Icon } from "components/icon";
import { Icons } from "consts/icons";
import { InputProps } from "interfaces/common";

export const Input: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement> & any
> = ({
  name,
  title,
  isFill,
  register,
  rules,
  rightImg,
  leftImg,
  rightClick,
  leftClick,
  customPlaceholder,
  onChangeCustom,
  error,
  otherStyles,
  InputSelect,
  labelVisible,
  verifyValue,
  handleVerification,
  className,
  primary,
  isTextArea,
  isArray,
  arrayIndex,
  ...props
}) => {
  const [showLabel, setShowLabel] = React.useState(false);
  const registerAux = register(name, rules);
  return (
    <div className={clsx("relative flex flex-col py-2 w-full", className)}>
      <div className={clsx(styles.input)}>
        <div className="flex flex-1">
          {labelVisible && (
            <div className="flex-auto">
              <Typography
                type="label"
                className={clsx(
                  { "text-alert-error": error || verifyValue === false },
                  { "text-primary": isFill },
                  { "text-primary": primary && !error },
									{ "is-required": rules?.required},
                  "ml-3 font-normal mb-2 block f-18"
                )}
              >
                {(showLabel || labelVisible) && title}
              </Typography>
            </div>
          )}

          {verifyValue === false && (
            <div className="flex-1 text-right">
              <Typography
                type="label"
                className={clsx(
                  "ml-3 font-bold mb-2 block f-18 text-gray-500 cursor-pointer"
                )}
                onClick={handleVerification}
              >
                <p>Verificar</p>
              </Typography>
            </div>
          )}
        </div>
        <div className="relative container-input">
          {!isTextArea ? (
            <input
              onKeyUp={(e) => {
                if (props.type === "tel") {
                  e.currentTarget.value === ""
                    ? setShowLabel(false)
                    : setShowLabel(true);
                }
              }}
              id={name}
              name={name}
              placeholder={customPlaceholder || title}
              autoComplete="off"
              className={clsx(
                {
                  "border-alert-error focus:border-alert-error placeholder-alert-error focus:ring-transparent":
                    (error && (error.message || error[arrayIndex]?.message)) ||
                    verifyValue === false,
                },
                {
                  "text-alert-error":
                    error && (error.message || error[arrayIndex]?.message),
                },
                { "opacity-50 bg-gray-200": props.disabled },
                { "px-4": !leftImg && !rightImg },
                { "pl-21 md:pl-36 pr-4": InputSelect },
                { "pl-14 pr-4": leftImg },
                { "pr-8": rightImg },
                { "bg-white border-primary": isFill },
                { "bg-white border-primary": primary && !error },
                { "bg-white": !isFill },
                !!isFill && styles.inputDateWithValue,
                "placeholder-gray-500 w-full text-gray-500 font-montserrat border",
                {
                  "pb-4 pt-4 rounded-full f-24": !otherStyles,
                },
                otherStyles,
                {
                  "border-gray-500": !error && !isFill,
                },
                "disabled:placeholder-[black] disabled:cursor-not-allowed disabled:text-[black] ",
                {
                  "focus:outline-none focus:bg-gray-opacity-10 focus:ring-offset-transparent focus:ring-opacity-0 focus:border-gray-opacity-10 focus:ring-transparent":
                    !error,
                }
              )}
              ref={registerAux && registerAux.ref}
              onChange={(e) => {
                registerAux && registerAux.onChange(e); // method from hook form register
                onChangeCustom && onChangeCustom(e); // your method
                e.target.value === ""
                  ? setShowLabel(false)
                  : setShowLabel(true);
              }}
              // ref={register ? register(rules) : () => ({})}
              {...props}
            />
          ) : (
            <textarea
              id={name}
              name={name}
              placeholder={customPlaceholder || title}
              autoComplete="off"
              className={clsx(
                {
                  "border-alert-error focus:border-alert-error placeholder-alert-error focus:ring-transparent":
                    error || verifyValue === false,
                },
                {
                  "text-alert-error": error,
                },
                { "opacity-50 bg-gray-200": props.disabled },
                { "px-4": !leftImg && !rightImg },
                { "pl-21 md:pl-36 pr-4": InputSelect },
                { "pl-14 pr-4": leftImg },
                { "pr-8": rightImg },
                { "bg-white border-primary": isFill },
                { "bg-white border-primary": primary && !error },
                { "bg-white": !isFill },
                !!isFill && styles.inputDateWithValue,
                "placeholder-gray-500 w-full text-gray-500 font-montserrat border",
                {
                  "pb-4 pt-4 rounded-full f-24": !otherStyles,
                },
                otherStyles,
                {
                  "border-gray-500": !error && !isFill,
                },
                "disabled:placeholder-gray-200 disabled:cursor-not-allowed disabled:text-gray-500",
                {
                  "focus:outline-none focus:bg-gray-opacity-10 focus:ring-offset-transparent focus:ring-opacity-0 focus:border-gray-opacity-10 focus:ring-transparent":
                    !error,
                }
              )}
              ref={registerAux && registerAux.ref}
              onChange={(e) => {
                registerAux && registerAux.onChange(e); // method from hook form register
                onChangeCustom && onChangeCustom(e); // your method
                e.target.value === ""
                  ? setShowLabel(false)
                  : setShowLabel(true);
              }}
              // ref={register ? register(rules) : () => ({})}
              {...props}
            />
          )}

          {InputSelect && (
            <div className="absolute top-0 h-full w-20 md:w-32">
              <InputSelect />
            </div>
          )}

          {leftImg && (
            <div
              onClick={leftClick}
              className="absolute left-7 top-1/3 w-5 h-5"
            >
              <Icon
                src={leftImg}
                fillPath
                className="text-gray-500 cursor-pointer"
              />
            </div>
          )}
          {rightImg && (
            <div
              onClick={rightClick}
              className="absolute right-4 top-1/3 w-5 h-5"
            >
              <Icon
                src={rightImg}
                fillPath
                className="text-gray-500 cursor-pointer"
              />
            </div>
          )}
        </div>
        {error && (error.message || error[arrayIndex]) && (
          <span className="flex items-center mt-3 text-alert-error font-montserrat">
            <div className="mr-1 w-4 h-3">
              <Icon
                src={Icons.exclamation}
                fillPath
                className="text-alert-error"
              />
            </div>
            <Typography type="caption" className="f-12">
              {isArray ? error[arrayIndex]?.message : error.message}
            </Typography>
          </span>
        )}
      </div>
    </div>
  );
};

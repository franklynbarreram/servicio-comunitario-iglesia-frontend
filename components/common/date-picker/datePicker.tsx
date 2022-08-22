/* eslint-disable @typescript-eslint/no-explicit-any */
const XIcon = "/icons/X.svg";
const DateIcon = "/icons/calendar.svg";
import clsx from "clsx";
import { Icon } from "components/icon";
import { Icons } from "consts";
import moment from "moment";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { Typography } from "../typography";
import { Controller } from "react-hook-form";
const format_date = "MM/DD/YYYY";
export interface DataPickerCustomProps {
  name: string;
  value: any;
  setValue?: any;
  register: any;
  label?: string;
  rules: any;
  error: any;
  control: any;
  setValueRHF: any;
  disabled?: boolean;
  setValueParams?: any;
  className?: string;
  hideLabelTitle?: boolean;
  minDate?: any;
  maxDate?: any;
}
export function DatePickerCustom({
  name,
  value,
  setValueRHF,
  setValue,
  error,
  register,
  rules,
  control,
  disabled,
  hideLabelTitle,
  label,
  minDate,
  maxDate,
  setValueParams,
  className,
}: DataPickerCustomProps) {
  const registerAux: any = register(name, rules);
  const convert = (date: any) => {
    const aux = new DateObject(date).format(format_date);
    setValueRHF(name, moment(aux).format(), { shouldValidate: true });
    setValueParams
      ? setValueParams(name, moment(aux).format())
      : setValue(moment(aux).format());
  };

  const resetDate = () => {
    setValueParams ? setValueParams(name, undefined) : setValue(undefined);

    setValueRHF(name, undefined);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules} //optional
      render={({
        field: { onChange, name },
        fieldState: { invalid, isDirty }, //optional
        formState: { errors }, //optional, but necessary if you want to show an error message
      }) => (
        <DatePicker
          value={value}
          containerClassName="w-full"
          disabled={disabled}
          className={className}
          minDate={minDate}
          maxDate={maxDate}
          // ref={registerAux && registerAux.ref}
          // onChange={(e) => {
          // 	registerAux && registerAux.onChange(e); // method from hook form register
          // 	// onChangeCustom && onChangeCustom(e); // your method
          // 	// e.target.value === "" ? setShowLabel(false) : setShowLabel(true);
          // }}
          render={
            <CustomComponentPicker
              label={label}
              error={errors}
              name={name}
              className={className}
              customValue={value}
              resetValue={resetDate}
              disabled={disabled}
              hideLabelTitle={hideLabelTitle}
            />
          }
          onFocusedDateChange={convert}
        />
      )}
    />
  );
}

function CustomComponentPicker({
  label,
  name,
  openCalendar,
  customValue,
  error,
  resetValue,
  disabled,
  className,
  hideLabelTitle,
}: any) {
  return (
    <div className={className}>
      {!hideLabelTitle && (
        <Typography
          type="label"
          className={clsx("ml-3 font-normal text-primary mb-2 block f-18")}
        >
          {label}
        </Typography>
      )}
      {customValue ? (
        <div
          className={clsx(
            "w-full flex items-center rounded-full border justify-between border-primary h-10 pl-3 pr-3",
            { "opacity-50 bg-gray-200": disabled }
          )}
        >
          <span className="text-xs text-primary">
            {moment(customValue).format(format_date)}
          </span>
          {!disabled && (
            <img
              src={XIcon}
              className="w-4 cursor-pointer"
              alt=""
              onClick={resetValue}
            />
          )}
        </div>
      ) : (
        <div
          className="w-full flex items-center rounded-full border justify-between border-primary h-10 pl-3 pr-3"
          onClick={openCalendar}
        >
          <span className="text-xs text-primary capitalize">{label}</span>
          <img src={DateIcon} className="w-4" alt="" />
        </div>
      )}
      {error && error[name]?.message && (
        <span className="flex items-center mt-3 text-alert-error font-montserrat">
          <div className="mr-1 w-4 h-3">
            <Icon
              src={Icons.exclamation}
              fillPath
              className="text-alert-error"
            />
          </div>
          <Typography type="caption" className="f-12">
            {error[name]?.message}
          </Typography>
        </span>
      )}
    </div>
  );
}

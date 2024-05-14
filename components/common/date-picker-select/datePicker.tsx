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
const format_date = "YYYY-MM-DD";
const visible_format_date = "YYYY - MMMM";
export interface DataPickerCustomProps {
  name: string;
  value: any;
  setValue: any;
  label: string;
  hideDeleteDate?: boolean;
  hideLabelTitle?: boolean;
}
export function DatePickerCustom({
  name,
  value,
  setValue,
  label,
  hideDeleteDate,
  hideLabelTitle,
}: DataPickerCustomProps) {
  const convert = (date: any) => {
    const aux = new DateObject(date).format(format_date);
    setValue(name, aux);
  };

  const resetDate = () => {
    setValue(name, undefined);
  };

  return (
    <DatePicker
			onlyMonthPicker={true}
			format={format_date}
      value={value}
      containerClassName="w-full flex"
      style={{ display: "flex" }}
      render={
        <CustomComponentPicker
          label={label}
          name={name}
          customValue={value}
          resetValue={resetDate}
          hideLabelTitle={hideLabelTitle}
          hideDeleteDate={hideDeleteDate}
        />
      }
      onFocusedDateChange={convert}
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
  hideDeleteDate,
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
      {customValue && !hideDeleteDate ? (
        <div
          className={clsx(
            "w-full flex items-center rounded-full border justify-between border-primary h-10 pl-3 pr-3",
            { "opacity-50 bg-gray-200": disabled }
          )}
        >
          <span className="text-xs text-primary">
            {moment(customValue).format(visible_format_date)}
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
          <span className="text-xs text-primary capitalize">
            {" "}
            {moment(customValue).format(visible_format_date)}
          </span>
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

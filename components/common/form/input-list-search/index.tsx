import * as React from "react";
import { Listbox, Transition, Combobox } from "@headlessui/react";
import { OptionType } from "interfaces";
import { InputProps } from "interfaces/common";
import {
  CheckIcon,
  ChevronDownIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";
import { Icon } from "components/icon";
import { Icons } from "consts";
import { Typography } from "components/common/typography";
import { isEmpty } from "lodash";
import { classNames } from "react-select/dist/declarations/src/utils";

export interface InputListProps {
  options: OptionType[];
  myDefaultValue?: any;
  handleChange?: any;
  typeStyle?: "selectTransparent" | "transparentRightSeparator";
  widhtList?: "full" | "normal";
  right?: boolean;
  customClassNamesOptions?: string;
  classNamesContainer?: string;
}

export const InputListSearch: React.FC<
  InputProps & InputListProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  options,
  myDefaultValue,
  handleChange,
  typeStyle = "transparentRightSeparator",
  widhtList = "full",
  right,
  onChangeCustom,
  register,
  error,
  disabled,
  customClassNamesOptions,
  classNamesContainer,
  ...props
}) => {
  // const [selected, setSelected] = React.useState(
  //   myDefaultValue ? getDefaultValue(options, myDefaultValue) : options[0]
  // );
  const getValue = (options: OptionType[], value: any) => {
    console.log("valor", value);
    const find =
      options.filter(
        (opt) => opt.value.toLowerCase() === value.value.toLowerCase()
      )[0] || options[0];

    // console.log("data search value select", find);
    return find;
  };

  const [selected, setSelected] = React.useState(
    myDefaultValue ? getValue(options, myDefaultValue) : ("" as any)
  );
  //  const [selected, setSelected] = React.useState(options[0]);
  const [query, setQuery] = React.useState("");
  const registerAux = register(props.name, props.rules);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((person) =>
          person.text
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  // React.useEffect(() => {
  //    (selected.value);
  // }, [selected.value]);

  const handleChangeInputSearch = (value: any) => {
    console.log("llega", value);
    // const getData = getValue(options, value);
    setSelected(value);
    handleChange(value);
  };

  return (
    <div className={clsx("h-full py-2", classNamesContainer)}>
      <input
        id={props.name}
        name={props.name}
        type="text"
        value={selected.value ? selected.value : ""}
        className="hidden"
        readOnly
        disabled={disabled}
        ref={registerAux && registerAux.ref}
        onChange={(e) => {
          registerAux && registerAux.onChange(e); // method from hook form register
          onChangeCustom && onChangeCustom(e); // your method
        }}
      />

      <div className="w-full">
        <p className={"ml-3 font-normal mb-2 block f-18"}>{props.title}</p>
        <Combobox
          disabled={disabled}
          value={selected}
          onChange={handleChangeInputSearch}
        >
          <div className="relative mt-1">
            <div className="focus-visible:border-0 focus:outline-none focus:ring-transparent relative border border-primary w-full cursor-default overflow-hidden rounded-full bg-white text-left sm:text-sm">
              <Combobox.Input
                ref={registerAux && registerAux.ref}
                onChange={(e) => {
                  registerAux && registerAux.onChange(e); // method from hook form register
                  onChangeCustom && onChangeCustom(e); // your method
                  setQuery(e.target.value);
                }}
                {...props}
                required={props.required}
                placeholder="Seleccione un tipo"
                className="disabled:opacity-80 disabled:border-gray-200  w-full py-3 pl-3 pr-10 text-sm leading-5 text-gray-500 focus-visible:border-0 focus:ring-transparent focus:outline-none"
                displayValue={(item: any) => item.text}
                // defaultValue={myDefaultValue?.value}
                // value={myDefaultValue?.value}
                // onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options
                className={clsx(
                  customClassNamesOptions,
                  "absolute z-10 border border-primary rounded-sm mt-1 ring-black ring-opacity-5 focus:outline-none",
                  {
                    "w-full overflow-auto bg-white py-1 text-base sm:text-sm max-h-60":
                      !customClassNamesOptions,
                  }
                )}
              >
                {filteredOptions.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredOptions.map((item: any) => (
                    <Combobox.Option
                      key={item.value}
                      className={({ selected, active }) =>
                        clsx(
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-yellow text-white" : "text-gray-900"
                          }`,
                          { hidden: item.disabled }
                        )
                      }
                      value={item}
                    >
                      {({ active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected.value === item.value
                                ? "font-medium"
                                : "font-normal"
                            }`}
                          >
                            {item.text}
                          </span>
                          {selected.value === item.value ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-black"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        {error && error.message && (
          <span className="flex items-center mt-3 text-alert-error font-montserrat">
            <div className="mr-1 w-4 h-3">
              <Icon
                src={Icons.exclamation}
                fillPath
                className="text-alert-error"
              />
            </div>
            <Typography type="caption" className="f-12">
              {error.message}
            </Typography>
          </span>
        )}
      </div>
    </div>
  );
};

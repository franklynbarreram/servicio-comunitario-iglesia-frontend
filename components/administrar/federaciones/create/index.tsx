import { Input } from "components/common/form/input";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";
import AsyncSelect from "react-select/async";
import { useForm } from "react-hook-form";
import { Button } from "components/common/button/button";
const CreateFederacion = ({ hide }: any) => {
  const [selectValue, setSelectValue] = React.useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });
  const rules = {
    name: {
      required: { value: true, message: "This is required" },
    },
    abreviatura: {
      required: { value: true, message: "This is required" },
    },
  };

  const handleSubmitData = (data: any) => {
    console.log(data);
  };
  const handleChangeSelect = (selected: any) => {
    setSelectValue(selected);
  };
  React.useEffect(() => {
    console.log("cambia", selectValue);
  }, [selectValue]);

  const customStyles = {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      borderBottom: "1px solid #fcc824",
      color: state.isSelected ? "black" : "black",
      fontWeight: state.isSelected ? "bold" : "400",
      backgroundColor: state.isSelected ? "#fcc824" : "white",
    }),
    menu: (defaultStyles: any) => ({
      ...defaultStyles,
      position: "relative",
    }),
    control: (defaultStyles: any) => ({
      ...defaultStyles,
      borderRadius: "50px",
      borderColor: "#707070",
      width: "100%",
    }),
    input: (defaultStyles: any) => ({
      ...defaultStyles,
      // padding: 0,
      margin: 0,
      fontSize: "0.875rem",
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
    }),
    valueContainer: (defaultStyles: any) => ({
      ...defaultStyles,
      paddingTop: 0,
      paddingBottom: 0,
      margin: 0,
      paddingLeft: "1rem",
      paddingRight: "1rem",
    }),
    singleValue: (defaultStyles: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...defaultStyles, opacity, transition };
    },
  };

  const colourOptions = [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
    { value: "test3", label: "test3" },
  ];
  const filterColors = (inputValue: string) => {
    return colourOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold">Crear Federacion</h2>
      <div className="container-form mt-5 text-left">
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <Input
            name="name"
            title="Nombre"
            labelVisible
            isFill={!!watch("name")}
            register={register}
            rules={rules.name}
            error={errors.name}
            className="mb-3 md:mb-5"
            otherStyles="pt-3 pb-3 rounded-full text-sm"
          />
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <Input
                name="abreviatura"
                title="Abreviatura"
                labelVisible
                isFill={!!watch("abreviatura")}
                register={register}
                rules={rules.abreviatura}
                error={errors.abreviatura}
                className="mb-3 md:mb-5"
                otherStyles="pt-3 pb-3 rounded-full text-sm"
              />
            </div>
            <div className="col-span-2">
              <div className={"relative py-2 w-full mb-3 md:mb-5"}>
                <p className={"ml-3 font-normal mb-2 block f-18"}>
                  Presidente del consejo
                </p>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={promiseOptions}
                  styles={customStyles}
                  value={selectValue}
                  className={"text-sm"}
                  onChange={handleChangeSelect}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-10 px-20">
            <Button
              labelProps="f-18 font-normal"
              label={"Cancelar"}
              // loading={isLoading}
              boderRadius="rounded-full"
              size="full"
              type="button"
              sizesButton="py-3"
              onClick={hide}
              // disabled={!isDirty || !isValid || !!isLoading}
            />
            <Button
              labelProps="f-18 font-normal"
              label={"Crear"}
              fill
              // loading={isLoading}
              boderRadius="rounded-full"
              size="full"
              type="submit"
              sizesButton="py-3"

              // disabled={!isDirty || !isValid || !!isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session.accessToken) {
    return {
      props: {},
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default CreateFederacion;

import { Input } from "components/common/form/input";
import { GetServerSideProps } from "next";
import * as React from "react";
import AsyncSelect from "react-select/async";
import { useForm } from "react-hook-form";
import { Button } from "components/common/button/button";
import { PersonasServices } from "services";
import { Spinner } from "components/common/spinner/spinner";
import { useToasts } from "react-toast-notifications";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GenerateErrorToast, ValidateImage } from "lib/helper";
import { isNil, isEmpty } from "lodash";
import { customStyles } from "consts/stylesReactSelect.helper";
import { OptionType } from "interfaces";
import { InputListSearch } from "components/common/form/input-list-search";
import { DatePickerCustom } from "components/common/date-picker/datePicker";
import { optionsType, optionsTypeCapellan } from "consts/typesSelects";
import {
  TypesSelectCapellanEnums,
  TypesSelectEnums,
} from "consts/typesSelectEnum";
import { InputImage } from "components/common/input-image";
import { CamporeeServices } from "services/Camporee";
import { useModal } from "hooks/modal";
import { Help } from "components/common/help";
import { HelpCreateCamporee } from "help/camporee/create";

const CreateCamporee = ({ hide, refetch }: any) => {
  const {
    Modal: ModalHelp,
    hide: hideHelp,
    isShow: isShowHelp,
    show: showHelp,
  } = useModal();

  const [fechaInicio, setFechaInicio] = React.useState();
  const [tipoCapellan, setTipoCapellan] =
    React.useState<{ value: string; label: string }>();
  const [fechaFin, setFechaFin] = React.useState();
  const [fechaInicioInformes, setFechaInicioInformes] = React.useState();

  const [selectValuePersona, setSelectValuePersona] =
    React.useState<{ value: Number; label: string }>();

  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState();
  const [dataPersona, setDataPersona] = React.useState<any>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
    setError,
    watch,
    control,
  } = useForm({
    mode: "onChange",
  });
  const rules = {
    name: {
      required: { value: true, message: "Este campo es requerido" },
    },

    nivel1: {
      required: { value: true, message: "Este campo es requerido" },
      min: { value: 1, message: "Debe ser mayor a 0" },
      max: { value: 100, message: "Debe ser menor o igual a 100" },
    },
    nivel2: {
      required: { value: true, message: "Este campo es requerido" },
      min: { value: 1, message: "Debe ser mayor a 0" },
      max: { value: 100, message: "Debe ser menor o igual a 100" },
    },
    nivel3: {
      required: { value: true, message: "Este campo es requerido" },
      min: { value: 1, message: "Debe ser mayor a 0" },
      max: { value: 100, message: "Debe ser menor o igual a 100" },
    },
    nivel4: {
      required: { value: true, message: "Este campo es requerido" },
      min: { value: 1, message: "Debe ser mayor a 0" },
      max: { value: 100, message: "Debe ser menor o igual a 100" },
    },
    tipo: {
      required: { value: true, message: "Este campo es requerido" },
    },
    puntuacion_maxima_informe: {
      required: { value: true, message: "Este campo es requerido" },
      min: { value: 1, message: "Debe ser mayor a 0" },
    },
    fecha_inicio: {
      required: { value: true, message: "Este campo es requerido" },
    },
    fecha_fin: {
      required: { value: true, message: "Este campo es requerido" },
    },
    fecha_inicio_informes: {
      required: { value: true, message: "Este campo es requerido" },
    },
    icon: {
      required: { value: false },
    },
  };

  const handleSubmitData = (form: any) => {
    const FinalData = {
      nombre: form?.name,
      logo: form?.icon,
      lugar: form.lugar,
      fecha_inicio: form?.fecha_inicio,
      fecha_fin: form?.fecha_fin,
      fecha_inicio_informes: form?.fecha_inicio_informes,
      id_capellan:
        form?.tipoCapellan?.value === TypesSelectCapellanEnums.INTERNO
          ? selectValuePersona?.value
          : null,
      capellan_externo:
        form?.tipoCapellan?.value === TypesSelectCapellanEnums.EXTERNO
          ? form?.capellanExterno
          : null,
      tipo: form.tipo.value ? form.tipo.value : form.tipo,
      nivel1: form.nivel1,
      nivel2: form.nivel2,
      nivel3: form.nivel3,
      nivel4: form.nivel4,
      puntuacion_maxima_informe: form?.puntuacion_maxima_informe,
    };

    setIsLoading(true);

    CamporeeServices.create(FinalData)
      .then((response: any) => {
        addToast("Camporee creado exitosamente", {
          appearance: "success",
        });
        refetch();
        hide();
        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log("Error: ", e);
        GenerateErrorToast(e, addToast);
        setIsLoading(false);
      });
  };
  const handleChangeSelectDirector = (selected: any) => {
    setSelectValuePersona(selected);
  };

  React.useEffect(() => {}, [selectValuePersona]);

  const promiseOptionsDirector = (inputValue: any, callback: any) => {
    if (!inputValue && !dataPersona) {
      return PersonasServices.getAll().then((response) => {
        setDataPersona(response);
        const options = response?.data?.map((item: any) => {
          return {
            value: item.cedula,
            label: `${item.nombres} ${item.apellidos}`,
          };
        });
        return options;
      });
    } else {
      let filter = dataPersona?.data?.filter((item: any) =>
        item.nombres
          ?.toString()
          ?.toLowerCase()
          .includes(inputValue?.toString()?.toLowerCase())
      );
      if (isEmpty(filter) || isNil(filter)) {
        filter = dataPersona?.data?.filter((item: any) =>
          item.apellidos
            ?.toString()
            ?.toLowerCase()
            .includes(inputValue?.toString()?.toLowerCase())
        );
      }

      const options = filter?.map((item: any) => {
        return {
          value: item.cedula,
          label: `${item.nombres} ${item.apellidos}`,
        };
      });
      return callback(options);
    }
  };

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold">Crear Camporee</h2>
      <div className="container-form mt-5 text-left">
        {isLoading ? (
          <Spinner type="loadingPage" className="py-10" />
        ) : (
          <>
            <Help showModal={showHelp} />

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
              <Input
                name="lugar"
                title="Lugar"
                labelVisible
                isFill={!!watch("lugar")}
                register={register}
                error={errors.lugar}
                className="mb-3 md:mb-5"
                otherStyles="pt-3 pb-3 rounded-full text-sm"
              />
              <div className="flex-wrap flex-auto lg:flex-nowrap flex gap-4">
                <DatePickerCustom
                  name="fecha_inicio"
                  register={register}
                  rules={rules.fecha_inicio}
                  error={errors.fecha_inicio}
                  label={"Fecha inicio"}
                  value={fechaInicio}
                  control={control}
                  setValue={setFechaInicio}
                  setValueRHF={setValue}
                  // disabled={isRecurrent || !editInformeCreated}
                />
                <DatePickerCustom
                  register={register}
                  rules={rules.fecha_fin}
                  error={errors.fecha_fin}
                  name="fecha_fin"
                  label={"Fecha fin"}
                  value={fechaFin}
                  setValue={setFechaFin}
                  control={control}
                  setValueRHF={setValue}
                  // disabled={!editInformeCreated}
                />
              </div>
              <div className="flex-wrap flex-auto lg:flex-nowrap flex gap-4 mt-6">
                <DatePickerCustom
                  name="fecha_inicio_informes"
                  register={register}
                  rules={rules.fecha_inicio_informes}
                  error={errors.fecha_inicio_informes}
                  label={"Fecha inicio informes"}
                  value={fechaInicioInformes}
                  control={control}
                  setValue={setFechaInicioInformes}
                  setValueRHF={setValue}
                  className="py-2"
                  // disabled={isRecurrent || !editInformeCreated}
                />
                <Input
                  name="puntuacion_maxima_informe"
                  title="Puntuacion maxima informe"
                  labelVisible
                  isFill={!!watch("puntuacion_maxima_informe")}
                  register={register}
                  rules={rules.puntuacion_maxima_informe}
                  error={errors.puntuacion_maxima_informe}
                  className="mb-3 md:mb-5"
                  otherStyles="h-10 rounded-full text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <Input
                    name="nivel1"
                    title="Nivel 1"
                    labelVisible
                    isFill={!!watch("nivel1")}
                    register={register}
                    rules={rules.nivel1}
                    error={errors.nivel1}
                    className="mb-3 md:mb-5"
                    type="number"
                    otherStyles="pt-3 pb-3 rounded-full text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    name="nivel2"
                    title="Nivel 2"
                    labelVisible
                    isFill={!!watch("nivel2")}
                    register={register}
                    rules={rules.nivel2}
                    error={errors.nivel2}
                    className="mb-3 md:mb-5"
                    otherStyles="pt-3 pb-3 rounded-full text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <Input
                    name="nivel3"
                    title="Nivel 3"
                    labelVisible
                    isFill={!!watch("nivel3")}
                    register={register}
                    rules={rules.nivel3}
                    error={errors.nivel3}
                    className="mb-3 md:mb-5"
                    type="number"
                    otherStyles="pt-3 pb-3 rounded-full text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    name="nivel4"
                    title="Nivel 4"
                    labelVisible
                    isFill={!!watch("nivel4")}
                    register={register}
                    rules={rules.nivel4}
                    error={errors.nivel4}
                    className="mb-3 md:mb-5"
                    otherStyles="pt-3 pb-3 rounded-full text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <InputListSearch
                    name="tipo"
                    title="Tipo"
                    className="mb-4"
                    options={optionsType}
                    register={register}
                    rules={rules.tipo}
                    error={errors.tipo}
                    handleChange={(data: OptionType) =>
                      setValue("tipo", data, { shouldValidate: true })
                    }
                    // myDefaultValue={watch("tipo")}
                  />
                </div>
                <div className="col-span-1">
                  <InputListSearch
                    name="tipoCapellan"
                    title="Tipo capellan"
                    className="mb-4"
                    options={optionsTypeCapellan}
                    register={register}
                    error={errors.tipoCapellan}
                    handleChange={(data: OptionType) => {
                      setValue("tipoCapellan", data, { shouldValidate: true });
                      setTipoCapellan(data as any);
                    }}
                    // myDefaultValue={watch("tipoCapellan")}
                  />
                </div>
              </div>
              {tipoCapellan?.value === TypesSelectCapellanEnums.INTERNO && (
                <div className={"relative py-2 w-full mb-3 md:mb-5"}>
                  <p className={"ml-3 font-normal mb-2 block f-18"}>Capellan</p>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={promiseOptionsDirector}
                    styles={customStyles}
                    value={selectValuePersona}
                    className={"text-sm"}
                    onChange={handleChangeSelectDirector}
                  />
                </div>
              )}
              {tipoCapellan?.value === TypesSelectCapellanEnums.EXTERNO && (
                <Input
                  name="capellanExterno"
                  title="Capellan Externo"
                  labelVisible
                  isFill={!!watch("capellanExterno")}
                  register={register}
                  error={errors.capellanExterno}
                  className="mb-3 md:mb-5"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              )}
              <InputImage
                control={control}
                name="icon"
                register={register}
                rules={rules.icon}
                error={errors.icon}
                setErrorRHF={setError}
                setValueRHF={setValue}
                // image={data?.logo !== "string" && data?.logo}
              />
              <div className="flex flex-col md:flex-row gap-4 mt-10 px-4 md:px-20">
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
                />
              </div>
            </form>
            <ModalHelp isShow={isShowHelp}>
              <HelpCreateCamporee hide={hideHelp} />
            </ModalHelp>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateCamporee;

import { Input } from "components/common/form/input";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";
import AsyncSelect from "react-select/async";
import { useForm } from "react-hook-form";
import { Button } from "components/common/button/button";
// import { useQuery } from "react-query";
// import { UseQueryEnums } from "consts/useQueryEnums";
import { ConsejosRegionalesServices, PersonasServices } from "services";
import { Spinner } from "components/common/spinner/spinner";
import { useToasts } from "react-toast-notifications";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Typography } from "components/common/typography";
import clsx from "clsx";
import { GenerateErrorToast, ValidateImage } from "lib/helper";
import { isNil, isEmpty } from "lodash";
import { PresidentesConsejoRegional } from "services/PresidentesConsejoRegional";
import { DistritosServices } from "services/Distritos";
import { PastoresService } from "services/Pastores";
import { customStyles } from "consts/stylesReactSelect.helper";
import { IglesiasServices } from "services/Iglesias";
import { AncianosService } from "services/Ancianos";
import { ClubesServices } from "services/Clubes";
import { DirectorService } from "services/Director";
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

const EditCamporee = ({ data, hide, refetch }: any) => {
  console.log("data de camporeee", data);
  const findTypeCapellan = () => {
    return {
      value: data?.id_capellan
        ? TypesSelectCapellanEnums.INTERNO
        : TypesSelectCapellanEnums.EXTERNO,
      text: data?.id_capellan
        ? TypesSelectCapellanEnums.INTERNO
        : TypesSelectCapellanEnums.EXTERNO,
      disabled: false,
      placeholder: false,
    };
  };

  const [fechaInicio, setFechaInicio] = React.useState(data?.fecha_inicio);
  const [tipoCapellan, setTipoCapellan] = React.useState(findTypeCapellan());
  const [fechaFin, setFechaFin] = React.useState(data?.fecha_fin);
  const [fechaInicioInformes, setFechaInicioInformes] = React.useState(
    data?.fecha_inicio_informes
  );

  const [selectValuePersona, setSelectValuePersona] = React.useState<{
    value: Number;
    label: string;
  }>({ value: data.cedula_director, label: data.director });

  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(
    data?.logo !== "string" && data?.logo
  );
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
    defaultValues: {
      name: data?.nombre,
      lugar: data?.lugar,
      nivel1: data?.nivel1,
      nivel2: data?.nivel2,
      nivel3: data?.nivel3,
      nivel4: data?.nivel4,
      puntuacion_maxima_informe: data?.puntuacion_maxima_informe,
      fecha_inicio: data?.fecha_inicio,
      fecha_fin: data?.fecha_fin,
      fecha_inicio_informes: data?.fecha_inicio_informes,
      tipo: {
        value: data?.tipo,
        text: data?.tipo,
        disabled: false,
        placeholder: false,
      },
      tipoCapellan: findTypeCapellan(),
      capellanExterno: data?.capellan,
      icon: data?.logo,
    },
  });
  const rules = {
    name: {
      required: { value: true, message: "This is required" },
    },

    nivel1: {
      required: { value: true, message: "This is required" },
      min: { value: 1, message: "Debe ser mayor a 0" },
      max: { value: 100, message: "Debe ser menor o igual a 100" },
    },
    nivel2: {
      required: { value: true, message: "This is required" },
      min: { value: 1, message: "Debe ser mayor a 0" },
      max: { value: 100, message: "Debe ser menor o igual a 100" },
    },
    nivel3: {
      required: { value: true, message: "This is required" },
      min: { value: 1, message: "Debe ser mayor a 0" },
      max: { value: 100, message: "Debe ser menor o igual a 100" },
    },
    nivel4: {
      required: { value: true, message: "This is required" },
      min: { value: 1, message: "Debe ser mayor a 0" },
      max: { value: 100, message: "Debe ser menor o igual a 100" },
    },
    lugar: {
      required: { value: true, message: "This is required" },
    },
    tipo: {
      required: { value: true, message: "This is required" },
    },
    tipoCapellan: {
      required: { value: true, message: "This is required" },
    },
    puntuacion_maxima_informe: {
      required: { value: true, message: "This is required" },
      min: { value: 1, message: "Debe ser mayor a 0" },
    },
    fecha_inicio: {
      required: { value: true, message: "This is required" },
    },
    fecha_fin: {
      required: { value: true, message: "This is required" },
    },
    fecha_inicio_informes: {
      required: { value: true, message: "This is required" },
    },
    capellanExterno: {
      required: { value: true, message: "This is required" },
    },
    icon: {
      required: { value: true, message: "This is required" },
    },
  };

  const handleSubmitData = (form: any) => {
    // const FinalData = {
    //   nivel1_biblicos: form.nivel1,
    //   cedula_director: selectValuePersona?.value,
    //   tipo: form.tipo.value ? form.tipo.value : form.tipo,
    // };

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

    console.log("A ENVIAR", FinalData);
    setIsLoading(true);

    CamporeeServices.edit(FinalData, data?.id)
      .then((response: any) => {
        addToast("Camporee editado exitosamente", {
          appearance: "success",
        });
        console.log("response edit camporee:", response);
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

  React.useEffect(() => {
    console.log("cambia", selectValuePersona);
  }, [selectValuePersona]);

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
        item.nombres.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (isEmpty(filter) || isNil(filter)) {
        filter = dataPersona?.data?.filter((item: any) =>
          item.apellidos.toLowerCase().includes(inputValue.toLowerCase())
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
      <h2 className="text-3xl md:text-4xl font-bold">Editar Camporee</h2>
      <div className="container-form mt-5 text-left">
        {isLoading ? (
          <Spinner type="loadingPage" className="py-10" />
        ) : (
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
              rules={rules.lugar}
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
                  myDefaultValue={watch("tipo")}
                />
              </div>
              <div className="col-span-1">
                <InputListSearch
                  name="tipoCapellan"
                  title="Tipo capellan"
                  className="mb-4"
                  options={optionsTypeCapellan}
                  register={register}
                  rules={rules.tipoCapellan}
                  error={errors.tipoCapellan}
                  handleChange={(data: OptionType | any) => {
                    setValue("tipoCapellan", data, { shouldValidate: true });
                    setTipoCapellan(data);
                  }}
                  myDefaultValue={watch("tipoCapellan")}
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
                rules={rules.capellanExterno}
                error={errors.capellanExterno}
                className="mb-3 md:mb-5"
                otherStyles="pt-3 pb-3 rounded-full text-sm"
              />
            )}
            {/* <div className="flex-auto">
              <Typography
                type="label"
                className={clsx("ml-3 font-normal mb-2 block f-18")}
              >
                Icon
              </Typography>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div> */}
            <InputImage
              control={control}
              name="icon"
              register={register}
              rules={rules.icon}
              error={errors.icon}
              setErrorRHF={setError}
              setValueRHF={setValue}
              image={data?.logo !== "string" && data?.logo}
              // fileList={fileList}
              // setFileList={setFileList}
              // isEdit={informe ? true : false}
              // disabled={!editInformeCreated}
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
                label={"Guardar"}
                fill
                // loading={isLoading}
                boderRadius="rounded-full"
                size="full"
                type="submit"
                sizesButton="py-3"
                // disabled={
                //   !isDirty ||
                //   !isValid ||
                //   !!isLoading ||
                //   isEmpty(selectValuePersona?.label) ||
                //   isNil(selectValuePersona?.label) ||
                //   isNil(selectValuePersona) ||
                //   isEmpty(selectValueIglesias?.label) ||
                //   isNil(selectValueIglesias?.label) ||
                //   isNil(selectValueIglesias)
                //   // isEmpty(imageUrl) ||
                //   // isNil(imageUrl)
                // }
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCamporee;

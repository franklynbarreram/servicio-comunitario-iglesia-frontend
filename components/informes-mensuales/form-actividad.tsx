import * as React from "react";
import { Button } from "components/common/button";
import { useForm } from "react-hook-form";
import { Icons } from "consts/icons";
import { InputEmail } from "components/common/form/input-email";
import { InputText } from "components/common/form/input-text";
import { Input } from "components/common/form/input";
import { DatePickerCustom } from "components/common/date-picker/datePicker";
import clsx from "clsx";
import moment from "moment";
import type { UploadFile } from "antd/es/upload/interface";
import { DragAndDrop } from "components/common/dragger/";
import { CamporeeServices } from "services/Camporee";
import { useToasts } from "react-toast-notifications";
import { formatDates, GenerateErrorToast } from "lib/helper";
import { Spinner } from "components/common/spinner/spinner";
import { isEmpty, isNil, size } from "lodash";
import { Icon } from "components/icon";
import { SelectInput } from "components/common/form/select/SelectInput";
import { InputListSearch } from "components/common/form/input-list-search";
import { optionsType, optionsTypeInformesMensuales } from "consts/typesSelects";
import { OptionType } from "interfaces";
import { Typography } from "components/common/typography";
import { InformesMensualesService } from "services/InformesMensuales";

type InformeFormProps = {
  className?: string;
  refetch: any;
  hide?: any;
  informe?: any;
  data?: any;
  isEditable?: boolean;
};

export const ActividadForm: React.FC<InformeFormProps> = ({
  hide,
  refetch,
  isEditable,
  className,
  data,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  // const [mes, setMes] = React.useState(mesInforme);
  const { addToast } = useToasts();
  const [fechaRealizado, setFechaRealizado] = React.useState();
  const [fileList, setFileList] = React.useState<UploadFile[] | any>([]);
  const {
    register,
    control,
    handleSubmit,
    setError: setErrorRHF,
    setValue: setValueRHF,
    formState: { isDirty, isValid, errors },
    watch,
  } = useForm<any>({
    mode: "onChange",
    // defaultValues: {  }
  });

  const rules = {
    nombre: {
      required: { value: true, message: "Este campo es requerido" },
    },
    tipo: {
      required: { value: true, message: "Este campo es requerido" },
    },
    lugar: {
      required: { value: true, message: "Este campo es requerido" },
    },
    description: {
      required: { value: true, message: "Este campo es requerido" },
    },
    objetive: {
      required: { value: true, message: "Este campo es requerido" },
    },
    mes: {
      required: { value: true, message: "Este campo es requerido" },
    },
    fecha_realizado: {
      required: { value: true, message: "Este campo es requerido" },
    },
    participantes: {
      required: { value: true, message: "Este campo es requerido" },
      min: { value: 1, message: "Debe ser mayor a 0" },
    },
    nro_visitas: {
      required: { value: true, message: "Este campo es requerido" },
    },
    nro_miembros: {
      required: { value: true, message: "Este campo es requerido" },
    },
    files: {
      required: { value: true, message: "Este campo es requerido" },
      validate: (value: any) => {
        // console.log("en la validacion:", value);
        // console.log("en la validacion lenght:", value?.length);
        if (value.length < 1) {
          // console.log("NO APROBADO");
          return "Debe subir 1 archivo";
        }
      },
    },
  };
  function dataBase64toFile(image: any, filename: string) {
    var arr = image.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  React.useEffect(() => {
    if (!isNil(data)) {
      console.log("EUUUU", data);
      const images = [
        {
          originFileObj: dataBase64toFile(data?.foto, "imagen1"),
          preview: data?.foto,
          name: "imagen1",
          status: "done",
        },
      ];
      // const images: any = [];
      //  console.log("transfoooor:", images);
      setValueRHF("nombre", data.name);
      setValueRHF("description", data.descripcion);
      setValueRHF("lugar", data.lugar);
      setValueRHF("objetive", data.objetivo);
      setValueRHF("nro_miembros", data.asistencia_miembros);
      setValueRHF("nro_visitas", data.asistencia_no_miembros);
      setValueRHF("fecha_realizado", data.fecha);
      // setValueRHF("tipo", data?.tipo);
      const imagesOnlyBase = [data?.foto];

      setValueRHF("files", imagesOnlyBase);
      setFechaRealizado(data.fecha);
      setFileList(images);
    }
  }, []);

  const onHandleSubmit = (form: any) => {
    console.log("datii", form);

    const finalData = {
      fecha: moment(form?.fecha_realizado).format(formatDates),
      descripcion: form?.description,
      objetivo: form?.objetive,
      name: form?.nombre,
      lugar: form?.lugar,
      foto: form?.files[0],
      asistencia_miembros: form?.nro_miembros,
      asistencia_no_miembros: form?.nro_visitas,
      id: data ? data.id : 0,
      tipo: form?.tipo?.value || form?.tipo,
    };

    setIsLoading(true);
    const text = data ? "actualizada" : "agregada";
    InformesMensualesService.createActivity(finalData)
      .then((response) => {
        addToast(`Actividad ${text} exitosamente`, {
          appearance: "success",
        });
        console.log(`response Actividad ${text}:`, response);
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

  return (
    <div className="text-center">
      {isNil(data) && (
        <h2 className="text-3xl md:text-4xl font-bold">Crear Actividad</h2>
      )}
      <div className={clsx("px-4 py-14 rounded-md text-left", className)}>
        {isLoading ? (
          <Spinner type="loadingPage" className="py-10" />
        ) : (
          <form className="w-full" onSubmit={handleSubmit(onHandleSubmit)}>
            <Input
              name="nombre"
              title="Nombre"
              labelVisible
              isFill={!!watch("nombre")}
              register={register}
              rules={rules.nombre}
              error={errors.nombre}
              className="mb-3 md:mb-5"
              otherStyles="pt-3 pb-3 rounded-full text-sm"
              disabled={data && !isEditable}
            />
            {data ? (
              <InputListSearch
                name="tipo"
                title="Tipo"
                className="mb-4"
                options={optionsTypeInformesMensuales}
                register={register}
                rules={rules.tipo}
                error={errors.tipo}
                handleChange={(data: OptionType) =>
                  setValueRHF("tipo", data, { shouldValidate: true })
                }
                myDefaultValue={{
                  value: data?.tipo,
                  text: data?.tipo,
                  disabled: false,
                  placeholder: false,
                }}
                disabled={data && !isEditable}
              />
            ) : (
              <InputListSearch
                name="tipo"
                title="Tipo"
                className="mb-4"
                options={optionsTypeInformesMensuales}
                register={register}
                rules={rules.tipo}
                error={errors.tipo}
                handleChange={(data: OptionType) =>
                  setValueRHF("tipo", data, { shouldValidate: true })
                }
                disabled={data && !isEditable}
              />
            )}
            <div className="flex-wrap flex-auto lg:flex-nowrap flex gap-4 mt-5 mb-5">
              <DatePickerCustom
                register={register}
                rules={rules.fecha_realizado}
                error={errors.fecha_realizado}
                name="fecha_realizado"
                label={"Fecha"}
                value={fechaRealizado}
                setValue={setFechaRealizado}
                control={control}
                setValueRHF={setValueRHF}
                disabled={data && !isEditable}
              />
            </div>
            <Input
              name="lugar"
              title="Lugar"
              labelVisible
              isFill={!!watch("lugar")}
              isTextArea
              register={register}
              rules={rules.lugar}
              error={errors.lugar}
              className="mb-3 md:mb-5"
              otherStyles="pt-3 pb-3 rounded-lg text-sm"
              disabled={data && !isEditable}
            />

            <Input
              name="description"
              title="Descripcion"
              labelVisible
              isTextArea
              isFill={!!watch("description")}
              register={register}
              rules={rules.description}
              error={errors.description}
              className="mb-3 md:mb-5"
              otherStyles="pt-3 pb-3 rounded-lg text-sm"
              disabled={data && !isEditable}
            />
            <Input
              name="objetive"
              title="Objetivo"
              labelVisible
              isTextArea
              isFill={!!watch("objetive")}
              register={register}
              rules={rules.objetive}
              error={errors.objetive}
              className="mb-3 md:mb-5"
              otherStyles="pt-3 pb-3 rounded-lg text-sm"
              disabled={data && !isEditable}
            />
            <div className="text-center">
              <Typography
                type="label"
                className={clsx(
                  "ml-3 font-bold text-primary mb-2 block text-2xl"
                )}
              >
                Asistencia
              </Typography>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-7">
              <div className="col-span-1">
                <Input
                  name="nro_miembros"
                  title="Nº Miembros"
                  type="number"
                  labelVisible
                  isFill={!!watch("nro_miembros")}
                  register={register}
                  rules={rules.nro_miembros}
                  error={errors.nro_miembros}
                  className="mb-3 md:mb-5"
                  otherStyles="pt-3 pb-3 rounded-lg text-sm"
                  disabled={data && !isEditable}
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="nro_visitas"
                  title="Nº Visitas"
                  type="number"
                  labelVisible
                  isFill={!!watch("nro_visitas")}
                  register={register}
                  rules={rules.nro_visitas}
                  error={errors.nro_visitas}
                  className="mb-3 md:mb-5"
                  otherStyles="pt-3 pb-3 rounded-lg text-sm"
                  disabled={data && !isEditable}
                />
              </div>
            </div>

            <div className="mt-10">
              {/* {!isNil(informe) && ( */}
              <DragAndDrop
                control={control}
                name="files"
                maxFiles={1}
                register={register}
                rules={rules.files}
                error={errors.files}
                setErrorRHF={setErrorRHF}
                setValueRHF={setValueRHF}
                fileList={fileList}
                setFileList={setFileList}
                disabled={data && !isEditable}

                // isEdit={informe ? true : false}
              />
              {/* )} */}
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-10 px-4 md:px-20">
              {!data && (
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
              )}
              {(data && isEditable) ||
                (isNil(data) && (
                  <Button
                    labelProps="f-18 font-normal"
                    label={data ? "Guardar" : "Crear"}
                    fill
                    // loading={isLoading}
                    boderRadius="rounded-full"
                    size="full"
                    type="submit"
                    sizesButton="py-3"
                  />
                ))}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

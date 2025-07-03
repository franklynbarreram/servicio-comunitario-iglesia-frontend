import { Input } from "components/common/form/input";
import { GetServerSideProps } from "next";
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
import { formatDates, GenerateErrorToast, ValidateImage } from "lib/helper";
import { isNil, isEmpty } from "lodash";
import { OptionType } from "interfaces";
import { InputListSearch } from "components/common/form/input-list-search";
import { DatePickerCustom } from "components/common/date-picker/datePicker";
import {
  optionsType,
  optionsTypeCapellan,
  optionsTypeYesOrNot,
} from "consts/typesSelects";
import {
  TypesSelectCapellanEnums,
  TypesSelectEnums,
  TypesSelectYesOrNot,
} from "consts/typesSelectEnum";
import { InputImage } from "components/common/input-image";
import { CamporeeServices } from "services/Camporee";
import moment from "moment";
import { Help } from "components/common/help";
import { HelpCreateEventoPrecamporee } from "help/camporee/eventos-precamporee/create";
import { useModal } from "hooks/modal";

const CreateEventPrecamporee = ({ id_camporee, hide, refetch }: any) => {
  const [fechaInicio, setFechaInicio] = React.useState();
  const [fechaFin, setFechaFin] = React.useState();
  const [fechaInicioInformes, setFechaInicioInformes] = React.useState();
  const {
    Modal: ModalHelp,
    hide: hideHelp,
    isShow: isShowHelp,
    show: showHelp,
  } = useModal();
  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = React.useState(false);

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
    descripcion: {
      required: { value: true, message: "Este campo es requerido" },
    },
    tipo: {
      required: { value: true, message: "Este campo es requerido" },
    },
    puntaje_maximo: {
      required: { value: true, message: "Este campo es requerido" },
      min: { value: 1, message: "Debe ser mayor a 0" },
    },
    fecha_inicio: {
      required: { value: true, message: "Este campo es requerido" },
    },
    fecha_fin: {
      required: { value: true, message: "Este campo es requerido" },
    },
  };

  const handleSubmitData = (form: any) => {
    const FinalData = {
      nombre: form?.name,
      descripcion: form.descripcion,
      fecha_inicio: moment(form?.fecha_inicio).format(formatDates),
      fecha_fin: moment(form?.fecha_fin).format(formatDates),
      mensual: form.tipo.value === TypesSelectYesOrNot.SI ? true : false,
      puntaje_maximo: form?.puntaje_maximo,
      id_camporee: id_camporee,
    };

    setIsLoading(true);

    CamporeeServices.createEventPrecamporee(FinalData)
      .then((response: any) => {
        addToast("Evento precamporee creado exitosamente", {
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

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold">Crear Precamporee</h2>
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
                name="descripcion"
                title="Descripcion"
                labelVisible
                isFill={!!watch("descripcion")}
                register={register}
                rules={rules.descripcion}
                error={errors.descripcion}
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
                <InputListSearch
                  name="tipo"
                  title="Mensual"
                  className="mb-4 h-10 rounded-full text-sm flex-1"
                  options={optionsTypeYesOrNot}
                  register={register}
                  rules={rules.tipo}
                  error={errors.tipo}
                  handleChange={(data: OptionType) =>
                    setValue("tipo", data, { shouldValidate: true })
                  }
                  // myDefaultValue={watch("tipo")}
                />
                <Input
                  name="puntaje_maximo"
                  title="Puntaje maximo"
                  labelVisible
                  isFill={!!watch("puntaje_maximo")}
                  register={register}
                  rules={rules.puntaje_maximo}
                  error={errors.puntaje_maximo}
                  className="mb-3 md:mb-5 flex-1"
                  otherStyles="rounded-full text-sm pt-3 pb-3"
                />
              </div>
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
              <HelpCreateEventoPrecamporee hide={hideHelp} />
            </ModalHelp>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateEventPrecamporee;

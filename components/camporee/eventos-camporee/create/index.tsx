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
import { formatDates, GenerateErrorToast, ValidateImage } from "lib/helper";
import { isNil, isEmpty } from "lodash";
import { OptionType } from "interfaces";
import { InputListSearch } from "components/common/form/input-list-search";
import { DatePickerCustom } from "components/common/date-picker/datePicker";
import {
  optionsType,
  optionsTypeCapellan,
  optionsTypeCategoryCamporee,
  optionsTypeEventCamporee,
  optionsTypeYesOrNot,
} from "consts/typesSelects";
import {
  TypesSelectCapellanEnums,
  TypesSelectEnums,
  TypesSelectTypoEventoCamporeeEnums,
  TypesSelectTypoEventoCamporeeMap,
  TypesSelectYesOrNot,
} from "consts/typesSelectEnum";
import { InputImage } from "components/common/input-image";
import { CamporeeServices } from "services/Camporee";
import moment from "moment";
import { number } from "prop-types";

const CreateEventCamporee = ({ idCamporee, hide, refetch }: any) => {
  const [fechaInicio, setFechaInicio] = React.useState();
  const [fechaFin, setFechaFin] = React.useState();
  const [fechaInicioInformes, setFechaInicioInformes] = React.useState();

  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
    setError,
    trigger,
    clearErrors,
    watch,
    control,
  } = useForm({
    mode: "onChange",
  });
  const rules = {
    name: {
      required: { value: true, message: "This is required" },
    },
    descripcion: {
      required: { value: true, message: "This is required" },
    },
    category: {
      required: { value: true, message: "This is required" },
    },
    puntuacion_maxima: {
      // required: { value: true, message: "This is required" },
      min: { value: 1, message: "Debe ser mayor a 0" },
    },
    fecha_inicio: {
      required: { value: true, message: "This is required" },
    },
    fecha_fin: {
      required: { value: true, message: "This is required" },
    },

    oro: {
      min: { value: 4, message: "Debe ser mayor a 3" },
      required: { value: true, message: "This is required" },
      validate: (value: string) => {
        if (watch("plata") && watch("plata") >= value) {
          setError("plata", {
            type: "custom",
            message: "El valor debe ser menor a 'Oro'",
          });
        } else {
          clearErrors("plata");
        }
        if (watch("bronce") && watch("bronce") >= watch("plata")) {
          setError("bronce", {
            type: "custom",
            message: "El valor debe ser menor a 'Plata'",
          });
        } else {
          clearErrors("bronce");
        }
        if (watch("hierro") && watch("hierro") >= watch("bronce")) {
          setError("hierro", {
            type: "custom",
            message: "El valor debe ser menor a 'Bronce'",
          });
        } else {
          clearErrors("hierro");
        }
      },
    },

    plata: {
      min: { value: 3, message: "Debe ser mayor a 2" },
      required: { value: true, message: "This is required" },
      validate: (value: string) => {
        if (value >= watch("oro")) {
          return "El valor debe ser menor a 'Oro'";
        }
        if (watch("bronce") && watch("bronce") >= value) {
          setError("bronce", {
            type: "custom",
            message: "El valor debe ser menor a 'Plata'",
          });
        } else {
          clearErrors("bronce");
        }
        if (watch("hierro") && watch("hierro") >= watch("bronce")) {
          setError("hierro", {
            type: "custom",
            message: "El valor debe ser menor a 'Bronce'",
          });
        } else {
          clearErrors("hierro");
        }
      },
    },

    bronce: {
      min: { value: 2, message: "Debe ser mayor a 1" },
      required: { value: true, message: "This is required" },
      validate: (value: string) => {
        if (value >= watch("plata")) {
          return "El valor debe ser menor a 'Plata'";
        }

        if (watch("hierro") && watch("hierro") >= value) {
          setError("hierro", {
            type: "custom",
            message: "El valor debe ser menor a 'Bronce'",
          });
        } else {
          clearErrors("hierro");
        }
      },
    },
    hierro: {
      min: { value: 1, message: "Debe ser mayor a 0" },
      required: { value: true, message: "This is required" },
      validate: (value: string) => {
        if (value >= watch("bronce")) {
          return "El valor debe ser menor a 'Bronce'";
        }
      },
    },
    participantes_conquistadores_m: {
      required: { value: true, message: "This is required" },
    },
    participantes_guias_mayores_m: {
      required: { value: true, message: "This is required" },
    },
    participantes_conquistadores_f: {
      required: { value: true, message: "This is required" },
    },
    participantes_guias_mayores_f: {
      required: { value: true, message: "This is required" },
      validate: () => {
        console.log("GUIAAAAA");
      },
    },
    eliminatoria: {
      required: { value: true, message: "This is required" },
    },
    tipoEvento: {
      required: { value: true, message: "This is required" },
    },
  };

  const handleSubmitData = (form: any) => {
    const FinalData = {
      nombre: form?.name,
      descripcion: form.descripcion,
      participantes_conquistadores_m: parseInt(
        form?.participantes_conquistadores_m
      ),
      participantes_guias_mayores_m: parseInt(
        form?.participantes_guias_mayores_m
      ),
      participantes_conquistadores_f: parseInt(
        form?.participantes_conquistadores_f
      ),
      participantes_guias_mayores_f: parseInt(
        form?.participantes_guias_mayores_f
      ),
      inscripcion_federacion:
        form?.tipoEvento?.value ===
        TypesSelectTypoEventoCamporeeEnums.FEDERACION
          ? true
          : false,
      eliminatoria:
        form?.eliminatoria?.value === TypesSelectYesOrNot.SI ? true : false,
      id_camporee: parseInt(idCamporee),
      oro: form?.oro,
      plata: form?.plata,
      bronce: form?.bronce,
      hierro: form?.hierro,
      categoria: form?.category?.value,
      puntuacion_maxima: parseInt(form?.puntuacion_maxima),
    };

    console.log("A ENVIAR", FinalData);
    setIsLoading(true);
    CamporeeServices.createEventCamporee(FinalData)
      .then((response: any) => {
        addToast("Evento camporee creado exitosamente", {
          appearance: "success",
        });
        console.log("response create evento camporee:", response);
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
      <h2 className="text-3xl md:text-4xl font-bold">Crear Evento Camporee</h2>
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
            <div className="flex-wrap lg:flex-nowrap flex gap-4 mt-6">
              <InputListSearch
                name="category"
                title="Categoría"
                className="mb-4 h-10 rounded-full text-sm"
                classNamesContainer="flex-1"
                options={optionsTypeCategoryCamporee}
                register={register}
                rules={rules.category}
                error={errors.category}
                handleChange={(data: OptionType) =>
                  setValue("category", data, { shouldValidate: true })
                }
                myDefaultValue={watch("category")}
              />
              <Input
                name="puntuacion_maxima"
                title="Puntuación maxima"
                type="number"
                labelVisible
                isFill={!!watch("puntuacion_maxima")}
                register={register}
                rules={rules.puntuacion_maxima}
                error={errors.puntuacion_maxima}
                className="mb-3 md:mb-5 flex-1 w-full"
                otherStyles="rounded-full text-sm pt-3 pb-3"
              />
            </div>

            <div className="flex-wrap lg:flex-nowrap flex gap-4 mt-6">
              <InputListSearch
                name="tipoEvento"
                title="Tipo evento"
                className="mb-4 h-10 rounded-full text-sm"
                classNamesContainer="flex-1"
                options={optionsTypeEventCamporee}
                register={register}
                rules={rules.tipoEvento}
                error={errors.tipoEvento}
                handleChange={(data: OptionType) =>
                  setValue("tipoEvento", data, { shouldValidate: true })
                }
                myDefaultValue={watch("tipoEvento")}
              />
              <InputListSearch
                name="eliminatoria"
                title="¿Eliminatoria?"
                className="mb-4 h-10 rounded-full text-sm"
                classNamesContainer="flex-1"
                options={optionsTypeYesOrNot}
                register={register}
                rules={rules.eliminatoria}
                error={errors.eliminatoria}
                handleChange={(data: OptionType) =>
                  setValue("eliminatoria", data, { shouldValidate: true })
                }
                myDefaultValue={watch("eliminatoria")}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <Input
                  name="participantes_guias_mayores_m"
                  type="number"
                  title="Hombres guias mayores"
                  labelVisible
                  isFill={!!watch("participantes_guias_mayores_m")}
                  register={register}
                  rules={rules.participantes_guias_mayores_m}
                  error={errors.participantes_guias_mayores_m}
                  className="mb-3 md:mb-5"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="participantes_conquistadores_m"
                  type="number"
                  title="Hombres conquistadores"
                  labelVisible
                  isFill={!!watch("participantes_conquistadores_m")}
                  register={register}
                  rules={rules.participantes_conquistadores_m}
                  error={errors.participantes_conquistadores_m}
                  className="mb-3 md:mb-5"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <Input
                  name="participantes_conquistadores_f"
                  type="number"
                  title="Mujeres conquistadores"
                  labelVisible
                  isFill={!!watch("participantes_conquistadores_f")}
                  register={register}
                  rules={rules.participantes_conquistadores_f}
                  error={errors.participantes_conquistadores_f}
                  className="mb-3 md:mb-5"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="participantes_guias_mayores_f"
                  type="number"
                  title="Mujeres guias mayores"
                  labelVisible
                  isFill={!!watch("participantes_guias_mayores_f")}
                  register={register}
                  rules={rules.participantes_guias_mayores_f}
                  error={errors.participantes_guias_mayores_f}
                  className="mb-3 md:mb-5"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <Input
                  name="oro"
                  title="Oro"
                  labelVisible
                  isFill={!!watch("oro")}
                  register={register}
                  rules={rules.oro}
                  error={errors.oro}
                  className="mb-3 md:mb-5"
                  type="number"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="plata"
                  title="Plata"
                  labelVisible
                  isFill={!!watch("plata")}
                  register={register}
                  rules={rules.plata}
                  error={errors.plata}
                  className="mb-3 md:mb-5"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <Input
                  name="bronce"
                  title="Bronce"
                  labelVisible
                  isFill={!!watch("bronce")}
                  register={register}
                  rules={rules.bronce}
                  error={errors.bronce}
                  className="mb-3 md:mb-5"
                  type="number"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              </div>
              <div className="col-span-1">
                <Input
                  name="hierro"
                  title="Hierro"
                  labelVisible
                  isFill={!!watch("hierro")}
                  register={register}
                  rules={rules.hierro}
                  error={errors.hierro}
                  className="mb-3 md:mb-5"
                  otherStyles="pt-3 pb-3 rounded-full text-sm"
                />
              </div>
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
        )}
      </div>
    </div>
  );
};

export default CreateEventCamporee;

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
  optionsTypeSexo,
  optionsTypeYesOrNot,
} from "consts/typesSelects";
import {
  TypesSelectCamporeeEnums,
  TypesSelectCapellanEnums,
  TypesSelectEnums,
  TypesSelectSexoEnums,
  TypesSelectTypoEventoCamporeeEnums,
  TypesSelectTypoEventoCamporeeMap,
  TypesSelectYesOrNot,
} from "consts/typesSelectEnum";
import { InputImage } from "components/common/input-image";
import { CamporeeServices } from "services/Camporee";
import moment from "moment";
import { number } from "prop-types";
import { customStyles } from "consts/stylesReactSelect.helper";

const CreateEventCamporee = ({
  tipoCamporee,
  idCamporee,
  hide,
  refetch,
}: any) => {
  const [fechaInicio, setFechaInicio] = React.useState();
  const [fechaFin, setFechaFin] = React.useState();
  const [fechaInicioInformes, setFechaInicioInformes] = React.useState();
  // const [selectValuePersona, setSelectValuePersona] = React.useState<{
  //   value: Number;
  //   label: string;
  // }>({ value: data.id_oficial, label: data.oficial });

  const [selectValuePersona, setSelectValuePersona] =
    React.useState<{ value: Number; label: string }>();
  const { addToast } = useToasts();
  const [dataPersona, setDataPersona] = React.useState<any>();
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
    oficial: {
      required: { value: true, message: "This is required" },
    },
    fecha_fin: {
      required: { value: true, message: "This is required" },
    },
    edad_min: {
      required: { value: true, message: "This is required" },
      min: { value: 4, message: "Debe ser mayor a 3" },
      max: { value: 9, message: "Debe ser menor o igual 9" },
    },
    edad_max: {
      required: { value: true, message: "This is required" },
      min: { value: 4, message: "Debe ser mayor a 3" },
      max: { value: 9, message: "Debe ser menor o igual 9" },
      validate: (value: string) => {
        if (value < watch("edad_min")) {
          return `El valor debe mayor o igual a ${watch("edad_min")}`;
        }
      },
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
    participantes_conquis_aventureros_m: {
      required: { value: true, message: "This is required" },
      min: {
        value: tipoCamporee === TypesSelectEnums.INTEGRADO ? 0 : 1,
        message:
          tipoCamporee === TypesSelectEnums.INTEGRADO
            ? "Debe ser mayor o igual a 0"
            : "Debe ser mayor a 0",
      },
    },
    participantes_guias_mayores_m: {
      required: { value: true, message: "This is required" },
      min: {
        value: tipoCamporee === TypesSelectEnums.INTEGRADO ? 0 : 1,
        message:
          tipoCamporee === TypesSelectEnums.INTEGRADO
            ? "Debe ser mayor o igual a 0"
            : "Debe ser mayor a 0",
      },
    },
    participantes_conquis_aventureros_f: {
      required: { value: true, message: "This is required" },
      min: {
        value: tipoCamporee === TypesSelectEnums.INTEGRADO ? 0 : 1,
        message:
          tipoCamporee === TypesSelectEnums.INTEGRADO
            ? "Debe ser mayor o igual a 0"
            : "Debe ser mayor a 0",
      },
    },
    participantes_guias_mayores_f: {
      required: { value: true, message: "This is required" },
      min: {
        value: tipoCamporee === TypesSelectEnums.INTEGRADO ? 0 : 1,
        message:
          tipoCamporee === TypesSelectEnums.INTEGRADO
            ? "Debe ser mayor o igual a 0"
            : "Debe ser mayor a 0",
      },

      // validate: () => {
      //   console.log("GUIAAAAA");
      // },
    },
    eliminatoria: {
      required: { value: true, message: "This is required" },
    },
    tipoEvento: {
      required: { value: true, message: "This is required" },
    },
    sexo: {
      required: { value: true, message: "This is required" },
    },
    participacion_total: {
      required: { value: true, message: "This is required" },
    },
  };

  const participants = (form: any) => {
    switch (tipoCamporee) {
      case TypesSelectEnums.CONQUISTADORES:
        if (watch("sexo")?.value === TypesSelectSexoEnums.HOMBRES) {
          return {
            participantes_conquis_aventureros_m: parseInt(
              form?.participantes_conquis_aventureros_m
            ),
          };
        } else if (watch("sexo")?.value === TypesSelectSexoEnums.MUJERES) {
          return {
            participantes_conquis_aventureros_f: parseInt(
              form?.participantes_conquis_aventureros_f
            ),
          };
        } else if (watch("sexo")?.value === TypesSelectSexoEnums.AMBOS) {
          return {
            participantes_conquis_aventureros_m: parseInt(
              form?.participantes_conquis_aventureros_m
            ),
            participantes_conquis_aventureros_f: parseInt(
              form?.participantes_conquis_aventureros_f
            ),
          };
        } else if (
          watch("sexo")?.value === TypesSelectSexoEnums.SIN_DISTINCION
        ) {
          return {
            participantes_conquis_aventureros_m: parseInt(
              form?.participantes_conquis_aventureros_m
            ),
          };
        }

        break;
      case TypesSelectEnums.GUIAS_MAYORES:
        if (watch("sexo")?.value === TypesSelectSexoEnums.HOMBRES) {
          return {
            participantes_guias_mayores_m: parseInt(
              form?.participantes_guias_mayores_m
            ),
          };
        } else if (watch("sexo")?.value === TypesSelectSexoEnums.MUJERES) {
          return {
            participantes_guias_mayores_f: parseInt(
              form?.participantes_guias_mayores_f
            ),
          };
        } else if (watch("sexo")?.value === TypesSelectSexoEnums.AMBOS) {
          return {
            participantes_guias_mayores_m: parseInt(
              form?.participantes_guias_mayores_m
            ),
            participantes_guias_mayores_f: parseInt(
              form?.participantes_guias_mayores_f
            ),
          };
        } else if (
          watch("sexo")?.value === TypesSelectSexoEnums.SIN_DISTINCION
        ) {
          return {
            participantes_guias_mayores_m: parseInt(
              form?.participantes_guias_mayores_m
            ),
          };
        }
        break;
      case TypesSelectEnums.INTEGRADO:
        if (watch("sexo")?.value === TypesSelectSexoEnums.HOMBRES) {
          return {
            participantes_conquis_aventureros_m: parseInt(
              form?.participantes_conquis_aventureros_m
            ),
            participantes_guias_mayores_m: parseInt(
              form?.participantes_guias_mayores_m
            ),
          };
        } else if (watch("sexo")?.value === TypesSelectSexoEnums.MUJERES) {
          return {
            participantes_conquis_aventureros_f: parseInt(
              form?.participantes_conquis_aventureros_f
            ),
            participantes_guias_mayores_f: parseInt(
              form?.participantes_guias_mayores_f
            ),
          };
        } else if (watch("sexo")?.value === TypesSelectSexoEnums.AMBOS) {
          return {
            participantes_conquis_aventureros_m: parseInt(
              form?.participantes_conquis_aventureros_m
            ),
            participantes_guias_mayores_m: parseInt(
              form?.participantes_guias_mayores_m
            ),
            participantes_conquis_aventureros_f: parseInt(
              form?.participantes_conquis_aventureros_f
            ),
            participantes_guias_mayores_f: parseInt(
              form?.participantes_guias_mayores_f
            ),
          };
        } else if (
          watch("sexo")?.value === TypesSelectSexoEnums.SIN_DISTINCION
        ) {
          return {
            participantes_conquis_aventureros_m: parseInt(
              form?.participantes_conquis_aventureros_m
            ),
            participantes_guias_mayores_m: parseInt(
              form?.participantes_guias_mayores_m
            ),
          };
        }
        break;
      case TypesSelectEnums.AVENTUREROS:
        if (watch("sexo")?.value === TypesSelectSexoEnums.HOMBRES) {
          return {
            participantes_conquis_aventureros_m: parseInt(
              form?.participantes_conquis_aventureros_m
            ),
            edad_min: form?.edad_min,
            edad_max: form?.edad_max,
          };
        } else if (watch("sexo")?.value === TypesSelectSexoEnums.MUJERES) {
          return {
            participantes_conquis_aventureros_f: parseInt(
              form?.participantes_conquis_aventureros_f
            ),
            edad_min: form?.edad_min,
            edad_max: form?.edad_max,
          };
        } else if (watch("sexo")?.value === TypesSelectSexoEnums.AMBOS) {
          return {
            participantes_conquis_aventureros_m: parseInt(
              form?.participantes_conquis_aventureros_m
            ),
            participantes_conquis_aventureros_f: parseInt(
              form?.participantes_conquis_aventureros_f
            ),
            edad_min: form?.edad_min,
            edad_max: form?.edad_max,
          };
        } else if (
          watch("sexo")?.value === TypesSelectSexoEnums.SIN_DISTINCION
        ) {
          return {
            participantes_conquis_aventureros_m: parseInt(
              form?.participantes_conquis_aventureros_m
            ),
            edad_min: form?.edad_min,
            edad_max: form?.edad_max,
          };
        }

        break;
    }
  };
  const handleSubmitData = (form: any) => {
    // const dateParticipants = participants(form);
    const dateParticipants =
      form?.participacion_total?.value === TypesSelectYesOrNot.NO ||
      form?.tipoEvento?.value === TypesSelectTypoEventoCamporeeEnums.FEDERACION
        ? participants(form)
        : {};
    const FinalData = {
      nombre: form?.name,
      descripcion: form.descripcion,
      ...dateParticipants,
      inscripcion_federacion:
        form?.tipoEvento?.value ===
        TypesSelectTypoEventoCamporeeEnums.FEDERACION
          ? true
          : false,
      eliminatoria:
        form?.eliminatoria?.value === TypesSelectYesOrNot.SI ? true : false,
      id_camporee: parseInt(idCamporee),
      oro: parseInt(form?.oro),
      plata: parseInt(form?.plata),
      bronce: parseInt(form?.bronce),
      hierro: parseInt(form?.hierro),
      categoria: form?.category?.value,
      puntuacion_maxima: parseInt(form?.puntuacion_maxima),
      distincion_sexo: form?.sexo?.value,
      participacion_total:
        form?.participacion_total?.value === TypesSelectYesOrNot.SI
          ? true
          : false,
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
  const handleChangeSelectPersona = (selected: any) => {
    setSelectValuePersona(selected);
  };
  const promiseOptionsPersona = (inputValue: any, callback: any) => {
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
              {console.log("aaaaaa", watch("category"))}
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
                // myDefaultValue={watch("category")}
                // myDefaultValue={
                //   !isNil(watch("category")) && {
                //     value: watch("category")?.value,
                //     text: watch("category")?.text,
                //     disabled: false,
                //     placeholder: false,
                //   }
                // }
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
            <div className={"relative py-2 w-full mb-3 md:mb-5"}>
              <p className={"ml-3 font-normal mb-2 block f-18"}>Oficial</p>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={promiseOptionsPersona}
                styles={customStyles}
                value={selectValuePersona}
                className={"text-sm"}
                onChange={handleChangeSelectPersona}
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
                // myDefaultValue={watch("tipoEvento")}
              />
              {watch("tipoEvento")?.value ===
                TypesSelectTypoEventoCamporeeEnums.CLUBES && (
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
                  // myDefaultValue={watch("eliminatoria")}
                />
              )}
            </div>

            <div className="flex-wrap lg:flex-nowrap flex gap-4 mt-6">
              {watch("tipoEvento")?.value !==
                TypesSelectTypoEventoCamporeeEnums.FEDERACION && (
                <InputListSearch
                  name="participacion_total"
                  title="¿Participación total?"
                  className="mb-4 h-10 rounded-full text-sm"
                  classNamesContainer="flex-1"
                  options={optionsTypeYesOrNot}
                  register={register}
                  rules={rules.participacion_total}
                  error={errors.participacion_total}
                  handleChange={(data: OptionType) =>
                    setValue("participacion_total", data, {
                      shouldValidate: true,
                    })
                  }
                  // myDefaultValue={watch("participacion_total")}
                />
              )}
              {(watch("participacion_total")?.value ===
                TypesSelectYesOrNot.NO ||
                watch("tipoEvento")?.value ===
                  TypesSelectTypoEventoCamporeeEnums.FEDERACION) && (
                <InputListSearch
                  name="sexo"
                  title="Distincion de sexo"
                  className="mb-4 h-10 rounded-full text-sm"
                  classNamesContainer="flex-1"
                  options={optionsTypeSexo}
                  register={register}
                  rules={rules.sexo}
                  error={errors.sexo}
                  handleChange={(data: OptionType) =>
                    setValue("sexo", data, { shouldValidate: true })
                  }
                  // myDefaultValue={watch("sexo")}
                />
              )}
            </div>
            {(watch("participacion_total")?.value === TypesSelectYesOrNot.NO ||
              watch("tipoEvento")?.value ===
                TypesSelectTypoEventoCamporeeEnums.FEDERACION) && (
              <div className="grid grid-cols-2 gap-2 mt-7">
                {(tipoCamporee === TypesSelectEnums.GUIAS_MAYORES ||
                  tipoCamporee === TypesSelectEnums.INTEGRADO) && (
                  <>
                    {(watch("sexo")?.value === TypesSelectSexoEnums.HOMBRES ||
                      watch("sexo")?.value === TypesSelectSexoEnums.AMBOS ||
                      watch("sexo")?.value ===
                        TypesSelectSexoEnums.SIN_DISTINCION) && (
                      <div className="col-span-1">
                        <Input
                          name="participantes_guias_mayores_m"
                          type="number"
                          title={
                            watch("sexo")?.value ===
                            TypesSelectSexoEnums.SIN_DISTINCION
                              ? "Nro guias mayores"
                              : "Hombres guias mayores"
                          }
                          labelVisible
                          isFill={!!watch("participantes_guias_mayores_m")}
                          register={register}
                          rules={rules.participantes_guias_mayores_m}
                          error={errors.participantes_guias_mayores_m}
                          className="mb-3 md:mb-5"
                          otherStyles="pt-3 pb-3 rounded-full text-sm"
                        />
                      </div>
                    )}
                    {(watch("sexo")?.value === TypesSelectSexoEnums.MUJERES ||
                      watch("sexo")?.value === TypesSelectSexoEnums.AMBOS) && (
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
                    )}
                  </>
                )}
                {(tipoCamporee === TypesSelectEnums.CONQUISTADORES ||
                  tipoCamporee === TypesSelectEnums.INTEGRADO) && (
                  <>
                    {(watch("sexo")?.value === TypesSelectSexoEnums.HOMBRES ||
                      watch("sexo")?.value === TypesSelectSexoEnums.AMBOS ||
                      watch("sexo")?.value ===
                        TypesSelectSexoEnums.SIN_DISTINCION) && (
                      <div className="col-span-1">
                        <Input
                          name="participantes_conquis_aventureros_m"
                          type="number"
                          title={
                            watch("sexo")?.value ===
                            TypesSelectSexoEnums.SIN_DISTINCION
                              ? "Nro conquistadores"
                              : "Hombres conquistadores"
                          }
                          labelVisible
                          isFill={
                            !!watch("participantes_conquis_aventureros_m")
                          }
                          register={register}
                          rules={rules.participantes_conquis_aventureros_m}
                          error={errors.participantes_conquis_aventureros_m}
                          className="mb-3 md:mb-5"
                          otherStyles="pt-3 pb-3 rounded-full text-sm"
                        />
                      </div>
                    )}

                    {(watch("sexo")?.value === TypesSelectSexoEnums.MUJERES ||
                      watch("sexo")?.value === TypesSelectSexoEnums.AMBOS) && (
                      <div className="col-span-1">
                        <Input
                          name="participantes_conquis_aventureros_f"
                          type="number"
                          title="Mujeres conquistadores"
                          labelVisible
                          isFill={
                            !!watch("participantes_conquis_aventureros_f")
                          }
                          register={register}
                          rules={rules.participantes_conquis_aventureros_f}
                          error={errors.participantes_conquis_aventureros_f}
                          className="mb-3 md:mb-5"
                          otherStyles="pt-3 pb-3 rounded-full text-sm"
                        />
                      </div>
                    )}
                  </>
                )}

                {tipoCamporee === TypesSelectEnums.AVENTUREROS && (
                  <>
                    {(watch("sexo")?.value === TypesSelectSexoEnums.HOMBRES ||
                      watch("sexo")?.value === TypesSelectSexoEnums.AMBOS ||
                      watch("sexo")?.value ===
                        TypesSelectSexoEnums.SIN_DISTINCION) && (
                      <div className="col-span-1">
                        <Input
                          name="participantes_conquis_aventureros_m"
                          type="number"
                          title={
                            watch("sexo")?.value ===
                            TypesSelectSexoEnums.SIN_DISTINCION
                              ? "Nro aventureros"
                              : "Niños aventureros"
                          }
                          labelVisible
                          isFill={
                            !!watch("participantes_conquis_aventureros_m")
                          }
                          register={register}
                          rules={rules.participantes_conquis_aventureros_m}
                          error={errors.participantes_conquis_aventureros_m}
                          className="mb-3 md:mb-5"
                          otherStyles="pt-3 pb-3 rounded-full text-sm"
                        />
                      </div>
                    )}

                    {(watch("sexo")?.value === TypesSelectSexoEnums.MUJERES ||
                      watch("sexo")?.value === TypesSelectSexoEnums.AMBOS) && (
                      <div className="col-span-1">
                        <Input
                          name="participantes_conquis_aventureros_f"
                          type="number"
                          title="Niñas aventureras"
                          labelVisible
                          isFill={
                            !!watch("participantes_conquis_aventureros_f")
                          }
                          register={register}
                          rules={rules.participantes_conquis_aventureros_f}
                          error={errors.participantes_conquis_aventureros_f}
                          className="mb-3 md:mb-5"
                          otherStyles="pt-3 pb-3 rounded-full text-sm"
                        />
                      </div>
                    )}

                    <div className="col-span-1">
                      <Input
                        name="edad_min"
                        type="number"
                        title="Edad mínima"
                        labelVisible
                        isFill={!!watch("edad_min")}
                        register={register}
                        rules={rules.edad_min}
                        error={errors.edad_min}
                        className="mb-3 md:mb-5"
                        otherStyles="pt-3 pb-3 rounded-full text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        name="edad_max"
                        type="number"
                        title="Edad máxima"
                        labelVisible
                        isFill={!!watch("edad_max")}
                        register={register}
                        rules={rules.edad_max}
                        error={errors.edad_max}
                        className="mb-3 md:mb-5"
                        otherStyles="pt-3 pb-3 rounded-full text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

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

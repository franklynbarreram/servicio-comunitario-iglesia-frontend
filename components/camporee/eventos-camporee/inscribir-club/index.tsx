import * as React from "react";
import AsyncSelect from "react-select/async";
import { useForm } from "react-hook-form";
import { Button } from "components/common/button/button";

import { Spinner } from "components/common/spinner/spinner";
import { useToasts } from "react-toast-notifications";
import { GenerateErrorToast } from "lib/helper";
import { isNil, isEmpty, get, merge } from "lodash";
import { customStyles } from "consts/stylesReactSelect.helper";
import { DirectorService } from "services/Director";
import { ClubesServices } from "services/Clubes";
import { PersonasServices } from "services";
import ItemIcon from "components/item-icon";
import { TypesSelectEnums, TypesSelectSexoEnums } from "consts/typesSelectEnum";
import { useQuery } from "react-query";
import { UseQueryEnums } from "consts/useQueryEnums";
import { useQueryParams } from "consts/query.helper";
import { CamporeeServices } from "services/Camporee";
type Params = {
  distincion_sexo?: string;
  tipo?: string;
};
const InscribirClub = ({ data, hide, refetch, isEdit }: any) => {
  const [
    selectValueConquistadoresHombres,
    setSelectValueConquistadoresHombres,
  ] = React.useState<{ value: Number; label: string } | any>();
  const [selectValueGuiasMayoresHombres, setSelectValueGuiasMayoresHombres] =
    React.useState<{ value: Number; label: string } | any>();
  const [
    selectValueConquistadoresMujeres,
    setSelectValueConquistadoresMujeres,
  ] = React.useState<{ value: Number; label: string } | any>();
  const [params, setParams] = useQueryParams<Params>({
    distincion_sexo: data?.distincion_sexo,
    tipo: data?.tipo,
  });
  const [selectValueGuiasMayoresMujeres, setSelectValueGuiasMayoresMujeres] =
    React.useState<{ value: Number; label: string } | any>();
  const {
    data: response,
    isLoading: isLoadingFetch,
    refetch: refetchMiembros,
  } = useQuery<any>([`${UseQueryEnums.GET_ALL_MIEMBROS}`], () =>
    ClubesServices.getAllMiembros(params)
  );

  const dataPersons = get(response, "data", []);

  const [isLoading, setIsLoading] = React.useState(false);
  // const [dataPersons, setDataPersons] = React.useState<any>();

  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm({ mode: "onChange" });

  const updateQuery = (key: string, value: number | string | undefined) => {
    setParams({ [key]: value });
  };

  React.useEffect(() => {
    if (isEdit) {
      const filterConquistadoresHombres =
        data?.datos_inscripcion[0]?.participantes?.filter(
          (item: any) => item.categoria === "conquistador" && item.sexo === "M"
        );
      const filterGuiasMayoresHombres =
        data?.datos_inscripcion[0]?.participantes?.filter(
          (item: any) => item.categoria === "guia_mayor" && item.sexo === "M"
        );
      const filterConquistadoresMujeres =
        data?.datos_inscripcion[0]?.participantes?.filter(
          (item: any) => item.categoria === "conquistador" && item.sexo === "F"
        );
      const filterGuiasMayoresMujeres =
        data?.datos_inscripcion[0]?.participantes?.filter(
          (item: any) => item.categoria === "guia_mayor" && item.sexo === "F"
        );

      setSelectValueConquistadoresHombres(
        filterConquistadoresHombres?.map((item: any) => {
          return {
            value: item.cedula,
            label: `${item.nombres} ${item.apellidos}`,
          };
        })
      );

      setSelectValueGuiasMayoresHombres(
        filterGuiasMayoresHombres?.map((item: any) => {
          return {
            value: item.cedula,
            label: `${item.nombres} ${item.apellidos}`,
          };
        })
      );

      setSelectValueConquistadoresMujeres(
        filterConquistadoresMujeres?.map((item: any) => {
          return {
            value: item.cedula,
            label: `${item.nombres} ${item.apellidos}`,
          };
        })
      );
      setSelectValueGuiasMayoresMujeres(
        filterGuiasMayoresMujeres?.map((item: any) => {
          return {
            value: item.cedula,
            label: `${item.nombres} ${item.apellidos}`,
          };
        })
      );
    }
  }, [isEdit]);

  const handleSubmitData = (form: any) => {
    // const FinalData = {
    //   nombre: data?.name,
    //   logo: imageUrl,
    //   lema: data.lema,
    //   direccion: data.direccion,
    //   blanco_estudios_biblicos: data.blanco_estudios,
    //   id_iglesia: selectValueIglesias?.value,
    //   cedula_director: selectValueConquistadoresHombres?.value,
    //   tipo: data.tipo.value,
    // };
    console.log("EU", selectValueConquistadoresHombres);
    // const FinalData = {
    //   ...selectValueConquistadoresHombres,
    //   ...selectValueConquistadoresMujeres,
    //   ...selectValueGuiasMayoresHombres,
    //   ...selectValueGuiasMayoresMujeres,
    // };

    // const FinalData = merge(

    // );

    let aux: any = [];

    const mergeData = aux.concat(
      selectValueConquistadoresHombres?.slice(),
      selectValueConquistadoresMujeres?.slice(),
      selectValueGuiasMayoresHombres?.slice(),
      selectValueGuiasMayoresMujeres?.slice()
    );

    const FilterValuesWithoutUndefined = mergeData.filter(
      (item: any) => !isNil(item) && item
    );
    const extractOnlyValues = FilterValuesWithoutUndefined.map(
      (item: any) => item.value
    );

    const FinalData = {
      id_camporee_evento: data?.id_camporee_evento,
      participantes: extractOnlyValues,
    };
    console.log("FinalData", extractOnlyValues);
    setIsLoading(true);

    CamporeeServices.inscribirClubToEventCamporee(FinalData)
      .then((response: any) => {
        addToast("Club inscrito exitosamente", {
          appearance: "success",
        });
        console.log("response inscribir club:", response);
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
  const handleChangeSelectConquistadoresHombres = (selected: any) => {
    console.log("selected", selected);
    setSelectValueConquistadoresHombres(selected);
  };

  const handleChangeSelectGuiasMayoresHombres = (selected: any) => {
    console.log("selected", selected);
    setSelectValueGuiasMayoresHombres(selected);
  };

  const handleChangeSelectConquistadoresMujeres = (selected: any) => {
    console.log("selected", selected);
    setSelectValueConquistadoresMujeres(selected);
  };

  const handleChangeSelectGuiasMayoresMujeres = (selected: any) => {
    console.log("selected", selected);
    setSelectValueGuiasMayoresMujeres(selected);
  };

  React.useEffect(() => {
    console.log("cambia", selectValueConquistadoresHombres);
  }, [selectValueConquistadoresHombres]);

  const promiseOptionsPersonsConquistadoresHombres = (
    inputValue: any,
    callback: any
  ) => {
    // if (!inputValue && !dataPersons) {
    if (!inputValue) {
      // return ClubesServices.getAllMiembros().then((response) => {
      // setDataPersons(response);
      const options = dataPersons?.conquistador?.M?.map((item: any) => {
        return {
          value: item.cedula,
          label: `${item.nombres} ${item.apellidos}`,
        };
      });
      return callback(options);
      // });
    } else {
      let filter = dataPersons?.conquistador?.M?.filter((item: any) =>
        item.nombres.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (isEmpty(filter) || isNil(filter)) {
        filter = dataPersons?.conquistador?.M?.filter((item: any) =>
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

  const promiseOptionsPersonsGuiasMayoresHombres = (
    inputValue: any,
    callback: any
  ) => {
    // if (!inputValue && !dataPersons) {
    if (!inputValue) {
      // return ClubesServices.getAllMiembros().then((response) => {
      // setDataPersons(response);
      const options = dataPersons?.guia_mayor?.M?.map((item: any) => {
        return {
          value: item.cedula,
          label: `${item.nombres} ${item.apellidos}`,
        };
      });
      return callback(options);
      // });
    } else {
      let filter = dataPersons?.guia_mayor?.M?.filter((item: any) =>
        item.nombres.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (isEmpty(filter) || isNil(filter)) {
        filter = dataPersons?.guia_mayor?.M?.filter((item: any) =>
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

  const promiseOptionsPersonsConquistadoresMujeres = (
    inputValue: any,
    callback: any
  ) => {
    // if (!inputValue && !dataPersons) {
    if (!inputValue) {
      // return ClubesServices.getAllMiembros().then((response) => {
      // setDataPersons(response);
      const options = dataPersons?.conquistador?.F?.map((item: any) => {
        return {
          value: item.cedula,
          label: `${item.nombres} ${item.apellidos}`,
        };
      });
      return callback(options);
      // });
    } else {
      let filter = dataPersons?.conquistador?.F?.filter((item: any) =>
        item.nombres.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (isEmpty(filter) || isNil(filter)) {
        filter = dataPersons?.conquistador?.F?.filter((item: any) =>
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

  const promiseOptionsPersonsGuiasMayoresMujeres = (
    inputValue: any,
    callback: any
  ) => {
    // if (!inputValue && !dataPersons) {
    if (!inputValue) {
      // return ClubesServices.getAllMiembros().then((response) => {
      // setDataPersons(response);
      const options = dataPersons?.guia_mayor?.F?.map((item: any) => {
        return {
          value: item.cedula,
          label: `${item.nombres} ${item.apellidos}`,
        };
      });
      return callback(options);
      // });
    } else {
      let filter = dataPersons?.guia_mayor?.F?.filter((item: any) =>
        item.nombres.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (isEmpty(filter) || isNil(filter)) {
        filter = dataPersons?.guia_mayor?.F?.filter((item: any) =>
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
  const lengthParticipans = (data: any) => {
    return data ? data.length : 0;
  };

  const isThisSexo = (sexo: string) => {
    return data?.distincion_sexo === sexo;
  };

  console.log("principaal", data);

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold">Inscribir Club</h2>
      <div className="requires flex flex-col justify-start text-left mt-10">
        <p className="ml-3 font-bold">Cantidades requeridas:</p>
        {(data?.tipo === TypesSelectEnums.CONQUISTADORES ||
          data?.tipo === TypesSelectEnums.INTEGRADO) && (
          <>
            {(isThisSexo(TypesSelectSexoEnums.HOMBRES) ||
              isThisSexo(TypesSelectSexoEnums.AMBOS) ||
              isThisSexo(TypesSelectSexoEnums.SIN_DISTINCION)) &&
            data.participantes_conquistadores_m -
              lengthParticipans(selectValueConquistadoresHombres) >
              0 ? (
              <span className="text-base ml-5">
                {isThisSexo(TypesSelectSexoEnums.SIN_DISTINCION)
                  ? "- Conquistadores"
                  : "- Hombres conquistadores: "}
                {data.participantes_conquistadores_m -
                  lengthParticipans(selectValueConquistadoresHombres)}
              </span>
            ) : (
              data.participantes_conquistadores_m -
                lengthParticipans(selectValueConquistadoresHombres) <
                0 && (
                <span className="text-base ml-5 text-alert-error">
                  {isThisSexo(TypesSelectSexoEnums.SIN_DISTINCION)
                    ? "- Conquistadores de más"
                    : "- Hombres conquistadores de más: "}
                  {Math.abs(
                    data.participantes_conquistadores_m -
                      lengthParticipans(selectValueConquistadoresHombres)
                  )}
                </span>
              )
            )}
            {(isThisSexo(TypesSelectSexoEnums.MUJERES) ||
              isThisSexo(TypesSelectSexoEnums.AMBOS)) &&
            data.participantes_conquistadores_f -
              lengthParticipans(selectValueConquistadoresMujeres) >
              0 ? (
              <span className="text-base ml-5">
                - Mujeres conquistadores:{" "}
                {data.participantes_conquistadores_f -
                  lengthParticipans(selectValueConquistadoresMujeres)}
              </span>
            ) : (
              data.participantes_conquistadores_f -
                lengthParticipans(selectValueConquistadoresMujeres) <
                0 && (
                <span className="text-base ml-5 text-alert-error">
                  - Mujeres conquistadores:{" "}
                  {Math.abs(
                    data.participantes_conquistadores_f -
                      lengthParticipans(selectValueConquistadoresMujeres)
                  )}
                </span>
              )
            )}
          </>
        )}
      </div>
      <div className="container-form mt-5 text-left">
        {isLoading || isLoadingFetch ? (
          <Spinner type="loadingPage" className="py-10" />
        ) : (
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className={"relative py-2 w-full mb-3 md:mb-5"}>
              {(data?.tipo === TypesSelectEnums.CONQUISTADORES ||
                data?.tipo === TypesSelectEnums.INTEGRADO) && (
                <>
                  <div className="mb-10 mt-5">
                    {(isThisSexo(TypesSelectSexoEnums.HOMBRES) ||
                      isThisSexo(TypesSelectSexoEnums.AMBOS) ||
                      isThisSexo(TypesSelectSexoEnums.SIN_DISTINCION)) && (
                      <>
                        <p className={"ml-3 font-normal mb-2 block f-18"}>
                          {isThisSexo(TypesSelectSexoEnums.SIN_DISTINCION)
                            ? "Nro conquistadores"
                            : "Hombres conquistadores"}
                        </p>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={
                            promiseOptionsPersonsConquistadoresHombres
                          }
                          styles={customStyles}
                          value={selectValueConquistadoresHombres}
                          className={"text-sm"}
                          onChange={handleChangeSelectConquistadoresHombres}
                          isMulti
                          // isOptionDisabled={() =>
                          //   selectValueConquistadoresHombres &&
                          //   selectValueConquistadoresHombres?.length >=
                          //     data?.participantes_conquistadores_m
                          // }
                        />
                      </>
                    )}
                  </div>
                  <div className="mb-10">
                    {(isThisSexo(TypesSelectSexoEnums.MUJERES) ||
                      isThisSexo(TypesSelectSexoEnums.AMBOS) ||
                      isThisSexo(TypesSelectSexoEnums.SIN_DISTINCION)) && (
                      <>
                        <p className={"ml-3 font-normal mb-2 block f-18"}>
                          Mujeres conquistadores
                        </p>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={
                            promiseOptionsPersonsConquistadoresMujeres
                          }
                          styles={customStyles}
                          value={selectValueConquistadoresMujeres}
                          className={"text-sm"}
                          onChange={handleChangeSelectConquistadoresMujeres}
                          isMulti
                          // isOptionDisabled={() =>
                          //   selectValueConquistadoresMujeres &&
                          //   selectValueConquistadoresMujeres?.length >=
                          //     data?.participantes_conquistadores_f
                          // }
                        />
                      </>
                    )}
                  </div>
                </>
              )}

              {(data?.tipo === TypesSelectEnums.GUIAS_MAYORES ||
                data?.tipo === TypesSelectEnums.INTEGRADO) && (
                <>
                  <div className="mb-10 mt-5">
                    {(isThisSexo(TypesSelectSexoEnums.HOMBRES) ||
                      isThisSexo(TypesSelectSexoEnums.AMBOS) ||
                      isThisSexo(TypesSelectSexoEnums.SIN_DISTINCION)) && (
                      <>
                        <p className={"ml-3 font-normal mb-2 block f-18"}>
                          {isThisSexo(TypesSelectSexoEnums.SIN_DISTINCION)
                            ? "Nro guias mayores"
                            : "Hombres guias mayores"}
                        </p>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={promiseOptionsPersonsGuiasMayoresHombres}
                          styles={customStyles}
                          value={selectValueGuiasMayoresHombres}
                          className={"text-sm"}
                          onChange={handleChangeSelectGuiasMayoresHombres}
                          isMulti
                          // isOptionDisabled={() =>
                          //   selectValueConquistadoresHombres &&
                          //   selectValueConquistadoresHombres?.length >=
                          //     data?.participantes_conquistadores_m
                          // }
                        />
                      </>
                    )}
                  </div>
                  <div className="mb-10">
                    {(isThisSexo(TypesSelectSexoEnums.MUJERES) ||
                      isThisSexo(TypesSelectSexoEnums.AMBOS) ||
                      isThisSexo(TypesSelectSexoEnums.SIN_DISTINCION)) && (
                      <>
                        <p className={"ml-3 font-normal mb-2 block f-18"}>
                          Mujeres guias mayores
                        </p>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={promiseOptionsPersonsGuiasMayoresMujeres}
                          styles={customStyles}
                          value={selectValueGuiasMayoresMujeres}
                          className={"text-sm"}
                          onChange={handleChangeSelectGuiasMayoresMujeres}
                          isMulti
                          // isOptionDisabled={() =>
                          //   selectValueConquistadoresMujeres &&
                          //   selectValueConquistadoresMujeres?.length >=
                          //     data?.participantes_conquistadores_f
                          // }
                        />
                      </>
                    )}
                  </div>
                </>
              )}
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
                label={isEdit ? "Guardar" : "Inscribir"}
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
                //   isEmpty(selectValueConquistadoresHombres?.label) ||
                //   isNil(selectValueConquistadoresHombres?.label) ||
                //   isNil(selectValueConquistadoresHombres) ||
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

export default InscribirClub;

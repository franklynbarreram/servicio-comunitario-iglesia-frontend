import { LayoutDashboard } from "components/layout";
import { useModal } from "hooks/modal";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { UseQueryEnums } from "consts/useQueryEnums";
import { useQuery } from "react-query";
import { Spinner } from "components/common/spinner/spinner";
import { useQueryParams } from "consts/query.helper";
import { get, isNil, isEmpty } from "lodash";
import { Subject } from "rxjs";
import { CamporeeServices } from "services/Camporee";
import { PermissionsEnums } from "consts/permissionsEnum";
import { ModuleEnums } from "consts/modulesEmuns";
import {
  GenerateErrorToast,
  routeValidForUser,
  ValidateString,
} from "lib/helper";
import { ProfilApiService } from "services";
import Restricted from "context/PermissionProvider/Restricted";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Typography } from "components/common/typography";
import { InformeForm } from "components/events/precamporee/form-informe";
import { Button } from "components/common/button";
import { useUser } from "hooks/user";
import { RoleEnums } from "consts/rolesEnum";
import Back from "components/common/back";
import { Table, Tabs } from "antd";
import {
  TypesSelectEnums,
  TypesSelectSexoEnums,
  TypesSelectTypoEventoCamporeeEnums,
} from "consts/typesSelectEnum";
import InscribirEntidad from "components/camporee/eventos-camporee/inscribir-entidad";
import { Collapse } from "antd";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  SaveIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { Alert } from "components/common/alert";
import { Input } from "components/common/form/input";
import { InputCheck } from "components/common/form/input-check";
import { useToasts } from "react-toast-notifications";
import { Icon } from "components/icon";
import { Icons } from "consts";
import { InputText } from "components/common/form/input-text";
import { SelectInput } from "components/common/form/select/SelectInput";
import { CategoryTypeMap } from "consts/categoryEnumSelect";
import { Progress } from "antd";
import { start } from "repl";
const { Panel } = Collapse;
const { TabPane } = Tabs;

type Params = {
  idCamporee: any;
  categoria: any;
  id_club: any;
};

const classNamesForms = "w-full px-4 md:w-[550px] mx-auto md:mt-8";

const ResultadosCamporee = ({ idCamporee, className }: any) => {
  const { Modal, hide, isShow, show } = useModal();
  const router = useRouter();

  const {
    Modal: ModalInscription,
    hide: hideInscription,
    isShow: isShowInscription,
    show: showInscription,
  } = useModal();
  const { addToast } = useToasts();

  const profile = useUser();

  const dataUser = get(profile, "data", []);
  const [onSearch, setOnSearch] = React.useState(false);
  const [clubesType, setClubesType] = React.useState<any>({});
  const [clubesTypeMap, setClubesTypeMap] = React.useState<any>({});
  const [isEdit, setIsEdit] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subject, setSubject] = React.useState(new Subject<string>());
  const [params, setValue] = useQueryParams<Params>({ idCamporee });
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery<any>(
    [`${UseQueryEnums.GET_ALL_INFORMES_CAMPOREE}_${idCamporee}`, params],
    () => CamporeeServices.getAllResultados(params)
  );

  const {
    data: clubesFilter,
    isLoading: isLoadingClubesFilter,
    refetch: refetchClubesFilter,
  } = useQuery<any>(
    [`${UseQueryEnums.GET_ALL_CLUBES_TYPE}_${idCamporee}`],
    () => CamporeeServices.getAllClubesType(idCamporee)
  );

  const values = get(response, "data", []);
  console.log("all reportes", values);
  console.log("all clubes type", clubesFilter);
  const [tabs, setTabs] = React.useState<any>();
  const updateQuery = (key: string, value: number | string | undefined) => {
    setValue({ [key]: value });
  };

  React.useEffect(() => {
    if (!isLoadingClubesFilter) {
      // setClubesType(clubesFilter?.data.map((item: any) => item.id));
      const aux: any = {};

      clubesFilter.data.map((item: any) => {
        aux[item.id] = item.nombre;
      });
      setClubesTypeMap(aux);
    }
  }, [clubesFilter]);

  const findInforme = (mes: string) => {
    if (!isEmpty(response?.data?.informes)) {
      const informe = response?.data?.informes[0]?.informes?.find(
        (item: any) => item.mes === mes
      );

      // console.log("el informe", informe);
      return informe;
    }
  };

  // React.useEffect(() => {
  //   if (!isNil(response) && response?.data?.meses) {
  //     const aux: any = [];
  //     response?.data?.meses?.forEach((item: any, index: number) => {
  //       const informe = findInforme(item.value);
  //       console.log("el infomre lleg", informe);
  //       aux.push({
  //         name: item.mes,
  //         component: (
  //           <InformeForm
  //             refetch={refetch}
  //             informe={informe ? informe : null}
  //             isAvailable={item?.activo}
  //             idPrecamporee={id}
  //             isRecurrent
  //             mes={item.value}
  //             className={classNamesForms}
  //           />
  //         ),
  //         current: index === 0 ? true : false,
  //       });
  //     });
  //     setTabs([...aux]);
  //   }
  // }, [response]);

  const {
    register,
    handleSubmit,
    setValue: setValueForm,
    control,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });
  const rules = {
    puntuacion: {
      // required: { value: true, message: "This is required" },
      max: {
        value: values?.puntuacion_maxima,
        message: `Debe ser menor o igual a ${values?.puntuacion_maxima}`,
      },
    },
    clasificado: {
      // required: { value: true, message: "This is required" },
    },
  };

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "puntuacion", // unique name for your Field Array
    }
  );

  const handleShowInscription = (isEdit?: boolean) => {
    // setDataApprove(id);
    if (isEdit) setIsEdit(true);
    showInscription();
  };

  const callback = (key: any) => {
    console.log(key);
  };
  console.log("los value resultados camporee by id", values);

  const getPuntuacion = (item: any) => {
    if (dataUser.scope_actual === RoleEnums.PRESIDENTE_CONSEJO) {
      return item.puntuacion_eliminatoria;
    } else if (dataUser.scope_actual === RoleEnums.LIDER_JUVENIL) {
      return item.puntuacion_eliminatoria;
    }
  };

  const handleSubmitData = (data: any) => {
    console.log("data puntuacion", data);

    let finalData: any = [];

    let clasificadoIdEntidad = data.clasificado.map((item: any, index: any) => {
      if (Boolean(item)) {
        return values?.datos_inscripcion[index]?.id_entidad;
      }
    });
    //Eliminar vacios, undefined y null
    clasificadoIdEntidad = clasificadoIdEntidad.filter((item: any) => item);
    let puntuacionIdEntidad = data.puntuacion.map((item: any, index: any) => {
      if (!isEmpty(item)) {
        return values?.datos_inscripcion[index]?.id_entidad;
      }
    });

    //Eliminar vacios, undefined y null
    puntuacionIdEntidad = puntuacionIdEntidad.filter((item: any) => item);
    let puntuacionParseInt = data?.puntuacion?.map((item: any) => {
      if (!isEmpty(item)) {
        return parseInt(item);
      }
    });
    //Eliminar vacios, undefined y null
    puntuacionParseInt = puntuacionParseInt.filter((item: any) => item);

    let FinalData: any = {};
    let Fetch: any = Promise;

    if (dataUser.scope_actual === RoleEnums.PRESIDENTE_CONSEJO) {
      FinalData = {
        puntuacion: [...puntuacionParseInt],
        id_clubes: [...puntuacionIdEntidad],
        clasificados: [...clasificadoIdEntidad],
        id_camporee_evento: parseInt(id as any),
      };
      Fetch = CamporeeServices.LoadScoreCamporeeEventClub(FinalData);
    } else if (dataUser.scope_actual === RoleEnums.LIDER_JUVENIL) {
      FinalData = {
        puntuacion: [...puntuacionParseInt],
        id_entidad: [...puntuacionIdEntidad],
        id_camporee_evento: parseInt(id as any),
      };
      Fetch = CamporeeServices.LoadScoreCamporeeEvent(FinalData);
    }

    console.log("final data", FinalData);
    Fetch.then((response: any) => {
      addToast("Datos cargados exitosamente", {
        appearance: "success",
      });
      console.log("response puntuacion y clasificacion:", response);
      refetch();
      hide();
      // setIsLoading(false);
    }).catch((e: any) => {
      console.log("Error: ", e);
      GenerateErrorToast(e, addToast);
      // setIsLoading(false);
    });
  };

  const isPermitted = () => {
    if (
      values?.calificable &&
      dataUser.scope_actual === RoleEnums.PRESIDENTE_CONSEJO &&
      !values?.inscripcion_federacion
    ) {
      return true;
    } else if (
      values?.calificable &&
      dataUser.scope_actual !== RoleEnums.PRESIDENTE_CONSEJO
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleChangeSearch = (e: any) => {
    const value = e.target.value;
    setOnSearch(true);
    return subject.next(value);
  };

  const howManyStarts = (text: string) => {
    const start = text.split(" ");
    return parseInt(start[0]);
  };

  const paintStarts = (text: string) => {
    const quantityStarts = howManyStarts(text);
    for (let i = 0; i < 5; i++) {
      <StarIcon
        className={clsx("w-5", { "opacity-50": i > quantityStarts })}
      ></StarIcon>;
    }
  };

  const columns = [
    {
      title: "Club",
      dataIndex: "nombre",
      key: "id",
    },
    // Table.EXPAND_COLUMN,
    {
      title: "Level",
      dataIndex: "",
      key: "",
      // width: "30%",
      render: (values: any) => (
        <div className="flex gap-1 items-center">
          {(() => {
            const quantityStarts = howManyStarts(values.level);
            let starts: any = [];
            for (let i = 0; i < 5; i++) {
              starts.push(
                <StarIcon
                  className={clsx("w-5", { "opacity-50": i > quantityStarts })}
                ></StarIcon>
              );
            }
            return starts;
          })()}
        </div>
      ),
    },
    {
      title: "Puntuación porcentual",
      dataIndex: "",
      key: "",
      // width: "30%",
      render: (values: any) => (
        <Progress size="small" percent={values?.puntuacion_porcentual} />
      ),
    },
  ];

  const columnsMiembros = [
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
    },
    {
      title: "Level",
      dataIndex: "",
      key: "",
      // width: "30%",
      render: (values: any) => (
        <div className="flex gap-1 items-center">
          {(() => {
            const quantityStarts = howManyStarts(values.level);
            let starts: any = [];
            for (let i = 0; i < 5; i++) {
              starts.push(
                <StarIcon
                  className={clsx("w-5", { "opacity-50": i > quantityStarts })}
                ></StarIcon>
              );
            }
            return starts;
          })()}
        </div>
      ),
    },
    {
      title: "Puntuación porcentual",
      dataIndex: "",
      key: "",
      // width: "30%",
      render: (values: any) => (
        <Progress size="small" percent={values?.puntuacion_porcentual} />
      ),
    },
  ];

  const expandedTableItems = (allData: any) => {
    return (
      <Table
        columns={columnsMiembros}
        dataSource={allData.items}
        pagination={false}
        rowKey="items"
        expandable={{
          expandedRowRender: (record) => {
            if (record?.items) {
              console.log("record", record);
              return expandedTableItems(record);
            }
          },
          rowExpandable: (record) => record.items,
        }}
      />
    );
  };

  return (
    <>
      <div className="text-center w-full">
        <div className={clsx("container-form mt-5 mb-40 text-left", className)}>
          {isLoading && !onSearch ? (
            <Spinner type="loadingPage" className="py-10" />
          ) : (
            <>
              <form
                className="w-full text-left"
                onSubmit={handleSubmit(handleSubmitData)}
              >
                <div className="flex justify-center items-center mb-5">
                  <InputText
                    name="search"
                    title="Search"
                    labelVisible={false}
                    isFill={!!watch("search")}
                    register={register}
                    // rules={rules.search}
                    onChangeCustom={handleChangeSearch}
                    error={errors.search}
                    leftImg={Icons.search}
                    otherStyles="pt-3 pb-3 rounded-full"
                  />
                  {/* {data?.data?.modificacion && (
                    <Restricted
                      module={ModuleEnums.EVENTO_PRECAMPOREE}
                      typePermisse={PermissionsEnums.ADD}
                    > */}
                  <div className="px-2" onClick={() => {}}>
                    <Icon
                      src={Icons.more}
                      fill="var(--color-primary)"
                      className="max-w-[50px] w-12 cursor-pointer"
                    />
                  </div>
                  {/* </Restricted>
                  )} */}
                </div>
              </form>
              <div className="flex gap-4 w-full">
                <SelectInput
                  className="mb-10 z-50 flex-auto"
                  name="categoria"
                  label="Categoria"
                  options={CategoryTypeMap}
                  maxwidth="max-w-[208px]"
                  value={params.categoria}
                  setValue={updateQuery}
                ></SelectInput>
                <SelectInput
                  className="mb-10 z-50 flex-auto"
                  name="id_club"
                  label="Club"
                  options={clubesTypeMap}
                  maxwidth="max-w-[208px]"
                  value={params.id_club}
                  setValue={updateQuery}
                ></SelectInput>
              </div>
              <Table
                columns={columns}
                dataSource={values?.entidades}
                pagination={false}
                rowKey="id_club"
                className="table_club_miembros table_ant_custom shadow-md overflow-x-auto border-b border-gray-200 rounded-lg"
                expandable={{
                  expandedRowRender: (record) => {
                    if (record?.items) {
                      console.log("record", record);
                      return expandedTableItems(record);
                    }
                  },
                  rowExpandable: (record) => record.items,
                }}
                // expandable={{
                //   expandedRowRender: expandedTableMiembros,
                // }}
                // expandIcon={({ expanded, onExpand, record }) =>
                //   expanded ? (
                //     <div
                //       className="h-full flex items-center justify-center cursor-pointer"
                //       onClick={(e) => onExpand(record, e)}
                //     >
                //       <MinusIcon className="h-5 w-5 text-blue-500 flex items-center" />
                //     </div>
                //   ) : (
                //     <div
                //       className="h-full flex items-center justify-center cursor-pointer"
                //       onClick={(e) => onExpand(record, e)}
                //     >
                //       <PlusIcon className="h-5 w-5 text-blue-500 flex items-center" />
                //     </div>
                //   )
                // }
              />
              {/* {!isEmpty(allPrecamporee) && !isLoading ? (
                <div className="mt-10 justify-center flex">
                  <Pagination
                    currentPage={parseInt(currentPage)}
                    total={parseInt(total)}
                    limit={parseInt(limit)}
                    setPage={(value) => updateQuery("page", value)}
                  />
                </div>
              ) : (
                <div className="flex justify-center">
                  <h3 className="font-medium text-primary text-xl mt-9">
                    Empty data
                  </h3>
                </div>
              )} */}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default ResultadosCamporee;

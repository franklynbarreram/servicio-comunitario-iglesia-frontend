import { LayoutDashboard } from "components/layout";
import { Images } from "consts";
import { useQueryParams } from "consts/query.helper";
import { UseQueryEnums } from "consts/useQueryEnums";
import { useUser } from "hooks/user";
import { get, isEmpty } from "lodash";
import moment from "moment";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";
import { useQuery } from "react-query";
import { InformesMensualesService } from "services/InformesMensuales";
import { Collapse } from "antd";
import {
  ArrowRightIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";
import { Typography } from "components/common/typography";
import { routeValidForUser, ValidateString } from "lib/helper";
import { Tabs } from "antd";
import { RoleEnums } from "consts/rolesEnum";
import { ActividadForm } from "components/informes-mensuales/form-actividad";
import { Button } from "components/common/button";
import { useModal } from "hooks/modal";
import {
  TypesSelectCamporeeEnums,
  TypesSelectEnums,
  TypesSelectMap,
} from "consts/typesSelectEnum";
import { InformeForm } from "components/informes-mensuales/form-informe";
import { Spinner } from "components/common/spinner/spinner";
import ApproveInforme from "components/informes-mensuales/approve-informe";
import Restricted from "context/PermissionProvider/Restricted";
import { ModuleEnums } from "consts/modulesEmuns";
import { PermissionsEnums } from "consts/permissionsEnum";
import { ProfilApiService } from "services";
import { SelectInput } from "components/common/form/select/SelectInput";
import { DatePickerCustom } from "components/common/date-picker-select/datePicker";
import LoadScore from "components/informes-mensuales/load-score";
import { Alert } from "components/common/alert";
import ViewClub from "components/administrar/clubes/view";
import { Help } from "components/common/help";
import { HelpListInformesMensuales } from "help/informes-mensuales/listado";
import { HelpFormInformesMensuales } from "help/informes-mensuales/form";
const { Panel } = Collapse;
const { TabPane } = Tabs;

type Params = {
  fecha?: any;
  tipo?: any;
};
const format_date = "YYYY-MM-DD";

const Dashboard = () => {
  const profile = useUser();
  const dataUser = get(profile, "data", []);
  const [dataApprove, setDataApprove] = React.useState<any>();
  const [dataLoadScore, setDataLoadScore] = React.useState<any>();
  const [dataView, setDataView] = React.useState<any>();
  const [params, setValue] = useQueryParams<Params>({
    tipo: TypesSelectEnums.CONQUISTADORES,
  });
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery<any>(
    [UseQueryEnums.GET_ALL_INFORMES_MENSUALES_BY_DATE, params],
    () => InformesMensualesService.getAll(params)
  );

  React.useEffect(() => {
    setValue({
      fecha: moment(new Date()).format(format_date),
    });
  }, []);

  const {
    Modal: ModalView,
    hide: hideView,
    isShow: isShowView,
    show: showView,
  } = useModal();
  const {
    Modal: ModalHelp,
    hide: hideHelp,
    isShow: isShowHelp,
    show: showHelp,
  } = useModal();
  const {
    Modal: ModalCreateActivity,
    hide: hideCreateActivity,
    isShow: isShowCreateActivity,
    show: showCreateActivity,
  } = useModal();

  const {
    Modal: ModalLoadScore,
    hide: hideLoadScore,
    isShow: isShowLoadScore,
    show: showLoadScore,
  } = useModal();

  const {
    Modal: ModalApprove,
    hide: hideApprove,
    isShow: isShowApprove,
    show: showApprove,
  } = useModal();

  const callback = (key: any) => {
    console.log(key);
  };
  const handleShowApprove = (id: any) => {
    setDataApprove(id);
    showApprove();
  };
  const updateQuery = (key: string, value: number | string | undefined) => {
    console.log("newww:", key, value);
    setValue({ [key]: value });
  };

  const handleShowLoadScore = (data: any) => {
    setDataLoadScore(data);
    showLoadScore();
  };

  const handleOnView = (selected: any) => {
    setDataView(selected);
    showView();
  };

  const values = get(response, "data", []);
  console.log("infoooormeees", values);

  console.log("user", dataUser);

  return (
    <LayoutDashboard title="Informes Mensuales">
      {isLoading ? (
        <Spinner type="loadingPage" className="py-10" />
      ) : (
        <>
          <div className="py-4">
            <Help showModal={showHelp} />
            <div className="flex flex-col justify-center">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-x-4 mt-10">
                <div className="col-span-1">
                  <SelectInput
                    className="mb-10 z-50 flex-auto"
                    name="tipo"
                    label="Tipo"
                    options={TypesSelectMap}
                    maxwidth="max-w-[208px]"
                    value={params.tipo}
                    setValue={updateQuery}
                    hideDeleteSelected
                  ></SelectInput>
                </div>
                <div className="col-span-1">
                  <DatePickerCustom
                    name="fecha"
                    label={"Fecha"}
                    value={params.fecha}
                    setValue={updateQuery}
                    hideDeleteDate
                    hideLabelTitle
                  />
                </div>
              </div>

              {isEmpty(values) ? (
                <>
                  <Restricted
                    module={ModuleEnums.INFORMES_MENSUALES}
                    typePermisse={PermissionsEnums.LOAD_FORMS}
                  >
                    {response?.editar && (
                      <div className="flex justify-end">
                        <Button
                          className="bg-primary max-w-[200px] border-[black] hover:bg-transparent hover:text-alert-success hover:border-alert-success"
                          labelProps="f-18 font-normal"
                          label={"+ Crear actividad"}
                          fill
                          boderRadius="rounded-full"
                          size="full"
                          type="submit"
                          sizesButton="py-3"
                          onClick={showCreateActivity}
                        />
                      </div>
                    )}
                  </Restricted>
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 mt-20">
                    No hay datos para mostrar
                  </h2>
                </>
              ) : (
                <Collapse
                  defaultActiveKey={["1"]}
                  onChange={callback}
                  className="w-full custom-collapse mt-0"
                  collapsible="header"
                  expandIcon={({ isActive }) => (
                    <>
                      <ArrowRightIcon
                        className={clsx(
                          "w-10 h-10 absolute top-0 left-5 bottom-0 m-auto",
                          {
                            "rotate-90": isActive,
                          }
                        )}
                      />
                    </>
                  )}
                >
                  {values?.map((itemClub: any, index: any) => {
                    return (
                      <React.Fragment key={index}>
                        <Panel
                          header={
                            <div className="item bg-yellow flex text-center justify-center w-full">
                              <Typography
                                type="label"
                                className={clsx(
                                  "font-bold block text-primary text-3xl px-2 py-3 cursor-pointer"
                                )}
                              >
                                {itemClub?.club}
                              </Typography>
                            </div>
                          }
                          key={index}
                          extra={
                            <>
                              <PlusCircleIcon
                                onClick={() => handleOnView(itemClub?.detalle)}
                                className={clsx(
                                  "w-12 h-12 absolute top-0 right-5 bottom-0 m-auto cursor-pointer"
                                )}
                              />
                            </>
                          }
                          className="custom-collapse-header justify-normal"
                        >
                          <div className="flex gap-2 flex-wrap">
                            {itemClub?.informe?.puntuacion && (
                              <Alert
                                className="mb-5 bg-alert-success rounded-xl"
                                hideIcon
                              >
                                <p className="text-[white] text-base py-5">
                                  Puntuación:{"  "}
                                  <span className="bg-white text-[black] rounded-lg px-2 py-2 text-center">
                                    {itemClub?.informe?.puntuacion}/
                                    {itemClub?.informe?.puntuacion_maxima}
                                  </span>
                                </p>
                              </Alert>
                            )}
                            <Alert
                              className="mb-5 bg-primary rounded-xl"
                              hideIcon
                            >
                              <p className="text-[white] text-base py-5">
                                Firma Anciano:{"  "}
                                <span className="bg-white text-[black] rounded-lg px-2 py-2 text-center">
                                  {itemClub?.informe?.firma_anciano ? (
                                    <span className="text-secondary font-bold">
                                      SI
                                    </span>
                                  ) : (
                                    <span className="text-alert-error font-bold">
                                      NO
                                    </span>
                                  )}
                                </span>
                              </p>
                            </Alert>
                            <Alert
                              className="mb-5 bg-secondary rounded-xl"
                              hideIcon
                            >
                              <p className="text-[white] text-base py-5">
                                Firma Pastor:{"  "}
                                <span className="bg-white text-[black] rounded-lg px-2 py-2 text-center">
                                  {itemClub?.informe?.firma_pastor ? (
                                    <span className="text-secondary font-bold">
                                      SI
                                    </span>
                                  ) : (
                                    <span className="text-alert-error font-bold">
                                      NO
                                    </span>
                                  )}
                                </span>
                              </p>
                            </Alert>
                            <Alert
                              className="mb-5 bg-overlay rounded-xl"
                              hideIcon
                            >
                              <p className="text-[white] text-base py-5">
                                Firma Consejo Regional:{"  "}
                                <span className="bg-white text-[black] rounded-lg px-2 py-2 text-center">
                                  {itemClub?.informe?.firma_consejo_regional ? (
                                    <span className="text-secondary font-bold">
                                      SI
                                    </span>
                                  ) : (
                                    <span className="text-alert-error font-bold">
                                      NO
                                    </span>
                                  )}
                                </span>
                              </p>
                            </Alert>
                          </div>

                          {itemClub?.informe?.observacion && (
                            <Alert className=" bg-[#ffc107] rounded-xl mb-10">
                              <p className="text-[black] text-base py-5">
                                Observación:{" "}
                                <span className="bg-white text-[black] rounded-lg px-2 py-2 text-center">
                                  {itemClub?.informe?.observacion}
                                </span>
                              </p>
                            </Alert>
                          )}

                          <Restricted
                            module={ModuleEnums.INFORMES_MENSUALES}
                            typePermisse={PermissionsEnums.LOAD_FORMS}
                          >
                            <div className="my-10">
                              <div className="max-w-[600px] mx-auto">
                                <InformeForm
                                  refetch={refetch}
                                  className="shadow-lg"
                                  data={itemClub?.informe}
                                  isEditable={itemClub.informe?.editar}
                                />
                              </div>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 mt-20">
                              Actividades
                            </h2>
                            {itemClub?.informe?.editar && (
                              <div className="flex justify-end">
                                <Button
                                  className="bg-primary max-w-[200px] border-[black] hover:bg-transparent hover:text-alert-success hover:border-alert-success"
                                  labelProps="f-18 font-normal"
                                  label={"+ Crear actividad"}
                                  fill
                                  boderRadius="rounded-full"
                                  size="full"
                                  type="submit"
                                  sizesButton="py-3"
                                  onClick={showCreateActivity}
                                />
                              </div>
                            )}

                            <div className="mt-10">
                              <Tabs
                                type="card"
                                className="tabs-antd-custom justify-center"
                              >
                                {itemClub?.informe?.actividades?.map(
                                  (item: any, index: any) => {
                                    return (
                                      <TabPane
                                        tab={item?.name}
                                        key={index}
                                        className="mb-10"
                                      >
                                        <div
                                          key={index}
                                          className="mt-0 w-full md:w-[650px] mx-auto mb-20"
                                        >
                                          <ActividadForm
                                            key={index}
                                            className="shadow-lg"
                                            refetch={refetch}
                                            hide={hideCreateActivity}
                                            data={item}
                                            isEditable={
                                              itemClub.informe?.editar
                                            }
                                          ></ActividadForm>
                                        </div>
                                      </TabPane>
                                    );
                                  }
                                )}
                              </Tabs>
                            </div>
                          </Restricted>

                          <Restricted
                            module={ModuleEnums.INFORMES_MENSUALES}
                            typePermisse={PermissionsEnums.VIEW_DATA_FORMS}
                          >
                            <div className="mt-8 flex flex-col justify-center">
                              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 flex">
                                <div className="inline-block min-w-min mx-auto py-2 align-middle md:px-6 lg:px-8">
                                  <div className="overflow-hidden shadow ring-1 ring-yellow ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                      <thead className="bg-gray-50"></thead>
                                      <tbody className="divide-y divide-yellow bg-white">
                                        <tr
                                          key=""
                                          className="divide-x divide-yellow"
                                        >
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                            Nº Reuniones
                                          </td>
                                          <td className="whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                            {itemClub?.informe?.nro_reuniones}
                                          </td>
                                          <td className="whitespace-nowrap font-bold p-4 text-sm text-[black]">
                                            % Asistencia
                                          </td>
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 font-medium">
                                            {itemClub?.informe?.porcentaje_asistencia?.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                        </tr>
                                        <tr
                                          key=""
                                          className="divide-x divide-yellow"
                                        >
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                            Nº Juntas Planeación:
                                          </td>
                                          <td className="whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                            {
                                              itemClub?.informe
                                                ?.reuniones_directiva
                                            }
                                          </td>
                                          <td className="whitespace-nowrap font-bold p-4 text-sm text-[black]">
                                            Nº Juntas con Padres:
                                          </td>
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 font-medium">
                                            {
                                              itemClub?.informe
                                                ?.reuniones_padres
                                            }
                                          </td>
                                        </tr>
                                        <tr
                                          key=""
                                          className="divide-x divide-yellow"
                                        >
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                            N° Células Juveniles:
                                          </td>
                                          <td className="whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                            {itemClub?.informe?.numero_gpss}
                                          </td>
                                          <td className="whitespace-nowrap font-bold p-4 text-sm text-[black]">
                                            Involucrados en SJ:
                                          </td>
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 font-medium">
                                            {itemClub?.informe?.involucrados_sj}
                                          </td>
                                        </tr>

                                        <tr
                                          key=""
                                          className="divide-x divide-yellow"
                                        >
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                            Inscritos del mes:
                                          </td>
                                          <td className="whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                            {itemClub?.informe?.inscritos_mes}
                                          </td>
                                          <td className="whitespace-nowrap font-bold p-4 text-sm text-[black]">
                                            Bautismos del mes:
                                          </td>
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 font-medium">
                                            {
                                              itemClub?.informe
                                                ?.numero_bautismos
                                            }
                                          </td>
                                        </tr>

                                        <tr
                                          key=""
                                          className="divide-x divide-yellow"
                                        >
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                            Blanco de Estudios Bíblicos:
                                          </td>
                                          <td className="whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                            {
                                              itemClub?.informe
                                                ?.blanco_estudios_biblicos
                                            }
                                          </td>
                                          <td className="whitespace-nowrap font-bold p-4 text-sm text-[black]">
                                            Blanco de Reclutas:
                                          </td>
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 font-medium">
                                            {itemClub?.informe?.blanco_reclutas}
                                          </td>
                                        </tr>

                                        <tr
                                          key=""
                                          className="divide-x divide-yellow"
                                        >
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                            Miembros Dando Estudio Bíblico:
                                          </td>
                                          <td className="whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                            {
                                              itemClub?.informe
                                                ?.miembros_dando_e_b
                                            }
                                          </td>
                                          <td className="whitespace-nowrap font-bold p-4 text-sm text-[black]">
                                            Miembros Recibiendo Estudio Bíblico:
                                          </td>
                                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 font-medium">
                                            {
                                              itemClub?.informe
                                                ?.miembros_recibiendo_e_b
                                            }
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-10">
                              {!isEmpty(itemClub?.informe?.actividades) && (
                                <div className="mt-20 w-full md:w-[80%] mx-auto mb-20">
                                  {/* {tabs && <Tabs tabs={tabs} setTabs={setTabs} /> */}
                                  <Tabs
                                    type="card"
                                    className="tabs-antd-custom justify-center"
                                  >
                                    {itemClub?.informe?.actividades?.map(
                                      (item: any, index: number) => {
                                        return (
                                          <TabPane
                                            tab={item?.name}
                                            key={index}
                                            className="mb-10"
                                          >
                                            <div className="container-actividad border border-gray-200 p-2 rounded-3xl">
                                              <div className="mt-8 flex flex-col justify-center">
                                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 flex">
                                                  <div className="inline-block min-w-[500px] mx-auto py-2 align-middle md:px-6 lg:px-8">
                                                    <div className="overflow-hidden shadow ring-1 ring-yellow ring-opacity-5 md:rounded-none">
                                                      <table className="min-w-full divide-y divide-gray-300">
                                                        <thead className="bg-gray-50"></thead>
                                                        <tbody className="divide-y divide-yellow bg-white">
                                                          <tr
                                                            key=""
                                                            className="divide-x divide-yellow"
                                                          >
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                                              Tipo:
                                                            </td>
                                                            <td className="whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                                              {item?.tipo}
                                                            </td>
                                                          </tr>
                                                          <tr
                                                            key=""
                                                            className="divide-x divide-yellow"
                                                          >
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                                              Lugar:
                                                            </td>
                                                            <td className="whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                                              {item?.lugar}
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="flex flex-col justify-center">
                                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 flex">
                                                  <div className="inline-block min-w-[500px] mx-auto py-2 align-middle md:px-6 lg:px-8">
                                                    <div className="overflow-hidden shadow ring-1 ring-yellow ring-opacity-5 md:rounded-none">
                                                      <table className="min-w-full divide-y divide-gray-300">
                                                        <thead className="bg-gray-50"></thead>
                                                        <tbody className="divide-y divide-yellow bg-white">
                                                          <tr
                                                            key=""
                                                            className="divide-x divide-yellow"
                                                          >
                                                            <td className="text-center whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                                              Descripción
                                                            </td>
                                                          </tr>
                                                          <tr
                                                            key=""
                                                            className="divide-x divide-yellow"
                                                          >
                                                            <td className="text-center whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                                              {
                                                                item?.descripcion
                                                              }
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="flex flex-col justify-center">
                                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 flex">
                                                  <div className="inline-block min-w-[500px] mx-auto py-2 align-middle md:px-6 lg:px-8">
                                                    <div className="overflow-hidden shadow ring-1 ring-yellow ring-opacity-5 md:rounded-none">
                                                      <table className="min-w-full divide-y divide-gray-300">
                                                        <thead className="bg-gray-50"></thead>
                                                        <tbody className="divide-y divide-yellow bg-white">
                                                          <tr
                                                            key=""
                                                            className="divide-x divide-yellow"
                                                          >
                                                            <td className="text-center whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                                              Objetivo
                                                            </td>
                                                          </tr>
                                                          <tr
                                                            key=""
                                                            className="divide-x divide-yellow"
                                                          >
                                                            <td className="text-center whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                                              {item?.objetivo}
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="flex flex-col justify-center">
                                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 flex">
                                                  <div className="inline-block min-w-[500px] mx-auto py-2 align-middle md:px-6 lg:px-8">
                                                    <div className="overflow-hidden shadow ring-1 ring-yellow ring-opacity-5 md:rounded-none">
                                                      <table className="min-w-full divide-y divide-gray-300">
                                                        <thead className="bg-gray-50"></thead>
                                                        <tbody className="divide-y divide-yellow bg-white">
                                                          <tr
                                                            key=""
                                                            className="divide-x divide-yellow"
                                                          >
                                                            <td className="text-center whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                                              Asistencia
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="flex flex-col justify-center">
                                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 flex">
                                                  <div className="inline-block min-w-[500px] mx-auto py-2 align-middle md:px-6 lg:px-8">
                                                    <div className="overflow-hidden shadow ring-1 ring-yellow ring-opacity-5 md:rounded-none">
                                                      <table className="min-w-full divide-y divide-gray-300">
                                                        <thead className="bg-gray-50"></thead>
                                                        <tbody className="divide-y divide-yellow bg-white">
                                                          <tr
                                                            key=""
                                                            className="divide-x divide-yellow"
                                                          >
                                                            <td className="text-center whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                                              Nº Miembros:
                                                            </td>
                                                            <td className="text-center whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                                              {
                                                                item?.asistencia_miembros
                                                              }
                                                            </td>
                                                            <td className="text-center whitespace-nowrap py-4 pl-4 pr-4 text-sm font-bold text-[black] sm:pl-6">
                                                              Nº Visitas:
                                                            </td>
                                                            <td className="text-center whitespace-nowrap p-4 text-sm text-gray-500 font-medium">
                                                              {
                                                                item?.asistencia_no_miembros
                                                              }
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="text-center flex justify-center mt-5">
                                                <img
                                                  src={item?.foto}
                                                  className="max-w-sm rounded-lg"
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                          </TabPane>
                                        );
                                      }
                                    )}
                                  </Tabs>
                                </div>
                              )}
                            </div>
                          </Restricted>
                          <Restricted
                            module={ModuleEnums.INFORMES_MENSUALES}
                            typePermisse={PermissionsEnums.APPROVE_FORM}
                          >
                            {itemClub?.informe?.editar && (
                              <div className="mt-0 justify-center text-center flex w-full">
                                <Button
                                  labelProps="f-18 font-bold"
                                  label={"Aprobar Informe"}
                                  fill
                                  className="bg-alert-success border-alert-success max-w-[200px]"
                                  boderRadius="rounded-full"
                                  size="full"
                                  sizesButton="py-3"
                                  onClick={() =>
                                    handleShowApprove(itemClub?.informe?.id)
                                  }
                                />
                              </div>
                            )}
                          </Restricted>
                          <Restricted
                            module={ModuleEnums.INFORMES_MENSUALES}
                            typePermisse={PermissionsEnums.LOAD_SCORE}
                          >
                            {itemClub?.informe?.editar && (
                              <div className="mt-28 justify-center text-center flex w-full">
                                <Button
                                  labelProps="f-18 font-bold"
                                  label={"Cargar Puntuación"}
                                  fill
                                  className="bg-alert-success border-alert-success max-w-[200px]"
                                  boderRadius="rounded-full"
                                  size="full"
                                  sizesButton="py-3"
                                  onClick={() =>
                                    handleShowLoadScore(itemClub?.informe)
                                  }
                                />
                              </div>
                            )}
                          </Restricted>
                        </Panel>
                      </React.Fragment>
                    );
                  })}
                </Collapse>
              )}
            </div>
          </div>
          <ModalView isShow={isShowView}>
            <ViewClub hide={hideView} data={dataView} refetch={refetch} />
          </ModalView>
          <ModalCreateActivity isShow={isShowCreateActivity}>
            <ActividadForm
              refetch={refetch}
              hide={hideCreateActivity}
            ></ActividadForm>
          </ModalCreateActivity>
          <ModalApprove isShow={isShowApprove}>
            <ApproveInforme
              hide={hideApprove}
              refetch={refetch}
              id_informe={dataApprove}
            />
          </ModalApprove>
          <ModalLoadScore isShow={isShowLoadScore}>
            <LoadScore
              hide={hideLoadScore}
              data={dataLoadScore}
              refetch={refetch}
            />
          </ModalLoadScore>
          <ModalHelp isShow={isShowHelp}>
            {/* <HelpListInformesMensuales hide={hideHelp} /> */}
            <HelpFormInformesMensuales hide={hideHelp} />
          </ModalHelp>
        </>
      )}
    </LayoutDashboard>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = session?.accessToken as string;

  let profile: any = [];
  try {
    profile = await ProfilApiService.getUser(token);
  } catch (e) {
    console.log("error", e);
  }

  const isValid = routeValidForUser(
    profile,
    PermissionsEnums.VIEW,
    ModuleEnums.INFORMES_MENSUALES
  );

  if (session && session.accessToken && isValid) {
    return {
      props: {},
    };
  }

  if (session && session.accessToken && !isValid && !isEmpty(profile)) {
    return {
      redirect: {
        destination: "/dashboard/permission-denied",
        permanent: false,
      },
    };
  }

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;

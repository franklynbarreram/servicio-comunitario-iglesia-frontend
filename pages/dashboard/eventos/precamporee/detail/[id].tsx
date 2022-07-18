import { InputText } from "components/common/form/input-text";
import { Icon } from "components/icon";
import { LayoutDashboard } from "components/layout";
import { appRouter, Icons } from "consts";
import { useModal } from "hooks/modal";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { UseQueryEnums } from "consts/useQueryEnums";
import { useQuery } from "react-query";
import { Spinner } from "components/common/spinner/spinner";
import { useQueryParams } from "consts/query.helper";
import { IconWithText } from "components/icon-with-text";
import DataTableComponent, {
  TableColumnType,
} from "components/data-table/DataTableComponent";
import { get, isNil, isEmpty } from "lodash";
import { Subject } from "rxjs";
import { CamporeeServices } from "services/Camporee";
import { PermissionsEnums } from "consts/permissionsEnum";
import { ModuleEnums } from "consts/modulesEmuns";
import { routeValidForUser, ValidateImage, ValidateString } from "lib/helper";
import { ProfilApiService } from "services";
import Restricted from "context/PermissionProvider/Restricted";
import Link from "next/link";
import { useRouter } from "next/router";
// import { Tabs } from "components/common/tabs2";
import EventosPrecamporee from "components/camporee/eventos-precamporee";
import BoxInfo from "components/box-info";
import clsx from "clsx";
import { Typography } from "components/common/typography";
import { InformeForm } from "components/events/precamporee/form-informe";
import { Button } from "components/common/button";
import ApproveInforme from "components/events/precamporee/approve-informe";
import LoadScore from "components/events/precamporee/load-score";
import { useUser } from "hooks/user";
import { RoleEnums } from "consts/rolesEnum";
import PreviewImage from "components/common/preview-image";
import Back from "components/common/back";
import { Tabs } from "antd";

const { TabPane } = Tabs;

type Params = {
  id: any;
};

const classNamesForms = "w-full px-4 md:w-[550px] mx-auto md:mt-8";

const EventPrecamporeeDetail = () => {
  const { Modal, hide, isShow, show } = useModal();

  const {
    Modal: ModalApprove,
    hide: hideApprove,
    isShow: isShowApprove,
    show: showApprove,
  } = useModal();

  const router = useRouter();
  const { id } = router.query;
  // console.log("el id:", id);
  const {
    Modal: ModalLoadScore,
    hide: hideLoadScore,
    isShow: isShowLoadScore,
    show: showLoadScore,
  } = useModal();

  const {
    Modal: ModalViewImages,
    hide: hideViewImages,
    isShow: isShowViewImages,
    show: showViewImages,
  } = useModal();
  const [dataPreview, setDataPreview] = React.useState<any>();
  const profile = useUser();

  const dataUser = get(profile, "data", []);
  // const [response, setResponse] = React.useState<any>();
  // const [isLoading, setIsLoading] = React.useState<any>(true);
  const [onSearch, setOnSearch] = React.useState(false);
  const [dataApprove, setDataApprove] = React.useState<any>();
  const [dataLoadScore, setDataLoadScore] = React.useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subject, setSubject] = React.useState(new Subject<string>());
  const [params, setValue] = useQueryParams<Params>({ id });
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery<any>(
    [`${UseQueryEnums.GET_EVENT_PRECAMPOREE_BY_ID}_${id}`],
    () => CamporeeServices.getEventPrecamporeeById(id)
  );

  const [tabs, setTabs] = React.useState<any>();

  const findInforme = (mes: string) => {
    if (!isEmpty(response?.data?.informes)) {
      const informe = response?.data?.informes[0]?.informes?.find(
        (item: any) => item.mes === mes
      );

      // console.log("el informe", informe);
      return informe;
    }
  };

  React.useEffect(() => {
    if (!isNil(response) && response?.data?.meses) {
      const aux: any = [];
      response?.data?.meses?.forEach((item: any, index: number) => {
        const informe = findInforme(item.value);
        console.log("el infomre lleg", informe);
        aux.push({
          name: item.mes,
          component: (
            <InformeForm
              refetch={refetch}
              informe={informe ? informe : null}
              isAvailable={item?.activo}
              idPrecamporee={id}
              isRecurrent
              mes={item.value}
              className={classNamesForms}
            />
          ),
          current: index === 0 ? true : false,
        });
      });
      setTabs([...aux]);
    }
  }, [response]);

  const {
    register,
    handleSubmit,
    setValue: setValueForm,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const values = get(response, "data", []);

  const itemsCamporee = React.useMemo(() => {
    return [
      {
        icon: Icons.calendar,
        title: `${values?.fecha_inicio} a ${values?.fecha_fin}`,
      },
      {
        icon: Icons.location,
        title: (
          <>
            <strong className="text-[black]">Direccion:</strong>
            {` ${values?.lugar}`}
          </>
        ),
      },
      ,
      {
        icon: Icons.iglesia,
        title: (
          <>
            <strong className="text-[black]">Capellan:</strong>
            {` ${values?.capellan}`}
          </>
        ),
      },
      {
        icon: Icons.camporee,
        title: (
          <>
            <strong className="text-[black]">Lider juvenil:</strong>
            {` ${values?.lider_juvenil}`}
          </>
        ),
      },
    ];
  }, [response]);

  const handleShowLoadScore = (data: any) => {
    setDataLoadScore(data);
    showLoadScore();
  };
  const handleShowApprove = (id: any) => {
    setDataApprove(id);
    showApprove();
  };

  const isFirmado = (informe: any) => {
    switch (dataUser?.scope_actual) {
      case RoleEnums.ANCIANO: {
        console.log("aqui anciado", informe?.firma_anciano);
        return informe?.firma_anciano;
      }
      case RoleEnums.PRESIDENTE_CONSEJO: {
        console.log("aqui consejo regional", informe?.firma_consejo_regional);
        return informe?.firma_consejo_regional;
      }
      case RoleEnums.PASTOR: {
        console.log("aqui pastor", informe?.firma_pastor);
        return informe?.firma_pastor;
      }
    }
  };

  const handlePreviewImage = (src: string) => {
    setDataPreview(src);
    showViewImages();
  };

  console.log("los value evento precampore by id", values);

  return (
    <LayoutDashboard title="Detalle Precamporee">
      <div className="lg:px-20 mt-12">
        <div className="flex flex-wrap justify-center flex-row">
          {isLoading ? (
            <Spinner type="loadingPage" className="py-10" />
          ) : (
            <>
              <Back />
              <div className="item flex flex-col gap-2 text-center justify-center w-full mt-8">
                <Typography
                  type="label"
                  className={clsx(
                    "ml-3 font-bold mb-2 mt-3 block text-primary text-3xl"
                  )}
                >
                  {`${values?.nombre}`}
                </Typography>
              </div>
              <div className="container-form w-full mt-16 gap-x-6 gap-y-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 text-left ">
                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Descripcion
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {ValidateString(values?.descripcion)}
                  </Typography>
                </div>
                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Mensual
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.mensual ? "Si" : "No"}
                  </Typography>
                </div>
                {values.meses && (
                  <div className="item col-span-1">
                    <Typography
                      type="label"
                      className={clsx("ml-3 font-bold mb-2 block f-18")}
                    >
                      Meses
                    </Typography>

                    <ul className="ml-3">
                      {values?.meses.map((item: any, index: any) => {
                        return <li key={index}>{item.mes}</li>;
                      })}
                    </ul>
                  </div>
                )}
                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Puntaje maximo
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.puntaje_maximo}
                  </Typography>
                </div>
                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Realizado
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.realizado ? "Si" : "No"}
                  </Typography>
                </div>
              </div>
              <Restricted
                module={ModuleEnums.EVENTO_PRECAMPOREE}
                typePermisse={PermissionsEnums.VIEW_DATA_FORMS}
              >
                {values?.informes?.map((itemClub: any, index: any) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="item bg-yellow flex text-center justify-center w-full mt-20">
                        <Typography
                          type="label"
                          className={clsx(
                            "font-bold block text-primary text-3xl px-2 py-3"
                          )}
                        >
                          {itemClub?.club}
                        </Typography>
                      </div>
                      {itemClub?.informes?.map((informe: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="container-form shadow-md pb-10 px-5 w-full my-16 "
                          >
                            <div className="gap-x-6 gap-y-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 text-left ">
                              <React.Fragment key={index}>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Descripcion
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {ValidateString(informe?.descripcion)}
                                  </Typography>
                                </div>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Objetivo
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {ValidateString(informe?.objetivo)}
                                  </Typography>
                                </div>

                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Participantes
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {informe?.participantes}
                                  </Typography>
                                </div>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Fecha Enviado
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {informe?.fecha_enviado}
                                  </Typography>
                                </div>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Firma Anciano
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {informe?.firma_anciano ? (
                                      <span className="text-secondary font-bold">
                                        SI
                                      </span>
                                    ) : (
                                      <span className="text-alert-error font-bold">
                                        NO
                                      </span>
                                    )}
                                  </Typography>
                                </div>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Firma Consejo
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {informe?.firma_consejo_regional ? (
                                      <span className="text-secondary font-bold">
                                        SI
                                      </span>
                                    ) : (
                                      <span className="text-alert-error font-bold">
                                        NO
                                      </span>
                                    )}
                                  </Typography>
                                </div>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Firma Pastor
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {informe?.firma_pastor ? (
                                      <span className="text-secondary font-bold">
                                        SI
                                      </span>
                                    ) : (
                                      <span className="text-alert-error font-bold">
                                        NO
                                      </span>
                                    )}
                                  </Typography>
                                </div>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Puntuación
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {informe?.puntuacion
                                      ? informe?.puntuacion
                                      : "N/A"}
                                  </Typography>
                                </div>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Observación
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {informe?.observacion
                                      ? informe?.observacion
                                      : "N/A"}
                                  </Typography>
                                </div>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Puntuación Maxima
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {informe?.puntuacion_maxima}
                                  </Typography>
                                </div>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Mes
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {informe?.nombre_mes}
                                  </Typography>
                                </div>
                                <div className="col-span-full container-images-informes flex-wrap flex justify-center gap-4 mt-0 md:mt-10 w-full">
                                  <img
                                    src={informe?.imagen1}
                                    className="hover:opacity-50 cursor-pointer w-52 h-40 md:w-64  md:h-64 object-cover rounded-2xl"
                                    alt="image1"
                                    onClick={() =>
                                      handlePreviewImage(informe?.imagen1)
                                    }
                                  />
                                  <img
                                    src={informe?.imagen2}
                                    className="hover:opacity-50 cursor-pointer w-52 h-40 md:w-64  md:h-64 object-cover rounded-2xl"
                                    alt="image2"
                                    onClick={() =>
                                      handlePreviewImage(informe?.imagen2)
                                    }
                                  />
                                  <img
                                    src={informe?.imagen3}
                                    className="hover:opacity-50 cursor-pointer w-52 h-40 md:w-64  md:h-64 object-cover rounded-2xl"
                                    alt="image3"
                                    onClick={() =>
                                      handlePreviewImage(informe?.imagen3)
                                    }
                                  />
                                </div>
                              </React.Fragment>
                            </div>
                            {!isFirmado(informe) && (
                              <Restricted
                                module={ModuleEnums.EVENTO_PRECAMPOREE}
                                typePermisse={PermissionsEnums.APPROVE_FORM}
                              >
                                <div className="mt-28 justify-center text-center flex w-full">
                                  <Button
                                    labelProps="f-18 font-bold"
                                    label={"Aprobar Informe"}
                                    fill
                                    className="bg-alert-success border-alert-success max-w-[200px]"
                                    boderRadius="rounded-full"
                                    size="full"
                                    sizesButton="py-3"
                                    onClick={() =>
                                      handleShowApprove(informe?.id)
                                    }
                                  />
                                </div>
                              </Restricted>
                            )}
                            {informe?.editar && (
                              <Restricted
                                module={ModuleEnums.EVENTO_PRECAMPOREE}
                                typePermisse={PermissionsEnums.LOAD_SCORE}
                              >
                                <div className="mt-28 justify-center text-center flex w-full">
                                  <Button
                                    labelProps="f-18 font-bold"
                                    label={"Cargar Puntuación"}
                                    fill
                                    className="bg-alert-success border-alert-success max-w-[200px]"
                                    boderRadius="rounded-full"
                                    size="full"
                                    sizesButton="py-3"
                                    onClick={() => handleShowLoadScore(informe)}
                                  />
                                </div>
                              </Restricted>
                            )}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </Restricted>
              <Restricted
                module={ModuleEnums.EVENTO_PRECAMPOREE}
                typePermisse={PermissionsEnums.LOAD_FORMS}
              >
                <div className="my-14 w-full">
                  <div className="item flex text-center justify-center w-full">
                    <Typography
                      type="label"
                      className={clsx(
                        "ml-3 font-bold mb-2 mt-3 block text-primary text-3xl"
                      )}
                    >
                      Informe{values?.meses ? "s" : ""}
                    </Typography>
                  </div>

                  {!isEmpty(values?.meses) ? (
                    <div className="mt-20 w-full md:w-[70%] mx-auto mb-20">
                      {/* {tabs && <Tabs tabs={tabs} setTabs={setTabs} /> */}
                      <Tabs
                        type="card"
                        className="tabs-antd-custom justify-center"
                      >
                        {values.meses?.map((item: any, index: number) => {
                          const informe = findInforme(item.value);
                          console.log("el infomre lleg", informe);
                          return (
                            <TabPane
                              tab={item?.mes}
                              key={index}
                              className="mb-10"
                            >
                              <InformeForm
                                refetch={refetch}
                                informe={informe ? informe : null}
                                isAvailable={item?.activo}
                                idPrecamporee={id}
                                isRecurrent
                                mes={item.value}
                                className={classNamesForms}
                              />
                            </TabPane>
                          );
                        })}
                      </Tabs>
                    </div>
                  ) : (
                    <InformeForm
                      refetch={refetch}
                      idPrecamporee={id}
                      informe={
                        isEmpty(values?.informes) ? null : values?.informes[0]
                      }
                      isAvailable={values?.activo}
                      className={classNamesForms}
                    />
                  )}
                </div>
              </Restricted>
            </>
          )}
        </div>
      </div>
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
      <ModalViewImages isShow={isShowViewImages}>
        <PreviewImage src={dataPreview} />
      </ModalViewImages>
      {/*
      <ModalEdit isShow={isShowEdit}>
        <EditClub hide={hideEdit} data={dataEdit} refetch={refetch} />
      </ModalEdit>
      <ModalView isShow={isShowView}>
        <ViewClub hide={hideView} data={dataView} refetch={refetch} />
      </ModalView> */}
    </LayoutDashboard>
  );
};

// AGREGAR VALIDACION DE PERMISOS A ESTA VISTA
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
    ModuleEnums.EVENTO_PRECAMPOREE
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

export default EventPrecamporeeDetail;

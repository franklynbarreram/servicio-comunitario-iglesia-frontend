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
import {
  TypesSelectEnums,
  TypesSelectSexoEnums,
  TypesSelectTypoEventoCamporeeEnums,
} from "consts/typesSelectEnum";
import InscribirClub from "components/camporee/eventos-camporee/inscribir-club";

const { TabPane } = Tabs;

type Params = {
  id: any;
};

const classNamesForms = "w-full px-4 md:w-[550px] mx-auto md:mt-8";

const EventCamporeeDetail = () => {
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
  const {
    Modal: ModalInscription,
    hide: hideInscription,
    isShow: isShowInscription,
    show: showInscription,
  } = useModal();
  const [dataPreview, setDataPreview] = React.useState<any>();
  const profile = useUser();

  const dataUser = get(profile, "data", []);
  // const [response, setResponse] = React.useState<any>();
  // const [isLoading, setIsLoading] = React.useState<any>(true);
  const [onSearch, setOnSearch] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
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
    [`${UseQueryEnums.GET_EVENT_CAMPOREE_BY_ID_DETAIL_ID}_${id}`],
    () => CamporeeServices.getEventCamporeeById(id)
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

  const handleShowInscription = (isEdit?: boolean) => {
    // setDataApprove(id);
    if (isEdit) setIsEdit(true);
    showInscription();
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

  console.log("los value evento camporee by id", values);

  return (
    <LayoutDashboard title="Detalle Evento">
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
              <div className="container-form justify-center w-full mt-16 gap-x-6 gap-y-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 text-left ">
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
                    Categoria
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.categoria}
                  </Typography>
                </div>

                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Tipo evento
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.inscripcion_federacion
                      ? TypesSelectTypoEventoCamporeeEnums.FEDERACION
                      : TypesSelectTypoEventoCamporeeEnums.CLUBES}
                  </Typography>
                </div>
                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Eliminatoria
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.eliminatoria ? (
                      <span className="text-secondary font-bold">SI</span>
                    ) : (
                      <span className="text-alert-error font-bold">NO</span>
                    )}
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
                    {values?.realizado ? (
                      <span className="text-secondary font-bold">SI</span>
                    ) : (
                      <span className="text-alert-error font-bold">NO</span>
                    )}
                  </Typography>
                </div>
                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Puntuación maxima
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.puntuacion_maxima}
                  </Typography>
                </div>
                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Oro
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.oro}
                  </Typography>
                </div>
                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Plata
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.plata}
                  </Typography>
                </div>
                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Bronce
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.bronce}
                  </Typography>
                </div>
                <div className="item col-span-1">
                  <Typography
                    type="label"
                    className={clsx("ml-3 font-bold mb-2 block f-18")}
                  >
                    Hierro
                  </Typography>
                  <Typography
                    type="span"
                    className={clsx("ml-3 font-normal mb-2 block f-18")}
                  >
                    {values?.hierro}
                  </Typography>
                </div>
                {(values?.tipo === TypesSelectEnums.CONQUISTADORES ||
                  values?.tipo === TypesSelectEnums.INTEGRADO) && (
                  <>
                    {(values?.distincion_sexo ===
                      TypesSelectSexoEnums.HOMBRES ||
                      values?.distincion_sexo === TypesSelectSexoEnums.AMBOS ||
                      values?.distincion_sexo ===
                        TypesSelectSexoEnums.SIN_DISTINCION) && (
                      <div className="item col-span-1">
                        <Typography
                          type="label"
                          className={clsx("ml-3 font-bold mb-2 block f-18")}
                        >
                          Nro. Conquistadores{" "}
                          {values?.distincion_sexo !==
                            TypesSelectSexoEnums.SIN_DISTINCION && "Hombres"}
                        </Typography>
                        <Typography
                          type="span"
                          className={clsx("ml-3 font-normal mb-2 block f-18")}
                        >
                          {values?.participantes_conquistadores_m}
                        </Typography>
                      </div>
                    )}
                    {(values?.distincion_sexo ===
                      TypesSelectSexoEnums.MUJERES ||
                      values?.distincion_sexo ===
                        TypesSelectSexoEnums.AMBOS) && (
                      <div className="item col-span-1">
                        <Typography
                          type="label"
                          className={clsx("ml-3 font-bold mb-2 block f-18")}
                        >
                          Nro. Conquistadores Mujeres
                        </Typography>
                        <Typography
                          type="span"
                          className={clsx("ml-3 font-normal mb-2 block f-18")}
                        >
                          {values?.participantes_conquistadores_f}
                        </Typography>
                      </div>
                    )}
                  </>
                )}

                {(values?.tipo === TypesSelectEnums.GUIAS_MAYORES ||
                  values?.tipo === TypesSelectEnums.INTEGRADO) && (
                  <>
                    {(values?.distincion_sexo ===
                      TypesSelectSexoEnums.HOMBRES ||
                      values?.distincion_sexo === TypesSelectSexoEnums.AMBOS ||
                      values?.distincion_sexo ===
                        TypesSelectSexoEnums.SIN_DISTINCION) && (
                      <div className="item col-span-1">
                        <Typography
                          type="label"
                          className={clsx("ml-3 font-bold mb-2 block f-18")}
                        >
                          Nro. Guias Mayores{" "}
                          {values?.distincion_sexo !==
                            TypesSelectSexoEnums.SIN_DISTINCION && "Hombres"}
                        </Typography>
                        <Typography
                          type="span"
                          className={clsx("ml-3 font-normal mb-2 block f-18")}
                        >
                          {values?.participantes_guias_mayores_m}
                        </Typography>
                      </div>
                    )}
                    {(values?.distincion_sexo ===
                      TypesSelectSexoEnums.MUJERES ||
                      values?.distincion_sexo ===
                        TypesSelectSexoEnums.AMBOS) && (
                      <div className="item col-span-1">
                        <Typography
                          type="label"
                          className={clsx("ml-3 font-bold mb-2 block f-18")}
                        >
                          Nro. Guias Mayores Mujeres
                        </Typography>
                        <Typography
                          type="span"
                          className={clsx("ml-3 font-normal mb-2 block f-18")}
                        >
                          {values?.participantes_guias_mayores_f}
                        </Typography>
                      </div>
                    )}
                  </>
                )}
              </div>

              <Restricted
                module={ModuleEnums.EVENTO_CAMPOREE}
                typePermisse={PermissionsEnums.VIEW_CLUBES_INSCRITOS}
              >
                {values?.datos_inscripcion?.map((itemClub: any, index: any) => {
                  return (
                    <React.Fragment key={index}>
                      {itemClub?.inscrito && (
                        <>
                          <div className="item bg-yellow flex text-center justify-center w-full mt-20">
                            <Typography
                              type="label"
                              className={clsx(
                                "font-bold block text-primary text-3xl px-2 py-3"
                              )}
                            >
                              {itemClub?.nombre}
                            </Typography>
                          </div>
                          <div className="container-form shadow-md pb-10 px-5 w-full my-16 ">
                            <div className="gap-x-6 gap-y-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 text-left ">
                              <React.Fragment key={index}>
                                <div className="item col-span-1">
                                  <Typography
                                    type="label"
                                    className={clsx(
                                      "ml-3 font-bold mb-2 block f-18"
                                    )}
                                  >
                                    Clasificado
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {itemClub?.clasificado ? (
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
                                    Observacion
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {itemClub?.observacion ? (
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
                                    {itemClub?.puntuacion
                                      ? itemClub?.puntuacion
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
                                    Puntuación Eliminatoria
                                  </Typography>
                                  <Typography
                                    type="span"
                                    className={clsx(
                                      "ml-3 font-normal mb-2 block f-18"
                                    )}
                                  >
                                    {itemClub?.puntuacion_eliminatoria
                                      ? itemClub?.puntuacion_eliminatoria
                                      : "N/A"}
                                  </Typography>
                                </div>
                              </React.Fragment>
                            </div>
                            {/* {!isFirmado(informe) && (
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
                            )} */}
                          </div>
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </Restricted>
            </>
          )}
          <Restricted
            module={ModuleEnums.EVENTO_CAMPOREE}
            typePermisse={PermissionsEnums.INSCRIBIR_CLUB}
          >
            {!isNil(values?.datos_inscripcion) &&
              !isEmpty(values?.datos_inscripcion) && (
                <>
                  {!values?.datos_inscripcion[0]?.inscrito &&
                    values?.datos_inscripcion[0]?.inscribible && (
                      <div className="mt-10  mb-20 justify-center text-center flex w-full">
                        <Button
                          labelProps="f-18 font-bold"
                          label={"Inscribir club"}
                          fill
                          className="bg-alert-success border-alert-success max-w-[200px]"
                          boderRadius="rounded-full"
                          size="full"
                          sizesButton="py-3"
                          onClick={() => handleShowInscription()}
                        />
                      </div>
                    )}

                  {values?.datos_inscripcion[0]?.inscrito &&
                    values?.datos_inscripcion[0]?.inscribible && (
                      <div className="mt-10 mb-20  justify-center text-center flex w-full">
                        <Button
                          labelProps="f-18 font-bold"
                          label={"Editar inscripcion"}
                          fill
                          className="bg-alert-success border-alert-success max-w-[200px]"
                          boderRadius="rounded-full"
                          size="full"
                          sizesButton="py-3"
                          onClick={() => handleShowInscription(true)}
                        />
                      </div>
                    )}
                </>
              )}
          </Restricted>
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
      <ModalInscription isShow={isShowInscription}>
        <InscribirClub
          hide={hideInscription}
          data={values}
          isEdit={isEdit}
          // id_camporee_evento={id}
          refetch={refetch}
        />
      </ModalInscription>
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
    ModuleEnums.EVENTO_CAMPOREE
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

export default EventCamporeeDetail;

import { LayoutDashboard } from "components/layout";
import { useModal } from "hooks/modal";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { UseQueryEnums } from "consts/useQueryEnums";
import { useQuery } from "react-query";
import { Spinner } from "components/common/spinner/spinner";
import { useQueryParams } from "consts/query.helper";
import { get, isEmpty } from "lodash";
import { Subject } from "rxjs";
import { CamporeeServices } from "services/Camporee";
import { PermissionsEnums } from "consts/permissionsEnum";
import { ModuleEnums } from "consts/modulesEmuns";
import {
  formatDateComplete,
  routeValidForUser,
  ValidateImage,
} from "lib/helper";
import { ProfilApiService } from "services";
import { useRouter } from "next/router";
// import { Tabs } from "components/common/tabs2";
import EventosPrecamporee from "components/camporee/eventos-precamporee";
import BoxInfo from "components/box-info";
import { Icons } from "consts";
import Back from "components/common/back";
import EditCamporee from "components/camporee/edit-camporee";
import { Tabs } from "antd";
import EditEventPrecamporee from "components/camporee/eventos-precamporee/edit";
import EventosCamporee from "components/camporee/eventos-camporee";
import ResultadosCamporee from "components/camporee/resultados";
import { Button } from "components/common/button";
import InscribirClub from "components/camporee/inscribir-club";
import Restricted from "context/PermissionProvider/Restricted";
import { Icon } from "components/icon";
import moment from "moment";

const { TabPane } = Tabs;

type Params = {
  id: any;
};

const CamporeeDetail = () => {
  const { Modal, hide, isShow, show } = useModal();
  const router = useRouter();
  const { id } = router.query;
  // console.log("el id:", id);
  const {
    Modal: ModalEdit,
    hide: hideEdit,
    isShow: isShowEdit,
    show: showEdit,
  } = useModal();

  const {
    Modal: ModalInscription,
    hide: hideInscription,
    isShow: isShowInscription,
    show: showInscription,
  } = useModal();
  const [dataEdit, setDataEdit] = React.useState<any>();
  // const [response, setResponse] = React.useState<any>();
  // const [isLoading, setIsLoading] = React.useState<any>(true);
  const [onSearch, setOnSearch] = React.useState(false);
  const [dataView, setDataView] = React.useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subject, setSubject] = React.useState(new Subject<string>());
  const [params, setValue] = useQueryParams<Params>({ id });
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery<any>([`${UseQueryEnums.GET_CAMPOREE_BY_ID}_${id}`], () =>
    CamporeeServices.getById(id)
  );

  const {
    register,
    handleSubmit,
    setValue: setValueForm,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const handleOnEdit = (selected: any) => {
    const findSelected = response?.data?.data?.find(
      (item: any) => item.id === selected.id
    );
    setDataEdit(findSelected);
    showEdit();
  };

  // const handleOnView = (selected: any) => {
  //   const findSelected = response?.data?.data?.find(
  //     (item: any) => item.id === selected.id
  //   );
  //   setDataView(findSelected);
  //   showEditPrecamporee();
  // };

  const values = get(response, "data", []);

  const itemsCamporee = React.useMemo(() => {
    return [
      {
        icon: Icons.calendar,
        content: `${moment(values?.fecha_inicio).format(
          formatDateComplete
        )} a ${moment(values?.fecha_fin).format(formatDateComplete)}`,
      },
      {
        icon: Icons.location,
        content: (
          <>
            <strong className="text-[black]">Direccion:</strong>
            {` ${values?.lugar}`}
          </>
        ),
      },
      ,
      {
        icon: Icons.iglesia,
        content: (
          <>
            <strong className="text-[black]">Capellan:</strong>
            {` ${values?.capellan}`}
          </>
        ),
      },
      {
        icon: Icons.camporee,
        content: (
          <>
            <strong className="text-[black]">Lider juvenil:</strong>
            {` ${values?.lider_juvenil}`}
          </>
        ),
      },
    ];
  }, [response]);

  const itemsCamporeeHead = React.useMemo(() => {
    return [
      {
        title: `Nro. Clubes`,
        content: (
          <>
            <strong>{parseInt(values?.nro_clubes)}</strong>
          </>
        ),
      },
      {
        title: `Nro. Miembros`,
        content: (
          <>
            <strong>{parseInt(values?.nro_miembros)}</strong>
          </>
        ),
      },
    ];
  }, [response]);
  console.log("los value campore by id", values);
  const handleShowInscription = () => {
    showInscription();
  };

  return (
    <LayoutDashboard title="Detalle Camporee">
      <div className="px-4 mt-12">
        <Back className="mb-12" />
        <div className="flex flex-wrap flex-row">
          <div className="flex flex-wrap flex-auto flex-col">
            {/* <Tabs tabs={tabs} setTabs={setTabs} />
						
						*/}
            <Tabs
              type="card"
              className="tabs-antd-custom overflow-x-auto flex-wrap"
            >
              <TabPane tab="Eventos Precamporee" key="1">
                <EventosPrecamporee idCamporee={id} className="px-2" />
              </TabPane>
              <TabPane tab="Eventos Camporee" key="2">
                <EventosCamporee
                  tipoCamporee={values?.tipo}
                  idCamporee={id}
                  className="px-2"
                />
              </TabPane>
              <TabPane tab="Resultados" key="3">
                <ResultadosCamporee idCamporee={id} className="px-2" />
              </TabPane>
            </Tabs>

            {/* <EventosPrecamporee idCamporee={id} /> */}
          </div>
          {isLoading ? (
            <Spinner type="loadingPage" className="py-10" />
          ) : (
            <>
              <BoxInfo
                withEditButton
                showModal={showEdit}
                className="flex-1 min-w-[100%] md:min-w-[400px] md:max-w-[400px] mx-auto"
                image={ValidateImage(values?.logo)}
                title={values?.nombre}
                items={itemsCamporee}
                headItems={itemsCamporeeHead}
              >
                {values?.inscribible && !values?.inscrito && (
                  <Restricted
                    module={ModuleEnums.CAMPOREE}
                    typePermisse={PermissionsEnums.INSCRIBIR_CLUB_TO_CAMPOREE}
                  >
                    <div className="mt-8">
                      <Button
                        labelProps="text-base font-bold text-white"
                        label={"Inscribir club"}
                        fill
                        className="bg-[black]  border-yellow  w-full animate-bounce"
                        boderRadius="rounded-lg"
                        size="full"
                        sizesButton="py-3"
                        onClick={() => handleShowInscription()}
                      />
                    </div>
                  </Restricted>
                )}
                {values?.inscrito && (
                  <div className="flex justify-center items-center gap-2  mt-8">
                    <p className="text-alert-success text-center font-bold">
                      Club inscrito
                    </p>
                    <Icon
                      src="/icons/selected.svg"
                      className="w-5 text-alert-success"
                      fillPath
                    ></Icon>
                  </div>
                )}
              </BoxInfo>
            </>
          )}
        </div>
      </div>
      {/* <Modal isShow={isShow}>
        <CreateClub hide={hide} refetch={refetch} />
      </Modal>
  
      <ModalView isShow={isShowViewPrecamporee}>
        <ViewClub hide={hideViewCamporee} data={dataView} refetch={refetch} />
      </ModalView> */}
      <ModalInscription isShow={isShowInscription}>
        <InscribirClub
          hide={hideInscription}
          data={values}
          // isEdit={isEdit}
          // id_camporee_evento={id}
          refetch={refetch}
        />
      </ModalInscription>
      <ModalEdit isShow={isShowEdit}>
        <EditCamporee hide={hideEdit} data={values} refetch={refetch} />
      </ModalEdit>
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

export default CamporeeDetail;

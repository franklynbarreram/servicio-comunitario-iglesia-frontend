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
import { debounceTime, map, distinctUntilChanged } from "rxjs/operators";
import { DistritosServices } from "services/Distritos";
import ViewDistrito from "components/administrar/distritos/view";
import EditDistrito from "components/administrar/distritos/edit";
import CreateDistrito from "components/administrar/distritos/create";
import { CamporeeServices } from "services/Camporee";
import CreateIglesia from "components/administrar/iglesias/create";
import EditIglesia from "components/administrar/iglesias/edit";
import ViewIglesia from "components/administrar/iglesias/view";
import CreateClub from "components/administrar/clubes/create";
import ViewClub from "components/administrar/clubes/view";
import EditClub from "components/administrar/clubes/edit";
import { PermissionsEnums } from "consts/permissionsEnum";
import { ModuleEnums } from "consts/modulesEmuns";
import { formatDateComplete, routeValidForUser } from "lib/helper";
import { ProfilApiService } from "services";
import Restricted from "context/PermissionProvider/Restricted";
import Link from "next/link";
import CreateCamporee from "components/camporee/create-camporee";
import { Button } from "components/common/button";
import { Tooltip } from "antd";
import moment from "moment";
import { Help } from "components/common/help";
import { HelpListCamporee } from "help/camporee/listado";

// import Image from "next/image";
type Params = {
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  userId?: number;
};

const HeaderClassName = `
    px-6
    py-3
    text-left
    text-xs
    font-bold
    text-black
    capitalize
    tracking-wider
`;

const DataClassName = `
    px-6
    py-4
    whitespace-nowrap
    text-white
`;

const CamporeeList = () => {
  const {
    Modal: ModalCreate,
    hide: hideCreate,
    isShow: isShowCreate,
    show: showCreate,
  } = useModal();
  const {
    Modal: ModalHelp,
    hide: hideHelp,
    isShow: isShowHelp,
    show: showHelp,
  } = useModal();
  const [dataEdit, setDataEdit] = React.useState<any>();
  const [onSearch, setOnSearch] = React.useState(false);
  const [dataView, setDataView] = React.useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subject, setSubject] = React.useState(new Subject<string>());
  const [params, setValue] = useQueryParams<Params>({ limit: 8 });
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery<any>([UseQueryEnums.GET_ALL_CAMPOREE, params], () =>
    CamporeeServices.getAll(params)
  );
  const updateQuery = (key: string, value: number | string | undefined) => {
    setValue({ [key]: value });
  };

  console.log("all camporee", response);

  const {
    register,
    handleSubmit,
    setValue: setValueForm,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const handleSubmitData = (data: any) => {
    console.log(data);
  };

  const columns: TableColumnType[] = [
    {
      name: "nombre",
      label: "Nombre",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <Link
          href={`${appRouter.dashboard.href}${appRouter.dashboard.subLinks.camporee.href}/${appRouter.dashboard.subLinks.camporee.subLinks.detail.href}/${value.id}`}
        >
          <a>
            <IconWithText icon={value?.logo} text={value?.nombre} />
          </a>
        </Link>
      ),
      // <IconWithText icon={value?.logo} text={value?.nombre} />
    },
    {
      name: "tipo",
      label: "Tipo",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <span className="text-gray-500 capitalize">{value?.tipo}</span>
      ),
    },

    {
      name: "fechaInicio",
      label: "Fecha Inicio",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <span className="text-gray-500 capitalize">
          {moment(value?.fecha_inicio).format(formatDateComplete)}
        </span>
      ),
    },
    {
      name: "fechaFin",
      label: "Fecha Fin",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <span className="text-gray-500">
          {" "}
          {moment(value?.fecha_fin).format(formatDateComplete)}
        </span>
      ),
    },
    {
      name: "acciones",
      label: "Acciones",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <div className="flex items-center">
          <Restricted
            module={ModuleEnums.CAMPOREE}
            typePermisse={PermissionsEnums.VIEW}
          >
            <Tooltip title="Ver detalle">
              <div className="flex-shrink-0 h-10 w-8 ml-5">
                <Link
                  href={`${appRouter.dashboard.href}${appRouter.dashboard.subLinks.camporee.href}/${appRouter.dashboard.subLinks.camporee.subLinks.detail.href}/${value.id}`}
                >
                  <a>
                    <Icon
                      src={Icons.more}
                      fill="var(--color-primary)"
                      className="max-w-[50px] w-8 cursor-pointer"
                    />
                  </a>
                </Link>
              </div>
            </Tooltip>
          </Restricted>
        </div>
      ),
    },
  ];

  const values = get(response, "data.data", []);
  const total = get(response, "data.total", 1);
  const currentPage = get(response, "data.page", 1);
  const limit = get(response, "data.limit", params.limit);

  console.log("los value", values);
  const onResponseData = () => {
    refetch();
  };
  React.useEffect(() => {
    subject
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(1000),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        // switch to new search observable each time the term changes
        map((term: string) => {
          if (isEmpty(term)) {
            updateQuery("search", undefined);
          } else {
            updateQuery("search", term);
          }
          updateQuery("page", undefined);
        })
      )
      .subscribe(onResponseData);

    return () => subject.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (!isNil(params.search) && !isEmpty(params.search)) {
      setValueForm("search", params.search);
      updateQuery("page", undefined);
    }
  }, []);

  const handleChangeSearch = (e: any) => {
    const value = e.target.value;
    setOnSearch(true);
    return subject.next(value);
  };

  return (
    <LayoutDashboard title="Camporee">
      <div className="lg:px-20 mt-12">
        {isLoading && !onSearch ? (
          <Spinner type="loadingPage" className="py-10" />
        ) : (
          <>
            <Help showModal={showHelp} />

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
                <Restricted
                  module={ModuleEnums.CAMPOREE}
                  typePermisse={PermissionsEnums.ADD}
                >
                  <div className="px-2" onClick={showCreate}>
                    <Button
                      labelProps="text-sm text-[black] font-bold"
                      label={"Añadir"}
                      fill
                      boderRadius="rounded-full"
                      size="full"
                      type="submit"
                      sizesButton="py-3"
                      className="bg-yellow w-[100px]"
                    />
                  </div>
                </Restricted>
              </div>
            </form>
            {isLoading ? (
              <Spinner type="loadingPage" className="py-10" />
            ) : (
              <DataTableComponent
                columns={columns}
                data={values}
                currentPage={parseInt(currentPage)}
                total={parseInt(total)}
                limit={parseInt(limit)}
                setPage={(value) => updateQuery("page", value)}
              />
            )}
          </>
        )}
      </div>
      <ModalCreate isShow={isShowCreate}>
        <CreateCamporee hide={hideCreate} refetch={refetch} />
      </ModalCreate>
      <ModalHelp isShow={isShowHelp}>
        <HelpListCamporee hide={hideHelp} />
      </ModalHelp>
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
    ModuleEnums.CLUBES
  );

  if (session && session.accessToken && isValid) {
    return {
      props: {},
    };
  }

  if (!isValid) {
    return {
      redirect: {
        destination: "/dashboard/permission-denied",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default CamporeeList;

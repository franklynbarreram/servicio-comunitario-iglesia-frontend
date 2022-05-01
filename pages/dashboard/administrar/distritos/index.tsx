import { InputText } from "components/common/form/input-text";
import { Icon } from "components/icon";
import { LayoutDashboard } from "components/layout";
import { Icons } from "consts";
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

const Distritos = () => {
  const { Modal, hide, isShow, show } = useModal();
  const {
    Modal: ModalEdit,
    hide: hideEdit,
    isShow: isShowEdit,
    show: showEdit,
  } = useModal();

  const {
    Modal: ModalView,
    hide: hideView,
    isShow: isShowView,
    show: showView,
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
  } = useQuery<any>([UseQueryEnums.GET_ALL_CONSEJOS_REGIONALES, params], () =>
    DistritosServices.getAll(params)
  );
  const updateQuery = (key: string, value: number | string | undefined) => {
    setValue({ [key]: value });
  };

  console.log("all distritos", response);
  React.useEffect(() => {
    // ConsejosRegionalesServices.getAll()
    //   .then((response: any) => {
    //     console.log("response get consejos regionales:", response);
    //   })
    //   .catch((e: any) => {
    //     console.log("Error: ", e);
    //   });
  }, []);

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

  const handleOnEdit = (selected: any) => {
    const findSelected = response?.data?.data?.find(
      (item: any) => item.id === selected.id
    );
    setDataEdit(findSelected);
    showEdit();
  };

  const handleOnView = (selected: any) => {
    const findSelected = response?.data?.data?.find(
      (item: any) => item.id === selected.id
    );
    setDataView(findSelected);
    showView();
  };

  const columns: TableColumnType[] = [
    {
      name: "nombre",
      label: "Nombre",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <span className="text-gray-500 capitalize">{value?.nombre}</span>
      ),
      // <IconWithText icon={value?.logo} text={value?.nombre} />
    },
    {
      name: "consejoRegional",
      label: "Consejo Regional",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <span className="text-gray-500 capitalize">
          {value?.consejo_regional}
        </span>
      ),
      // <IconWithText icon={value?.logo} text={value?.nombre} />
    },

    {
      name: "pastor",
      label: "Pastor",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <IconWithText icon={value?.foto_pastor} text={value?.pastor} isUser />
      ),
    },
    {
      name: "nro_iglesias",
      label: " Nro. Iglesias",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <span className="text-gray-500">{value.nro_iglesias}</span>
      ),
    },
    {
      name: "nro_clubes",
      label: " Nro. Clubes",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <span className="text-gray-500">{value.nro_clubes}</span>
      ),
    },
    {
      name: "nro_conquistadores",
      label: " Nro. Conquis",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <span className="text-gray-500">{value.nro_conquistadores}</span>
      ),
    },
    {
      name: "nro_gm",
      label: " Nro. GM",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <span className="text-gray-500">{value.nro_gm}</span>
      ),
    },
    {
      name: "acciones",
      label: "Acciones",
      thClassName: HeaderClassName,
      tdClassName: DataClassName,
      selector: (value: any) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-8">
            <Icon
              src={Icons.edit}
              fill="white"
              className="max-w-[50px] w-8 text-primary cursor-pointer"
              onClick={() => handleOnEdit(value)}
            />
          </div>
          <div className="flex-shrink-0 h-10 w-8 ml-5">
            <Icon
              src={Icons.more}
              fill="var(--color-primary)"
              className="max-w-[50px] w-8 cursor-pointer"
              onClick={() => handleOnView(value)}
            />
          </div>
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
          updateQuery("search", term);
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
    <LayoutDashboard title="Distritos">
      <div className="px-20 mt-12">
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
                <div className="px-2" onClick={show}>
                  <Icon
                    src={Icons.addUser}
                    fill="var(--color-primary)"
                    className="max-w-[50px] w-12 cursor-pointer"
                  />
                </div>
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
      <Modal isShow={isShow}>
        <CreateDistrito hide={hide} refetch={refetch} />
      </Modal>
      <ModalEdit isShow={isShowEdit}>
        <EditDistrito hide={hideEdit} data={dataEdit} refetch={refetch} />
      </ModalEdit>
      <ModalView isShow={isShowView}>
        <ViewDistrito hide={hideView} data={dataView} refetch={refetch} />
      </ModalView>
    </LayoutDashboard>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session.accessToken) {
    return {
      props: {},
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default Distritos;

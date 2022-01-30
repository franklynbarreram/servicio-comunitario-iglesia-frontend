import { InputText } from "components/common/form/input-text";
import { Icon } from "components/icon";
import { LayoutDashboard } from "components/layout";
import { Icons } from "consts";
import { useModal } from "hooks/modal";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";
import { useForm } from "react-hook-form";
import TableFederacion from "components/administrar/federaciones/list/";
import CreateFederacion from "components/administrar/federaciones/create/";

// import Image from "next/image";
const Federaciones = () => {
  const { Modal, hide, isShow, show } = useModal();
  const data = [
    {
      federacion: {
        nombre: "Jane Cooper",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },

      presidenteConsejo: {
        nombre: "Jhon Doe",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      nroIglesias: 2,
      nroClubes: 2,
      nroConquis: 2,
      nroGM: 2,
      role: "Admin",
      email: "jane.cooper@example.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      federacion: {
        nombre: "Jane Cooper",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },

      presidenteConsejo: {
        nombre: "Jhon Doe",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      nroIglesias: 2,
      nroClubes: 2,
      nroConquis: 2,
      nroGM: 2,
      role: "Admin",
      email: "jane.cooper@example.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      federacion: {
        nombre: "Jane Cooper",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },

      presidenteConsejo: {
        nombre: "Jhon Doe",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      nroIglesias: 2,
      nroClubes: 2,
      nroConquis: 2,
      nroGM: 2,
      role: "Admin",
      email: "jane.cooper@example.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const handleSubmitData = (data: any) => {
    console.log(data);
  };

  return (
    <LayoutDashboard title="Federaciones">
      <div className="px-20 mt-12">
        <form
          className="w-full text-left"
          onSubmit={handleSubmit(handleSubmitData)}
        >
          <div className="flex justify-center items-center mb-5">
            <InputText
              name="search"
              title="Search"
              labelVisible={false}
              isFill={!!watch("serch")}
              register={register}
              // rules={rules.search}
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
        <TableFederacion data={data} />
      </div>
      <Modal isShow={isShow}>
        <CreateFederacion hide={hide} />
      </Modal>
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

export default Federaciones;

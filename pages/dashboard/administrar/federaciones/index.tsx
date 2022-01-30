import { InputText } from "components/common/form/input-text";
import { Icon } from "components/icon";
import { LayoutDashboard } from "components/layout";
import { Icons } from "consts";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";
import { useForm } from "react-hook-form";
// import Image from "next/image";
const Federaciones = () => {
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
    formState: { isDirty, isValid, errors },
    watch,
  } = useForm({ mode: "onChange" });
  const rules = {
    search: {
      required: { value: true, message: "This is required" },
    },
  };

  const handleSubmitData = (data: any) => {
    // setIsLoading(true);
    // signIn("credentials", {
    //   redirect: false,
    //   email: data.email,
    //   password: data.password,
    //   callbackUrl: "/dashboard",
    // })
    //   .then((response) => {
    //     if (response?.error) {
    //       addToast(response.error, { appearance: "error" });
    //     } else {
    //       router.push("/dashboard");
    //     }
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <LayoutDashboard title="Federaciones">
      <div className="px-20">
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
            <div className="px-2">
              {/* <svg src={Icons.addUser} className="max-w-[50px] w-12" alt="add" /> */}
              <Icon
                src={Icons.addUser}
                fill="var(--color-primary)"
                className="max-w-[50px] w-12"
              />
              {/* <Image src={Icons.addUser} /> */}
            </div>
          </div>
        </form>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-md overflow-hidden border-b border-gray-200 rounded-10">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-yellow">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                      >
                        Presidente de Consejo
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                      >
                        Nro. <br /> Iglesias
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                      >
                        Nro. <br /> Clubes
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                      >
                        Nro. <br /> Conquis
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                      >
                        Nro. <br /> GM
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={item.federacion.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-5">
                              <div className="text-sm font-medium text-gray-900">
                                {item.federacion.nombre}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={item.presidenteConsejo.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-5">
                              <div className="text-sm font-medium text-gray-900">
                                {item.presidenteConsejo.nombre}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.nroIglesias}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.nroClubes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.nroConquis}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.nroGM}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-primary">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-8">
                              <Icon
                                src={Icons.edit}
                                fill="white"
                                className="max-w-[50px] w-8"
                              />
                            </div>
                            <div className="flex-shrink-0 h-10 w-8 ml-5">
                              <Icon
                                src={Icons.more}
                                fill="var(--color-primary)"
                                className="max-w-[50px] w-8"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
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

import Modal from "antd/lib/modal/Modal";
import clsx from "clsx";
import { Button } from "components/common/button";
import { Spinner } from "components/common/spinner/spinner";
import { Typography } from "components/common/typography";
import { IconWithText } from "components/icon-with-text";
import { LayoutDashboard } from "components/layout";
import EditProfile from "components/profile/edit";
import { useModal } from "hooks/modal";
import { useUser } from "hooks/user";
import { ValidateImage, ValidateString } from "lib/helper";
import { get } from "lodash";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";

const Profile = () => {
  const { Modal, hide, isShow, show } = useModal();
  const profile = useUser();
  const data = get(profile, "data", []);
  const user = get(data, "user", []);
  const isLoading = get(profile, "loading", undefined);

  return (
    <LayoutDashboard title="Perfil">
      <div className="2xl:px-20 mt-12">
        {isLoading ? (
          <Spinner type="loadingPage" className="py-10" />
        ) : (
          <>
            {/* <div className="mb-15 text-right justify-end flex">
              <Button
                labelProps="f-18 font-normal"
                label={"Editar"}
                fill
                boderRadius="rounded-full"
                size="full"
                type="button"
                sizesButton="py-3 max-w-[150px]"
                onClick={show}
              />
            </div> */}
            <div className="item flex flex-col gap-2 text-center justify-center mt-8">
              <img
                src={ValidateImage(user?.foto, true)}
                alt=""
                className="w-28 h-28 mx-auto object-cover object-center rounded-full"
              />
              <Typography
                type="label"
                className={clsx(
                  "ml-3 font-bold mb-2 mt-3 block text-primary text-3xl"
                )}
              >
                {`${user?.nombres} ${user?.apellidos}`}
              </Typography>
            </div>
            <div className="container-form mt-16 gap-x-6 gap-y-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 text-left ">
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Username
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(user?.username)}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Email
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {user?.email}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Cedula
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {user?.cedula}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Dirección
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {user?.direccion}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Estado civil
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(user?.estado_civil)}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Sexo
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(user?.sexo)}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Enfermedades
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(user?.enfermedades)}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Alergias
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(user?.alergias)}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Profesion
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(user?.profesion)}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Tipo de sangre
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(user?.tipo_sangre)}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Telefono
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(user?.telefono)}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Fecha de nacimiento
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(user?.fecha_nacimiendo)}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Fecha de bautizo
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(user?.fecha_bautizo)}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Roles disponibles
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(data?.scopes.join(", "))}
                </Typography>
              </div>
              <div className="item col-span-1">
                <Typography
                  type="label"
                  className={clsx("ml-3 font-bold mb-2 block f-18")}
                >
                  Rol actual
                </Typography>
                <Typography
                  type="span"
                  className={clsx("ml-3 font-normal mb-2 block f-18")}
                >
                  {ValidateString(data?.scope_actual)}
                </Typography>
              </div>
            </div>

            <div className="mt-14 mb-24">
              {data?.club && (
                <>
                  <div className="text-center">
                    <Typography
                      type="label"
                      className={clsx(
                        "ml-3 font-bold mb-2 mt-3 block text-secondary text-3xl"
                      )}
                    >
                      {`Datos de Club`}
                    </Typography>
                  </div>
                  <div className="container-form mt-16  gap-x-6 gap-y-10 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  text-left">
                    <div className="item col-span-1">
                      <Typography
                        type="label"
                        className={clsx("ml-3 font-bold mb-2 block f-18")}
                      >
                        Club
                      </Typography>
                      <Typography
                        type="span"
                        className={clsx("ml-3 font-normal mb-2 block f-18")}
                      >
                        {ValidateString(data?.club)}
                      </Typography>
                    </div>
                    <div className="item col-span-1">
                      <Typography
                        type="label"
                        className={clsx("ml-3 font-bold mb-2 block f-18")}
                      >
                        Cargo
                      </Typography>
                      <Typography
                        type="span"
                        className={clsx("ml-3 font-normal mb-2 block f-18")}
                      >
                        {ValidateString(data?.cargo)}
                      </Typography>
                    </div>
                    <div className="item col-span-1">
                      <Typography
                        type="label"
                        className={clsx("ml-3 font-bold mb-2 block f-18")}
                      >
                        Fecha de inicio
                      </Typography>
                      <Typography
                        type="span"
                        className={clsx("ml-3 font-normal mb-2 block f-18")}
                      >
                        {ValidateString(data?.fecha_inicio)}
                      </Typography>
                    </div>
                    <div className="item col-span-1">
                      <Typography
                        type="label"
                        className={clsx("ml-3 font-bold mb-2 block f-18")}
                      >
                        Fecha de fin
                      </Typography>
                      <Typography
                        type="span"
                        className={clsx("ml-3 font-normal mb-2 block f-18")}
                      >
                        {ValidateString(data?.fecha_fin)}
                      </Typography>
                    </div>
                    <div className="item col-span-1">
                      <Typography
                        type="label"
                        className={clsx("ml-3 font-bold mb-2 block f-18")}
                      >
                        Investiduras
                      </Typography>
                      <Typography
                        type="span"
                        className={clsx("ml-3 font-normal mb-2 block f-18")}
                      >
                        {ValidateString(data?.investiduras)}
                      </Typography>
                    </div>
                    <div className="item col-span-1">
                      <Typography
                        type="label"
                        className={clsx("ml-3 font-bold mb-2 block f-18")}
                      >
                        Nro. especialidades
                      </Typography>
                      <Typography
                        type="span"
                        className={clsx("ml-3 font-normal mb-2 block f-18")}
                      >
                        {ValidateString(data?.nro_especialidades)}
                      </Typography>
                    </div>
                  </div>
                </>
              )}
            </div>
            <Modal isShow={isShow}>
              <EditProfile
                hide={hide}
                refetch={profile?.refetch}
                data={profile}
              />
            </Modal>
          </>
        )}
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

export default Profile;

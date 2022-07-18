import { LayoutDashboard } from "components/layout";
import { useUser } from "hooks/user";
import { get } from "lodash";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";

const Dashboard = () => {
  const user = useUser();
  const profile = get(user, "data.user", []);
  return (
    <LayoutDashboard title="AVSOC">
      <div className="py-4">
        <div className="flex flex-col justify-center">
          <img src="/logos/logo.png" className="mx-auto max-w-[600px]" alt="" />
          <h1 className="f-50 font-bold text-center mt-6">Bienvenido,</h1>
          <h4 className="text-2xl font-bold text-center">
            {profile?.nombres} {profile?.apellidos}
          </h4>
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

export default Dashboard;

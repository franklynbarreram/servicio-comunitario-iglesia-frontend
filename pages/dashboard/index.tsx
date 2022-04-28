import { LayoutDashboard } from "components/layout";
import { useUser } from "hooks/user";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";

const Dashboard = () => {
  const user = useUser();
  console.log(user);
  return (
    <LayoutDashboard title="Dashboard">
      <div className="py-4">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
          <h1 className="f-50 font-bold text-center">Contenido</h1>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log("SESII", session);
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

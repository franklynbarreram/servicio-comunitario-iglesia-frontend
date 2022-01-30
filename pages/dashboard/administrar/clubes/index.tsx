import { LayoutDashboard } from "components/layout";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";

const Clubes = () => {
  return (
    <LayoutDashboard title="Clubes">
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

export default Clubes;

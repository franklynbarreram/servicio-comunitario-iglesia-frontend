import * as React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import PermissionDeniedComponent from "components/permission-denied";

const PermissionDenied = () => {
  return <PermissionDeniedComponent></PermissionDeniedComponent>;
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

export default PermissionDenied;

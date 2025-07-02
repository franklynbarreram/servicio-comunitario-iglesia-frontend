import * as React from "react";
import { GetServerSideProps } from "next";

import PermissionDeniedComponent from "components/permission-denied";
import { getSession } from "lib/helper";

const PermissionDenied = () => {
  return <PermissionDeniedComponent></PermissionDeniedComponent>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context);
  if (session && session.access_token) {
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

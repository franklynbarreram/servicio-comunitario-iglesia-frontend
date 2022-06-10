import { useContext, useState } from "react";
import PermissionContext from "./PermissionContext";

export type Permission = string;

const usePermission = (permission: Permission, module: string) => {
  const { isAllowedTo } = useContext(PermissionContext);
  return isAllowedTo(permission, module);
};

export default usePermission;

import { ModuleEnums } from "./modulesEmuns";
import { PermissionsEnums } from "./permissionsEnum";
import { RoleEnums } from "./rolesEnum";

export const PermissionByRol = [
  {
    role: RoleEnums.LIDER_JUVENIL,
    modules: [
      {
        name: ModuleEnums.DISTRITOS,
        permissionsActions: [
          PermissionsEnums.ADD,
          PermissionsEnums.EDIT,
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
        ],
      },
      {
        name: ModuleEnums.FEDERACIONES,
        permissionsActions: [
          PermissionsEnums.ADD,
          PermissionsEnums.EDIT,
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
        ],
      },
      {
        name: ModuleEnums.IGLESIAS,
        permissionsActions: [
          PermissionsEnums.ADD,
          PermissionsEnums.EDIT,
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
        ],
      },
      {
        name: ModuleEnums.CLUBES,
        permissionsActions: [
          PermissionsEnums.ADD,
          PermissionsEnums.EDIT,
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
        ],
      },
      {
        name: ModuleEnums.MIEMBROS,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
    ],
  },
  {
    role: RoleEnums.DIRECTOR,
    modules: [
      {
        name: ModuleEnums.DISTRITOS,
        permissionsActions: [PermissionsEnums.VIEW, PermissionsEnums.DETAIL],
      },
      {
        name: ModuleEnums.FEDERACIONES,
        permissionsActions: [PermissionsEnums.VIEW, PermissionsEnums.DETAIL],
      },
      {
        name: ModuleEnums.IGLESIAS,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.CLUBES,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.MIEMBROS,
        permissionsActions: [
          PermissionsEnums.ADD,
          PermissionsEnums.EDIT,
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.DAR_DE_BAJA_MIEMBRO,
          PermissionsEnums.DETALLE_MIEMBRO,
        ],
      },
    ],
  },
  {
    role: RoleEnums.PASTOR,
    modules: [
      {
        name: ModuleEnums.DISTRITOS,
        permissionsActions: [PermissionsEnums.VIEW, PermissionsEnums.DETAIL],
      },
      {
        name: ModuleEnums.FEDERACIONES,
        permissionsActions: [PermissionsEnums.VIEW, PermissionsEnums.DETAIL],
      },
      {
        name: ModuleEnums.IGLESIAS,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.CLUBES,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.MIEMBROS,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
    ],
  },
  {
    role: RoleEnums.ANCIANO,
    modules: [
      {
        name: ModuleEnums.DISTRITOS,
        permissionsActions: [PermissionsEnums.VIEW, PermissionsEnums.DETAIL],
      },
      {
        name: ModuleEnums.FEDERACIONES,
        permissionsActions: [PermissionsEnums.VIEW, PermissionsEnums.DETAIL],
      },
      {
        name: ModuleEnums.IGLESIAS,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.CLUBES,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.MIEMBROS,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
    ],
  },
  {
    role: RoleEnums.PERSONA,
    modules: [
      {
        name: ModuleEnums.DISTRITOS,
        permissionsActions: [PermissionsEnums.VIEW, PermissionsEnums.DETAIL],
      },
      {
        name: ModuleEnums.FEDERACIONES,
        permissionsActions: [PermissionsEnums.VIEW, PermissionsEnums.DETAIL],
      },
      {
        name: ModuleEnums.IGLESIAS,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.CLUBES,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.MIEMBROS,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
    ],
  },
  {
    role: RoleEnums.PRESIDENTE_CONSEJO,
    modules: [
      {
        name: ModuleEnums.DISTRITOS,
        permissionsActions: [PermissionsEnums.VIEW, PermissionsEnums.DETAIL],
      },
      {
        name: ModuleEnums.FEDERACIONES,
        permissionsActions: [PermissionsEnums.VIEW, PermissionsEnums.DETAIL],
      },
      {
        name: ModuleEnums.IGLESIAS,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.CLUBES,
        permissionsActions: [
          PermissionsEnums.ADD,
          PermissionsEnums.EDIT,
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
        ],
      },
      {
        name: ModuleEnums.MIEMBROS,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
    ],
  },
];

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
      {
        name: ModuleEnums.CAMPOREE,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.EDIT,
        ],
      },
      {
        name: ModuleEnums.LISTADO_EVENTO_PRECAMPOREE_BY_CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.EVENTO_PRECAMPOREE_DETAIL,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.VIEW_DATA_FORMS,
          PermissionsEnums.LOAD_SCORE,
        ],
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
      {
        name: ModuleEnums.CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.LISTADO_EVENTO_PRECAMPOREE_BY_CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.EVENTO_PRECAMPOREE_DETAIL,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.LOAD_FORMS,
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
      {
        name: ModuleEnums.CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.LISTADO_EVENTO_PRECAMPOREE_BY_CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.EVENTO_PRECAMPOREE_DETAIL,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.VIEW_DATA_FORMS,
          PermissionsEnums.APPROVE_FORM,
        ],
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
      {
        name: ModuleEnums.CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.LISTADO_EVENTO_PRECAMPOREE_BY_CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.EVENTO_PRECAMPOREE_DETAIL,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.VIEW_DATA_FORMS,
          PermissionsEnums.APPROVE_FORM,
        ],
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
        permissionsActions: [],
      },
      {
        name: ModuleEnums.CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.EVENTO_PRECAMPOREE_DETAIL,
        permissionsActions: [],
      },
      {
        name: ModuleEnums.LISTADO_EVENTO_PRECAMPOREE_BY_CAMPOREE,
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
      {
        name: ModuleEnums.CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.LISTADO_EVENTO_PRECAMPOREE_BY_CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.EVENTO_PRECAMPOREE_DETAIL,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.VIEW_DATA_FORMS,
          PermissionsEnums.APPROVE_FORM,
        ],
      },
    ],
  },
];

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
        name: ModuleEnums.EVENTO_PRECAMPOREE,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.ADD,
          PermissionsEnums.EDIT,
          PermissionsEnums.VIEW_DATA_FORMS,
          PermissionsEnums.LOAD_SCORE,
        ],
      },
      {
        name: ModuleEnums.EVENTO_CAMPOREE,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.ADD,
          // PermissionsEnums.INSCRIBIR_CLUB,
          PermissionsEnums.VIEW_CLUBES_INSCRITOS,
          PermissionsEnums.LOAD_SCORE,
          // PermissionsEnums.CHECK_CLASIFICATION,
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
        name: ModuleEnums.EVENTO_PRECAMPOREE,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.LOAD_FORMS,
        ],
      },
      {
        name: ModuleEnums.EVENTO_CAMPOREE,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.INSCRIBIR_CLUB,
          PermissionsEnums.VIEW_CLUBES_INSCRITOS,
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
        name: ModuleEnums.EVENTO_PRECAMPOREE,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.VIEW_DATA_FORMS,
          PermissionsEnums.APPROVE_FORM,
        ],
      },
      {
        name: ModuleEnums.EVENTO_CAMPOREE,
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
      {
        name: ModuleEnums.CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },

      {
        name: ModuleEnums.EVENTO_PRECAMPOREE,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.VIEW_DATA_FORMS,
          PermissionsEnums.APPROVE_FORM,
        ],
      },
      {
        name: ModuleEnums.EVENTO_CAMPOREE,
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
        permissionsActions: [],
      },
      {
        name: ModuleEnums.CAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },

      {
        name: ModuleEnums.EVENTO_PRECAMPOREE,
        permissionsActions: [PermissionsEnums.DETAIL, PermissionsEnums.VIEW],
      },
      {
        name: ModuleEnums.EVENTO_CAMPOREE,
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
        name: ModuleEnums.EVENTO_PRECAMPOREE,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.VIEW_DATA_FORMS,
          PermissionsEnums.APPROVE_FORM,
        ],
      },
      {
        name: ModuleEnums.EVENTO_CAMPOREE,
        permissionsActions: [
          PermissionsEnums.DETAIL,
          PermissionsEnums.VIEW,
          PermissionsEnums.VIEW_CLUBES_INSCRITOS,
          PermissionsEnums.LOAD_SCORE,
          PermissionsEnums.CHECK_CLASIFICATION,
          PermissionsEnums.INSCRIBIR_CLUB,
        ],
      },
    ],
  },
];

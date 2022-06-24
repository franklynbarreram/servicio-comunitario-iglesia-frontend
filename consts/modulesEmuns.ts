export enum ModuleEnums {
  DISTRITOS = "distritos",
  FEDERACIONES = "federaciones",
  IGLESIAS = "iglesias",
  CLUBES = "clubes",
  MIEMBROS = "miembros",
  CAMPOREE = "listado",
  LISTADO_EVENTO_PRECAMPOREE_BY_CAMPOREE = "evento-precamporee",
  EVENTO_PRECAMPOREE_DETAIL = "evento-precamporee-detail",
}

export const ModuleMap = {
  [ModuleEnums.DISTRITOS]: ModuleEnums.DISTRITOS,
  [ModuleEnums.FEDERACIONES]: ModuleEnums.FEDERACIONES,
  [ModuleEnums.IGLESIAS]: ModuleEnums.IGLESIAS,
  [ModuleEnums.CLUBES]: ModuleEnums.CLUBES,
  [ModuleEnums.MIEMBROS]: ModuleEnums.MIEMBROS,
  [ModuleEnums.CAMPOREE]: ModuleEnums.CAMPOREE,
  [ModuleEnums.LISTADO_EVENTO_PRECAMPOREE_BY_CAMPOREE]:
    ModuleEnums.LISTADO_EVENTO_PRECAMPOREE_BY_CAMPOREE,
  [ModuleEnums.EVENTO_PRECAMPOREE_DETAIL]:
    ModuleEnums.EVENTO_PRECAMPOREE_DETAIL,
};

export enum TypesSelectEnums {
  CONQUISTADORES = "conquistadores",
  GUIAS_MAYORES = "guias mayores",
  INTEGRADO = "integrado",
}

export const TypesSelectMap = {
  [TypesSelectEnums.CONQUISTADORES]: TypesSelectEnums.CONQUISTADORES,
  [TypesSelectEnums.GUIAS_MAYORES]: TypesSelectEnums.GUIAS_MAYORES,
  [TypesSelectEnums.INTEGRADO]: TypesSelectEnums.INTEGRADO,
};

export enum TypesSelectCapellanEnums {
  INTERNO = "interno",
  EXTERNO = "externo",
}

export const TypesSelectCapellanMap = {
  [TypesSelectCapellanEnums.INTERNO]: TypesSelectCapellanEnums.INTERNO,
  [TypesSelectCapellanEnums.EXTERNO]: TypesSelectCapellanEnums.EXTERNO,
};

export enum TypesSelectYesOrNot {
  SI = "si",
  NO = "no",
}

export const TypesSelectYesOrNotMap = {
  [TypesSelectYesOrNot.SI]: TypesSelectYesOrNot.SI,
  [TypesSelectYesOrNot.NO]: TypesSelectYesOrNot.NO,
};

export enum TypesSelectCamporeeEnums {
  EVENTO_BIBLICO = "evento bíblico",
  EVENTO_PIONERISMO = "evento de pionerismo",
  EVENTO_DEPORTIVO = "evento deportivo",
  EVENTO_ESPECIAL = "evento especial",
}

export const TypesSelectCamporeeMap = {
  [TypesSelectCamporeeEnums.EVENTO_BIBLICO]:
    TypesSelectCamporeeEnums.EVENTO_BIBLICO,
  [TypesSelectCamporeeEnums.EVENTO_PIONERISMO]:
    TypesSelectCamporeeEnums.EVENTO_PIONERISMO,
  [TypesSelectCamporeeEnums.EVENTO_DEPORTIVO]:
    TypesSelectCamporeeEnums.EVENTO_DEPORTIVO,
  [TypesSelectCamporeeEnums.EVENTO_ESPECIAL]:
    TypesSelectCamporeeEnums.EVENTO_ESPECIAL,
};

export enum TypesSelectTypoEventoCamporeeEnums {
  FEDERACION = "Federación",
  CLUBES = "Clubes",
}

export const TypesSelectTypoEventoCamporeeMap = {
  [TypesSelectTypoEventoCamporeeEnums.FEDERACION]:
    TypesSelectTypoEventoCamporeeEnums.FEDERACION,
  [TypesSelectTypoEventoCamporeeEnums.CLUBES]:
    TypesSelectTypoEventoCamporeeEnums.CLUBES,
};

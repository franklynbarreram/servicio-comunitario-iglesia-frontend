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
  EVENTO_BIBLICO = "evento biblico",
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

export enum TypesSelectSexoEnums {
  HOMBRES = "hombres",
  MUJERES = "mujeres",
  AMBOS = "ambos",
  SIN_DISTINCION = "sin distincion",
}

export const TypesSelectSexoMap = {
  [TypesSelectSexoEnums.HOMBRES]: TypesSelectSexoEnums.HOMBRES,
  [TypesSelectSexoEnums.MUJERES]: TypesSelectSexoEnums.MUJERES,
  [TypesSelectSexoEnums.AMBOS]: TypesSelectSexoEnums.AMBOS,
  [TypesSelectSexoEnums.SIN_DISTINCION]: TypesSelectSexoEnums.SIN_DISTINCION,
};

export enum TypesSelectSexoRegisterEnums {
  MASCULINO = "Masculino",
  FEMENINO = "femenino",
}

export const TypesSelectSexoRegisterMap: any = {
  [TypesSelectSexoRegisterEnums.MASCULINO]: "M",
  [TypesSelectSexoRegisterEnums.FEMENINO]: "F",
};

export enum TypesSelectEstadoCivilEnums {
  SOLTERO = "Soltero(a)",
  CASADO = "Casado(a)",
  DIVORCIADO = "Divorciado(a)",
  VIUDO = "Viudo(a)",
}

export const TypesSelectEstadoCivilMap: any = {
  [TypesSelectEstadoCivilEnums.SOLTERO]: "S",
  [TypesSelectEstadoCivilEnums.CASADO]: "C",
  [TypesSelectEstadoCivilEnums.DIVORCIADO]: "D",
  [TypesSelectEstadoCivilEnums.VIUDO]: "V",
};

export enum TypesSelectSangreEnums {
  A_NEGATIVO = "A-",
  A_POSITIVO = "A+",
  B_NEGATIVO = "B-",
  B_POSITIVO = "B+",
  AB_NEGATIVO = "AB-",
  AB_POSITIVO = "AB+",
  O_POSITIVO = "O+",
  O_NEGATIVO = "O-",
}

export const TypesSelectSangreMap = {
  [TypesSelectSangreEnums.A_NEGATIVO]: TypesSelectSangreEnums.A_NEGATIVO,
  [TypesSelectSangreEnums.A_POSITIVO]: TypesSelectSangreEnums.A_POSITIVO,
  [TypesSelectSangreEnums.B_NEGATIVO]: TypesSelectSangreEnums.B_NEGATIVO,
  [TypesSelectSangreEnums.B_POSITIVO]: TypesSelectSangreEnums.B_POSITIVO,
  [TypesSelectSangreEnums.AB_NEGATIVO]: TypesSelectSangreEnums.AB_NEGATIVO,
  [TypesSelectSangreEnums.AB_POSITIVO]: TypesSelectSangreEnums.AB_POSITIVO,
  [TypesSelectSangreEnums.O_POSITIVO]: TypesSelectSangreEnums.O_POSITIVO,
  [TypesSelectSangreEnums.O_NEGATIVO]: TypesSelectSangreEnums.O_NEGATIVO,
};

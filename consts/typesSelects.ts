import { OptionType } from "interfaces";
import {
  TypesSelectCamporeeEnums,
  TypesSelectCamporeeMap,
  TypesSelectCapellanEnums,
  TypesSelectEnums,
  TypesSelectEstadoCivilEnums,
  TypesSelectInformesMensualesEnums,
  TypesSelectSangreEnums,
  TypesSelectSexoEnums,
  TypesSelectSexoRegisterEnums,
  TypesSelectTypoEventoCamporeeEnums,
  TypesSelectTypoEventoCamporeeMap,
  TypesSelectYesOrNot,
  TypesSelectYesOrNotMap,
} from "./typesSelectEnum";

export const optionsType: OptionType[] = [
  {
    id: 1,
    text: TypesSelectEnums.CONQUISTADORES,
    value: TypesSelectEnums.CONQUISTADORES,
    disabled: false,
    placeholder: false,
  },
  {
    id: 2,
    text: TypesSelectEnums.GUIAS_MAYORES,
    value: TypesSelectEnums.GUIAS_MAYORES,
    disabled: false,
    placeholder: false,
  },
  {
    id: 3,
    text: TypesSelectEnums.INTEGRADO,
    value: TypesSelectEnums.INTEGRADO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 4,
    text: TypesSelectEnums.AVENTUREROS,
    value: TypesSelectEnums.AVENTUREROS,
    disabled: false,
    placeholder: false,
  },
];

export const optionsTypeInformesMensuales: OptionType[] = [
  {
    id: 1,
    text: TypesSelectInformesMensualesEnums.REGULAR,
    value: TypesSelectInformesMensualesEnums.REGULAR,
    disabled: false,
    placeholder: false,
  },
  {
    id: 2,
    text: TypesSelectInformesMensualesEnums.RECREATIVA,
    value: TypesSelectInformesMensualesEnums.RECREATIVA,
    disabled: false,
    placeholder: false,
  },
  {
    id: 3,
    text: TypesSelectInformesMensualesEnums.ESPIRITUAL,
    value: TypesSelectInformesMensualesEnums.ESPIRITUAL,
    disabled: false,
    placeholder: false,
  },
  {
    id: 4,
    text: TypesSelectInformesMensualesEnums.MISIONERA,
    value: TypesSelectInformesMensualesEnums.MISIONERA,
    disabled: false,
    placeholder: false,
  },
  {
    id: 5,
    text: TypesSelectInformesMensualesEnums.EDUCATIVA,
    value: TypesSelectInformesMensualesEnums.EDUCATIVA,
    disabled: false,
    placeholder: false,
  },
];

export const optionsTypeCategoryCamporee: OptionType[] = [
  {
    id: 1,
    text: TypesSelectCamporeeEnums.EVENTO_BIBLICO,
    value: TypesSelectCamporeeEnums.EVENTO_BIBLICO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 2,
    text: TypesSelectCamporeeEnums.EVENTO_PIONERISMO,
    value: TypesSelectCamporeeEnums.EVENTO_PIONERISMO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 3,
    text: TypesSelectCamporeeEnums.EVENTO_DEPORTIVO,
    value: TypesSelectCamporeeEnums.EVENTO_DEPORTIVO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 4,
    text: TypesSelectCamporeeEnums.EVENTO_ESPECIAL,
    value: TypesSelectCamporeeEnums.EVENTO_ESPECIAL,
    disabled: false,
    placeholder: false,
  },
];

export const optionsTypeCapellan: OptionType[] = [
  {
    id: 1,
    text: TypesSelectCapellanEnums.INTERNO,
    value: TypesSelectCapellanEnums.INTERNO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 2,
    text: TypesSelectCapellanEnums.EXTERNO,
    value: TypesSelectCapellanEnums.EXTERNO,
    disabled: false,
    placeholder: false,
  },
];

export const optionsTypeYesOrNot: OptionType[] = [
  {
    id: 1,
    text: TypesSelectYesOrNot.SI,
    value: TypesSelectYesOrNot.SI,
    disabled: false,
    placeholder: false,
  },
  {
    id: 2,
    text: TypesSelectYesOrNot.NO,
    value: TypesSelectYesOrNot.NO,
    disabled: false,
    placeholder: false,
  },
];

export const optionsTypeEventCamporee: OptionType[] = [
  {
    id: 1,
    text: TypesSelectTypoEventoCamporeeEnums.FEDERACION,
    value: TypesSelectTypoEventoCamporeeEnums.FEDERACION,
    disabled: false,
    placeholder: false,
  },
  {
    id: 2,
    text: TypesSelectTypoEventoCamporeeEnums.CLUBES,
    value: TypesSelectTypoEventoCamporeeEnums.CLUBES,
    disabled: false,
    placeholder: false,
  },
];

export const optionsTypeSexo: OptionType[] = [
  {
    id: 1,
    text: TypesSelectSexoEnums.HOMBRES,
    value: TypesSelectSexoEnums.HOMBRES,
    disabled: false,
    placeholder: false,
  },
  {
    id: 2,
    text: TypesSelectSexoEnums.MUJERES,
    value: TypesSelectSexoEnums.MUJERES,
    disabled: false,
    placeholder: false,
  },
  {
    id: 3,
    text: TypesSelectSexoEnums.AMBOS,
    value: TypesSelectSexoEnums.AMBOS,
    disabled: false,
    placeholder: false,
  },
  {
    id: 4,
    text: TypesSelectSexoEnums.SIN_DISTINCION,
    value: TypesSelectSexoEnums.SIN_DISTINCION,
    disabled: false,
    placeholder: false,
  },
];

export const optionsTypeSexoMasculinoAndFemenino: OptionType[] = [
  {
    id: 1,
    text: TypesSelectSexoRegisterEnums.MASCULINO,
    value: TypesSelectSexoRegisterEnums.MASCULINO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 2,
    text: TypesSelectSexoRegisterEnums.FEMENINO,
    value: TypesSelectSexoRegisterEnums.FEMENINO,
    disabled: false,
    placeholder: false,
  },
];

export const optionsTypeEstadoCivil: OptionType[] = [
  {
    id: 1,
    text: TypesSelectEstadoCivilEnums.SOLTERO,
    value: TypesSelectEstadoCivilEnums.SOLTERO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 2,
    text: TypesSelectEstadoCivilEnums.CASADO,
    value: TypesSelectEstadoCivilEnums.CASADO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 3,
    text: TypesSelectEstadoCivilEnums.DIVORCIADO,
    value: TypesSelectEstadoCivilEnums.DIVORCIADO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 4,
    text: TypesSelectEstadoCivilEnums.VIUDO,
    value: TypesSelectEstadoCivilEnums.VIUDO,
    disabled: false,
    placeholder: false,
  },
];

export const optionsTypesSangre: OptionType[] = [
  {
    id: 1,
    text: TypesSelectSangreEnums.A_POSITIVO,
    value: TypesSelectSangreEnums.A_POSITIVO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 2,
    text: TypesSelectSangreEnums.A_NEGATIVO,
    value: TypesSelectSangreEnums.A_NEGATIVO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 3,
    text: TypesSelectSangreEnums.B_POSITIVO,
    value: TypesSelectSangreEnums.B_POSITIVO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 4,
    text: TypesSelectSangreEnums.B_NEGATIVO,
    value: TypesSelectSangreEnums.B_NEGATIVO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 5,
    text: TypesSelectSangreEnums.AB_POSITIVO,
    value: TypesSelectSangreEnums.AB_POSITIVO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 6,
    text: TypesSelectSangreEnums.AB_NEGATIVO,
    value: TypesSelectSangreEnums.AB_NEGATIVO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 7,
    text: TypesSelectSangreEnums.O_POSITIVO,
    value: TypesSelectSangreEnums.O_POSITIVO,
    disabled: false,
    placeholder: false,
  },
  {
    id: 8,
    text: TypesSelectSangreEnums.O_NEGATIVO,
    value: TypesSelectSangreEnums.O_NEGATIVO,
    disabled: false,
    placeholder: false,
  },
];

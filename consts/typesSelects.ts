import { OptionType } from "interfaces";
import {
  TypesSelectCamporeeEnums,
  TypesSelectCamporeeMap,
  TypesSelectCapellanEnums,
  TypesSelectEnums,
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

import { OptionType } from "interfaces";
import { TypesSelectCapellanEnums, TypesSelectEnums } from "./typesSelectEnum";

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

export enum CategoryType {
  TOTAL = "total",
  EVENTOS = "eventos",
  EVENTOS_BIBLICOS = "eventos_biblicos",
  EVENTOS_PIONERISMO = "eventos_pionerismo",
  EVENTOS_ESPECIALES = "eventos_especiales",
  EVENTOS_PRECAMPOREE = "eventos_precamporee",
  INFORMES_MENSUALES = "informes_mensuales",
}

export const CategoryTypeMap = {
  [CategoryType.TOTAL]: "Total",
  [CategoryType.EVENTOS]: "Eventos",
  [CategoryType.EVENTOS_BIBLICOS]: "Eventos Biblicos",
  [CategoryType.EVENTOS_PIONERISMO]: "Eventos Pionerismo",
  [CategoryType.EVENTOS_ESPECIALES]: "Eventos Especiales",
  [CategoryType.EVENTOS_PRECAMPOREE]: "Eventos Precamporee",
  [CategoryType.INFORMES_MENSUALES]: "Informes Mensuales",
};

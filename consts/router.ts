export const appRouter = {
  dashboard: {
    href: "/dashboard",
    cards: { href: "" },
    subLinks: {
      administrar: {
        href: "/administrar",
        subLinks: {
          federaciones: { href: "federaciones" },
          distritos: { href: "distritos" },
          iglesias: { href: "iglesias" },
          clubes: { href: "clubes" },
          miembros: { href: "miembros" },
        },
      },
      estadisticas: {
        href: "/estadisticas",
      },
      camporee: {
        href: "/camporee",
      },
      especialidades: {
        href: "/especialidades",
      },
    },
  },
};

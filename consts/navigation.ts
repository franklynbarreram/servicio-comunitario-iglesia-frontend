import { Icons } from "consts/icons";
import { appRouter } from "consts/router";

export const navigation = [
  {
    id: 1,
    label: "Dashboard",
    subNavigation: [
      {
        id: 1,
        name: "administrar",
        label: "Administrar",
        href: `${appRouter.dashboard.subLinks.administrar.href}`,
        icon: Icons.administrar,
        dropdownVisible: false,
        dropdown: [
          {
            name: "federaciones",
            label: "Federaciones",
            href: `${appRouter.dashboard.subLinks.administrar.href}/${appRouter.dashboard.subLinks.administrar.subLinks.federaciones.href}`,
            icon: Icons.card,
          },
          {
            name: "distritos",
            label: "Distritos",
            href: `${appRouter.dashboard.subLinks.administrar.href}/${appRouter.dashboard.subLinks.administrar.subLinks.distritos.href}`,
            icon: Icons.card,
          },
          {
            name: "iglesias",
            label: "Iglesias",
            href: `${appRouter.dashboard.subLinks.administrar.href}/${appRouter.dashboard.subLinks.administrar.subLinks.iglesias.href}`,
            icon: Icons.card,
          },
          {
            name: "clubes",
            label: "Clubes",
            href: `${appRouter.dashboard.subLinks.administrar.href}/${appRouter.dashboard.subLinks.administrar.subLinks.clubes.href}`,
            icon: Icons.card,
          },
          {
            name: "miembros",
            label: "Miembros",
            href: `${appRouter.dashboard.subLinks.administrar.href}/${appRouter.dashboard.subLinks.administrar.subLinks.miembros.href}`,
            icon: Icons.card,
          },
        ],
      },
      {
        id: 2,
        name: "estadisticas",
        label: "Estadísticas",
        href: `${appRouter.dashboard.subLinks.estadisticas.href}`,
        icon: Icons.estadisticas,
      },
      {
        id: 3,
        name: "camporee",
        label: "Camporee",
        href: `${appRouter.dashboard.subLinks.camporee.href}`,
        icon: Icons.card,
        dropdownVisible: false,
        dropdown: [
          {
            name: "resultados",
            label: "Resultados",
            href: `${appRouter.dashboard.href}`,
            icon: Icons.card,
          },
          {
            name: "eventos",
            label: "Eventos",
            href: `${appRouter.dashboard.href}`,
            icon: Icons.card,
          },
          {
            name: "precamporee",
            label: "Precamporee",
            href: `${appRouter.dashboard.href}`,
            icon: Icons.card,
          },
        ],
      },
      {
        id: 4,
        name: "especialidades",
        label: "Especialidades",
        href: `${appRouter.dashboard.subLinks.especialidades.href}`,
        icon: Icons.card,
      },
    ],
  },
];

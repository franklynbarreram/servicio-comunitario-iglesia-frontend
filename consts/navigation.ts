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
        name: "camporee",
        label: "Camporee",
        href: `${appRouter.dashboard.subLinks.camporee.href}`,
        icon: Icons.camporee,
        dropdownVisible: false,
        dropdown: [
          {
            name: "listado-camporee",
            label: "Listado",
            href: `${appRouter.dashboard.subLinks.camporee.href}/${appRouter.dashboard.subLinks.camporee.subLinks.listaCamporee.href}`,
            icon: Icons.card,
          },
        ],
      },
    ],
  },
];

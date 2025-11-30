// assets
import {
  IconKey,
  IconSchool,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

const icons = { IconKey, IconSchool, IconSettings, IconUsers };

const rhMenu = {
  id: "rh",
  title: "RH",
  icon: icons.IconUsers,
  type: "group",
  children: [
    {
      id: "personnel",
      title: "Gestion du personnel",
      type: "item",
      icon: icons.IconUsers,
      url: "/rh/personnel",
    },
    {
      id: "presences",
      title: "Présences",
      type: "item",
      icon: icons.IconKey,
      url: "/rh/presences",
    },
    {
      id: "salaires",
      title: "Salaires",
      type: "item",
      icon: icons.IconSettings,
      url: "/rh/salaires",
    },
    {
      id: "planning",
      title: "Planning & Emploi du temps",
      type: "item",
      icon: icons.IconSchool,
      url: "/rh/planning",
    },
    {
      id: "documents",
      title: "Documents RH",
      type: "item",
      icon: icons.IconKey,
      url: "/rh/documents",
    },
    {
      id: "conges",
      title: "Gestion des congés",
      type: "item",
      icon: icons.IconSettings,
      url: "/rh/conges",
    },
    {
      id: "evaluations",
      title: "Évaluations du personnel",
      type: "item",
      icon: icons.IconUsers,
      url: "/rh/evaluations",
    },
  ],
};

export default rhMenu;

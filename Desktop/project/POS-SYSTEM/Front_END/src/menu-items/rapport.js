// assets
import {
  IconKey,
  IconUserPlus,
  IconCash,
  IconTruck,
  IconFileText,
} from "@tabler/icons-react";

// constant
const icons = {
  IconKey,
  IconUserPlus,
  IconCash,
  IconTruck,
  IconFileText,
};

const rapport = {
  id: "rapport",
  title: "Rapport",
  caption: "option",
  icon: icons.IconKey,
  type: "group",
  children: [
    {
      id: "inscription_rapport",
      title: "Inscription",
      type: "collapse",
      icon: icons.IconUserPlus,
      children: [
        {
          id: "inscription_page",
          title: "Inscription",
          type: "item",
          url: "/rapport/inscription",
          target: false,
        },
      ],
    },
    {
      id: "finance_rapport",
      title: "Finance",
      type: "collapse",
      icon: icons.IconCash,
      children: [
        {
          id: "finance_page",
          title: "Finance",
          type: "item",
          url: "/rapport/finance",
          target: false,
        },
      ],
    },
    {
      id: "logistique_rapport",
      title: "Logistique",
      type: "collapse",
      icon: icons.IconTruck,
      children: [
        {
          id: "logistique_page",
          title: "Logistique",
          type: "item",
          url: "/rapport/logistique",
          target: false,
        },
      ],
    },
    {
      id: "autre_rapport",
      title: "Autre",
      type: "collapse",
      icon: icons.IconFileText,
      children: [
        {
          id: "autre_page",
          title: "Autre",
          type: "item",
          url: "/rapport/autre",
          target: false,
        },
      ],
    },
  ],
};

export default rapport;

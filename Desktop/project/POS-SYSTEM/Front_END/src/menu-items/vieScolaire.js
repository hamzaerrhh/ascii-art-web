// assets
import {
  IconKey,
  IconUserPlus,
  IconCalendarEvent,
  IconCash,
  IconFileText,
  IconAutomation,
  IconSchool,
} from "@tabler/icons-react";

// constant
const icons = {
  IconKey,
  IconUserPlus,
  IconCalendarEvent,
  IconCash,
  IconFileText,
  IconAutomation,
  IconSchool,
};

const vieScolaire = {
  id: "vie_scolaire",
  title: "Vie Scolaire",
  caption: "option",
  icon: icons.IconKey,
  type: "group",
  children: [
    {
      id: "inscription",
      title: "Inscription",
      type: "collapse",
      icon: icons.IconUserPlus,
      children: [
        {
          id: "inscription_simple",
          title: "Inscription",
          type: "item",
          url: "/vie-scolaire/inscription",
          target: false,
        },
        {
          id: "inscription_automatique",
          title: "Inscription Automatique",
          type: "item",
          url: "/vie-scolaire/inscription-automatique",
          target: false,
        },
      ],
    },
    {
      id: "planification",
      title: "Planification",
      type: "collapse",
      icon: icons.IconCalendarEvent,
      children: [
        {
          id: "planification_generale",
          title: "Planification",
          type: "item",
          url: "/planification",
          target: false,
        },
      ],
    },
    {
      id: "paiment",
      title: "Paiment",
      type: "collapse",
      icon: icons.IconCash,
      children: [
        {
          id: "paiment_factures",
          title: "Paiment",
          type: "item",
          url: "/paiement",
          target: false,
        },
      ],
    },
    {
      id: "controle_contenue",
      title: "Contrôle Contenue",
      type: "collapse",
      icon: icons.IconFileText,
      children: [
        {
          id: "controle",
          title: "Contrôle Contenue",
          type: "item",
          url: "/controle-contenue",
          target: false,
        },
      ],
    },
    {
      id: "masar",
      title: "Masar",
      type: "collapse",
      icon: icons.IconSchool,
      children: [
        {
          id: "masar_page",
          title: "Massar",
          type: "item",
          url: "/massar",
          target: false,
        },
      ],
    },
  ],
};

export default vieScolaire;

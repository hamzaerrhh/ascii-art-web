// assets
import {
  IconKey,
  IconSchool,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

// constant
const icons = {
  IconKey,
  IconSchool,
  IconSettings,
  IconUsers,
};

const pilotage = {
  id: "pilotage",
  title: "Pilotage",
  caption: "option",
  icon: icons.IconKey,
  type: "group",
  children: [
    {
      id: "school",
      title: "School",
      type: "collapse",
      icon: icons.IconSchool,
      children: [
        {
          id: "school_page",
          title: "School",
          type: "item",
          url: "/pilotage/school",
          target: false,
        },
      ],
    },
    {
      id: "gestion_generale",
      title: "Gestion Générale",
      type: "collapse",
      icon: icons.IconSettings,
      children: [
        {
          id: "gestion_page",
          title: "Gestion Générale",
          type: "item",
          url: "/pilotage/gestion-generale",
          target: false,
        },
      ],
    },
  ],
};

export default pilotage;

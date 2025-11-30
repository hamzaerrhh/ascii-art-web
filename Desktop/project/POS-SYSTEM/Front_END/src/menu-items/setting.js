// assets
import {
  IconKey,
  IconSchool,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

const icons = { IconKey, IconSchool, IconSettings, IconUsers };

const settings = {
  id: "settings",
  title: "Settings",
  icon: icons.IconSettings,
  type: "group",
  children: [
    {
      id: "payment",
      title: "Payment",
      type: "item",
      icon: icons.IconKey,
      url: "/settings/payment",
    },
    {
      id: "student",
      title: "Student",
      type: "item",
      icon: icons.IconUsers,
      url: "/settings/student",
    },
    {
      id: "relances",
      title: "Notifications",
      type: "item",
      icon: icons.IconSettings,
      url: "/settings/relances",
    },
    {
      id: "caisse",
      title: "Caisse",
      type: "item",
      icon: icons.IconKey,
      url: "/settings/caisse",
    },
    {
      id: "cantine",
      title: "Cantine",
      type: "item",
      icon: icons.IconKey,
      url: "/settings/cantine",
    },
    {
      id: "email",
      title: "Email / SMTP",
      type: "item",
      icon: icons.IconSettings,
      url: "/settings/email",
    },
    {
      id: "school_special",
      title: "School Settings",
      type: "item",
      icon: icons.IconSchool,
      url: "/settings/school-special",
    },
  ],
};

export default settings;

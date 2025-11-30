// assets
import { IconKey } from "@tabler/icons-react";

// constant
const icons = {
  IconKey,
};

const pages = {
  id: "pages",
  title: "vie scollaire",
  caption: "option",
  icon: icons.IconKey,
  type: "group",
  children: [
    {
      id: "authentication",
      title: "Authentication",
      type: "collapse",
      icon: icons.IconKey,
      children: [
        {
          id: "login",
          title: "login",
          type: "item",
          url: "/login",
          target: true,
        },
        {
          id: "register",
          title: "register",
          type: "item",
          url: "/register",
          target: true,
        },
      ],
    },
  ],
};

export default pages;

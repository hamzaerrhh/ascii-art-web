import { RouterProvider } from "react-router-dom";

import router from "@/routes";

import NavigationScroll from "@/layout/NavigationScroll";
import FloatingFab from "./ui-component/FloatingFab";
import Fab from "@mui/material/Fab";

import ThemeCustomization from "./themes";

export default function App() {
  return (
    <ThemeCustomization>
      <NavigationScroll>
        <>
          <RouterProvider router={router} />
          <FloatingFab />
        </>
      </NavigationScroll>
    </ThemeCustomization>
  );
}

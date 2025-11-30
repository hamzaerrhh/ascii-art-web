import React from "react";
import { createRoot } from "react-dom/client"; // ✅ correct import
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
// import { GlobalProvider } from "./provider/ConfigProvider";
import { AllProviders } from "./provider";

import "./assets/scss/style.scss";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const container = document.getElementById("root");
const root = createRoot(container); // ✅ now works
root.render(
  <React.StrictMode>
    <AllProviders>
      <App />
    </AllProviders>
  </React.StrictMode>
);

// serviceWorker.unregister();

import { lazy } from "react";

// project imports
import MainLayout from "@/layout/MainLayout";
import Loadable from "@/ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("@/views/dashboard/Default"))
);

// utilities routing
const UtilsTypography = Loadable(
  lazy(() => import("@/views/utilities/Typography"))
);
const UtilsColor = Loadable(lazy(() => import("@/views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("@/views/utilities/Shadow")));

// pilotage views
const PilotageSchool = Loadable(
  lazy(() => import("@/views/pilotage/pilotage"))
);

// rapport views
const RapportInscription = Loadable(
  lazy(() => import("@/views/rapport/Inscription"))
);
const RapportFinance = Loadable(lazy(() => import("@/views/rapport/Finance")));
const RapportLogistique = Loadable(
  lazy(() => import("@/views/rapport/Logistique"))
);
const RapportAutre = Loadable(lazy(() => import("@/views/rapport/Autre")));

// vieScolaire views
const Inscription = Loadable(
  lazy(() => import("@/views/vieScolaire/Inscription"))
);
const InscriptionAuto = Loadable(
  lazy(() => import("@/views/vieScolaire/InscriptionAutomatique"))
);
const Planification = Loadable(
  lazy(() => import("@/views/vieScolaire/Planification"))
);
const Paiment = Loadable(lazy(() => import("@/views/vieScolaire/Paiment")));
const Controle = Loadable(
  lazy(() => import("@/views/vieScolaire/ControleContenue"))
);
const Masar = Loadable(lazy(() => import("@/views/vieScolaire/Masar")));

// sample page routing
const SamplePage = Loadable(lazy(() => import("@/views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    { path: "/", element: <DashboardDefault /> },
    { path: "dashboard/default", element: <DashboardDefault /> },

    // vieScolaire routes
    { path: "vie-scolaire/inscription/*", element: <Inscription /> },
    {
      path: "vie-scolaire/inscription-automatique",
      element: <InscriptionAuto />,
    },
    { path: "/planification/*", element: <Planification /> },
    { path: "/paiement/*", element: <Planification /> },
    { path: "/finance/*", element: <Planification /> },
    { path: "/rh/*", element: <Planification /> },

    { path: "/controle-contenue/*", element: <Controle /> },
    { path: "/massar/*", element: <Masar /> },

    // pilotage routes
    { path: "pilotage/*", element: <PilotageSchool /> },

    // rapport routes
    { path: "rapport/inscription", element: <RapportInscription /> },
    { path: "rapport/finance", element: <RapportFinance /> },
    { path: "rapport/logistique", element: <RapportLogistique /> },
    { path: "rapport/autre", element: <RapportAutre /> },

    // utilities
    { path: "typography", element: <UtilsTypography /> },
    { path: "color", element: <UtilsColor /> },
    { path: "shadow", element: <UtilsShadow /> },

    // sample page
    { path: "/sample-page", element: <SamplePage /> },
  ],
};

export default MainRoutes;

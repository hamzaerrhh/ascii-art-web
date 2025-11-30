import { useLocation } from "react-router-dom";
import SchoolManagement from "./schoolManagement/SchoolManagement";
import AnneeManagement from "./annéeScolaireManagement/annéeScolaireManagement";
import GestionGeneral from "./gestionGenerale/gestionGeneral";
import GestionUtilisateur from "./gestionUtilisateur/gestionUtilisateur";

const COMPONENTS = {
  "/pilotage/school": <SchoolManagement />,
  "/pilotage/gestion-générale": <GestionGeneral />,
  "/pilotage/année-scolaire": <AnneeManagement />,
  "/pilotage/gestion-utilsateur": <GestionUtilisateur />,
};

const School = () => {
  const { pathname } = useLocation();

  const cleanPath = decodeURIComponent(pathname); // ✅ fixes é, è, à, ô ...

  return COMPONENTS[cleanPath] || <div>Not found</div>;
};

export default School;

export const vieScolaireButtons = [
  { to: "/vie-scolaire/inscription/appercue", label: "Aperçu" },
  { to: "/vie-scolaire/inscription/fiche-eleve", label: "Fiche d'élève" },
  { to: "/vie-scolaire/inscription/liste-eleve", label: "Liste d'élèves" },
  { to: "/vie-scolaire/inscription/fiche-famille", label: "Fiche famille" },
  { to: "/vie-scolaire/inscription/liste-famille", label: "Liste famille" },
  { to: "/vie-scolaire/inscription", label: "Inscription" },
  { to: "/vie-scolaire/inscription/archive", label: "Archive" },
];

export const pilotageButtons = [
  { to: "/pilotage/school", label: "School" },
  { to: "/pilotage/gestion-genérale", label: "gestion genérale" },
  { to: "/pilotage/année-scolaire", label: "année scolaire" },
  { to: "/pilotage/gestion-utilsateur", label: "gestion utilsateur" },
];

export const planificationButtons = [
  { to: "/planification/apercu", label: "Aperçu" },
  { to: "/planification/affectation-classe", label: "Affectation Classe" },
  { to: "/planification/affectation-groupe", label: "Affectation Groupe" },
  {
    to: "/planification/affectation-enseignants",
    label: "Affectation Enseignants",
  },
  { to: "/planification/emploi-du-temps", label: "Emploi du temps" },
  {
    to: "/planification/emploi-du-temps-enseignant",
    label: "Emploi du temps (Enseignant)",
  },
];

export const paymentButtons = [
  { to: "/paiement/apercu", label: "Aperçu" },
  { to: "/paiement/echeance", label: "Échéance" },
  { to: "/paiement/reglement", label: "Règlement" },
  { to: "/paiement/caisses", label: "Caisses" },
  { to: "/paiement/suivi-cheques", label: "Suivi des chèques" },
  { to: "/paiement/suivi-annulations", label: "Suivi des annulations" },
];
export const financeButtons = [
  { to: "/finance/liste-operations", label: "Liste des opérations" },
  { to: "/finance/decaissement", label: "Décaissement" },
  { to: "/finance/encaissement", label: "Encaissement" },
  { to: "/finance/transfert", label: "Transfert" },
  { to: "/finance/suivi-cheques", label: "Suivi des chèques" },
];
export const rhButtons = [
  { to: "/rh/personnel", label: "Gestion du personnel" },
  { to: "/rh/presences", label: "Présences du personnel" },
  { to: "/rh/salaires", label: "Gestion des salaires" },
  { to: "/rh/planning", label: "Planning & Emploi du temps" },
  { to: "/rh/documents", label: "Documents RH" },
];
export const controleContinuButtons = [
  { to: "/controle-continu/apercu", label: "Aperçu" }, // résumé global
  { to: "/controle-continu/eleves", label: "Liste des élèves" }, // notes par élève
  { to: "/controle-continu/matiere", label: "Par matière" }, // notes par matière
  { to: "/controle-continu/saisie-notes", label: "Saisie des notes" }, // entrer les notes
  { to: "/controle-continu/absence", label: "Absences" }, // suivi absences pour le contrôle
  { to: "/controle-continu/rapport", label: "Rapports" }, // export PDF / Excel
  { to: "/controle-continu/archive", label: "Archives" }, // anciens contrôles
];
export const massarButtons = [
  { to: "/massar/apercu", label: "Aperçu" }, // tableau de bord des élèves
  { to: "/massar/liste-eleves", label: "Liste des élèves" }, // liste complète
  { to: "/massar/notes", label: "Notes & Moyennes" }, // consulter les notes Massar
  { to: "/massar/absences", label: "Absences" }, // suivi des absences
  { to: "/massar/rapports", label: "Rapports" }, // export PDF/Excel
  { to: "/massar/import", label: "Importer données" }, // importer fichier Massar
  { to: "/massar/archive", label: "Archives" }, // anciens élèves / années scolaires
];

const buttonsMap = new Map([
  ["/vie-scolaire", vieScolaireButtons],
  ["/pilotage", pilotageButtons],
  ["/planification", planificationButtons],
  ["/paiement", paymentButtons],
  ["/finance", financeButtons],
  ["/rh", rhButtons],
  ["/controle-contenue", controleContinuButtons],
  ["/massar", massarButtons],
]);

export default buttonsMap;

import React from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";

export default function FloatingFab() {
  const actions = [
    { icon: <EditIcon />, name: "Edit" },
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <ShareIcon />, name: "Share" },
    { icon: <DeleteIcon />, name: "Delete" },
  ];

  return (
    <SpeedDial
      ariaLabel="Floating FAB"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon icon={<LightModeIcon />} />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => alert(`${action.name} clicked`)}
        />
      ))}
    </SpeedDial>
  );
}

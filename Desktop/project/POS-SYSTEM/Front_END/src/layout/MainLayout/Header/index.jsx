// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

// project imports
import LogoSection from "../LogoSection";
import SearchSection from "./SearchSection";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";

import { handlerDrawerOpen, useGetMenuMaster } from "@/api/menu";

// assets
import {
  IconChevronRight,
  IconMenu2,
  IconChevronLeft,
} from "@tabler/icons-react";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export default function Header() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  // Get the appropriate icon based on screen size and drawer state
  const MenuIcon = () => {
    if (downMD) {
      // Mobile - always show hamburger
      return <IconMenu2 stroke={1.5} size="20px" />;
    } else {
      // Desktop - show arrow that indicates the direction of movement
      // When drawer is open, show left arrow (to close)
      // When drawer is closed, show right arrow (to open)
      return drawerOpen ? (
        <IconChevronLeft stroke={1.5} size="20px" />
      ) : (
        <IconChevronRight stroke={1.5} size="20px" />
      );
    }
  };

  const handleToggleDrawer = () => {
    handlerDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: downMD ? "auto" : drawerOpen ? 228 : "auto",
          minWidth: downMD ? "auto" : 64,
          transition: "all 0.2s ease-in-out",
          gap: 1,
        }}
      >
        {/* Logo Section - Always show on desktop, hide on mobile when drawer is open */}
        <Box
          sx={{
            display: {
              xs: drawerOpen ? "none" : "block", // Hide on mobile when drawer is open
              md: "block", // Always show on desktop
            },
            flexGrow: 1, // Always take available space
            transition: "all 0.2s ease-in-out",
            opacity: 1, // Always fully visible
          }}
        >
          <LogoSection />
        </Box>

        {/* Menu Toggle Button */}
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: "hidden",
            transition: "all 0.2s ease-in-out",
            color: theme.vars.palette.secondary.dark,
            background: theme.vars.palette.secondary.light,
            "&:hover": {
              color: theme.vars.palette.secondary.light,
              background: theme.vars.palette.secondary.dark,
              transform: "scale(1.05)",
            },
            // Remove the auto margins that were causing positioning issues
            ml: 0,
            mr: 0,
          }}
          onClick={handleToggleDrawer}
        >
          <MenuIcon />
        </Avatar>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification */}
      <NotificationSection />

      {/* profile */}
      <ProfileSection />
    </>
  );
}

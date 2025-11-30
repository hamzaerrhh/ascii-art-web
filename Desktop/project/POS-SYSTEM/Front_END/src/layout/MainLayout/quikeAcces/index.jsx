import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  useMediaQuery,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { IconChevronDown, IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";

// NEW: Normalize paths for comparison - handles URL encoding differences
const normalizePath = (path) => {
  return decodeURIComponent(path).replace(/\/$/, ""); // Remove trailing slashes
};

const SubNavBar = ({ buttons }) => {
  const theme = useTheme();
  const location = useLocation();
  const currentPath = location.pathname;

  // Responsive breakpoints
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg")); // 1200px and up
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md")); // 900px and up
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // 600px and down

  const [anchorEl, setAnchorEl] = useState(null);

  const baseBtn = {
    textTransform: "none",
    borderRadius: "8px",
    padding: "6px 18px",
    fontWeight: 500,
    fontSize: "0.9rem",
    backgroundColor: theme.vars.palette.grey[200],
    color: theme.vars.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.vars.palette.grey[300],
    },
    // Responsive padding
    ...(isSmallScreen && {
      padding: "4px 12px",
      fontSize: "0.8rem",
    }),
  };

  const activeBtn = {
    ...baseBtn,
    backgroundColor: "#673ab7",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#9f7fde",
    },
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Determine which buttons to show based on screen size
  const getVisibleButtons = () => {
    if (isLargeScreen) {
      return buttons; // Show all buttons on large screens
    } else if (isMediumScreen) {
      return buttons.slice(0, 4); // Show first 4 buttons on medium screens
    } else {
      return buttons.slice(0, 2); // Show first 2 buttons on small screens
    }
  };

  const getDropdownButtons = () => {
    if (isLargeScreen) {
      return []; // No dropdown on large screens
    } else if (isMediumScreen) {
      return buttons.slice(4); // Remaining buttons in dropdown
    } else {
      return buttons.slice(2); // Remaining buttons in dropdown
    }
  };

  const visibleButtons = getVisibleButtons();
  const dropdownButtons = getDropdownButtons();

  // CHANGED: Now uses normalized paths
  const isActive = (btnTo) => {
    const normalizedCurrentPath = normalizePath(currentPath);
    const normalizedBtnTo = normalizePath(btnTo);

    return normalizedCurrentPath === normalizedBtnTo;
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.2,
        overflowX: "auto",
        px: { xs: 1, sm: 2, md: 2.5 },
        py: { xs: 1, sm: 1.5 },
        borderTop: `1px solid ${theme.vars.palette.grey[200]}`,
        borderBottom: `1px solid ${theme.vars.palette.grey[200]}`,
        backgroundColor: theme.vars.palette.grey[50],
        alignItems: "center",
        minHeight: "56px",
        "&::-webkit-scrollbar": {
          height: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.vars.palette.grey[400],
          borderRadius: "2px",
        },
      }}
    >
      {/* Visible buttons */}
      {visibleButtons.map((btn) => (
        <Button
          key={btn.to}
          component={Link}
          to={btn.to}
          sx={isActive(btn.to) ? activeBtn : baseBtn}
        >
          {btn.label}
        </Button>
      ))}

      {/* Dropdown menu for hidden buttons */}
      {dropdownButtons.length > 0 && (
        <>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              ...baseBtn,
              padding: "6px",
              minWidth: "auto",
              "&:hover": {
                backgroundColor: theme.vars.palette.grey[300],
              },
            }}
          >
            <IconMenu2 size={20} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: "8px",
                boxShadow: theme.shadows[3],
              },
            }}
          >
            {dropdownButtons.map((btn) => (
              <MenuItem
                key={btn.to}
                component={Link}
                to={btn.to}
                onClick={handleMenuClose}
                sx={{
                  py: 1,
                  px: 2,
                  fontSize: "0.9rem",
                  fontWeight: isActive(btn.to) ? 600 : 400,
                  color: isActive(btn.to) ? "#673ab7" : "inherit",
                  backgroundColor: isActive(btn.to) ? "#f3e5f5" : "transparent",
                  "&:hover": {
                    backgroundColor: theme.vars.palette.grey[100],
                  },
                }}
              >
                {btn.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
};

export default SubNavBar;

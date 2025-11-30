import PropTypes from "prop-types";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import SubNavBar from "../../layout/MainLayout/quikeAcces";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Icons
import { IconChevronRight } from "@tabler/icons-react";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import HomeIcon from "@mui/icons-material/Home";

const decodeSegment = (segment) => {
  return decodeURIComponent(segment)
    .replace(/-/g, " ") // replace hyphens with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize first letters
};

const buildBreadcrumbFromPath = (path) => {
  const parts = path.split("/").filter(Boolean); // remove empty strings
  let accumulatedPath = "";

  return parts.map((segment) => {
    accumulatedPath += "/" + segment;
    return {
      title: decodeSegment(segment), // capitalize first letters
      url: accumulatedPath,
    };
  });
};

// ----------------------------------------------------------------------

export default function Breadcrumbs({
  buttons,
  card = true,
  custom = false,
  divider = false,
  heading,
  icon = true,
  icons = false,
  links,
  maxItems = 8,
  rightAlign = true,
  separator = IconChevronRight,
  title = true,
  titleBottom = false,
  sx,
  ...props
}) {
  console.log("the buttons", buttons);
  const theme = useTheme();
  const location = useLocation();

  const path = location.pathname;
  console.log("the path", path);

  const breadcrumbItems = useMemo(() => {
    if (custom && links) return links;
    return buildBreadcrumbFromPath(path); // ← only path, no navigation needed
  }, [path, custom, links]);

  console.log(breadcrumbItems);
  const SeparatorIcon = separator;
  const separatorIcon = <SeparatorIcon size={16} />;

  const iconSX = {
    marginRight: 6,
    width: "1rem",
    height: "1rem",
    color: theme.vars.palette.secondary.main,
  };

  const linkSX = {
    display: "flex",
    textDecoration: "none",
    alignItems: "center",
    color: "text.secondary",
  };

  const buildBreadcrumb = () => (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      maxItems={maxItems}
      separator={separatorIcon}
      sx={{ "& .MuiBreadcrumbs-separator": { width: 16, mx: 1 } }}
    >
      <Typography component={Link} to="/" variant="h6" sx={linkSX}>
        {icons && <HomeTwoToneIcon style={iconSX} />}
        {icon && !icons && <HomeIcon style={iconSX} />}
        {(!icon || icons) && "Dashboard"}
      </Typography>

      {/* Navigation Levels */}
      {breadcrumbItems.map((item, index) => {
        const ItemIcon = item.icon;
        const last = index === breadcrumbItems.length - 1;

        return (
          <Typography
            key={item.id}
            {...(item.url && !last ? { component: Link, to: item.url } : {})}
            variant="h6"
            sx={{
              ...linkSX,
              color: last ? "text.primary" : "text.secondary",
            }}
          >
            {icons && ItemIcon && <ItemIcon style={iconSX} />}
            {item.title}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );

  const mainTitle = custom ? heading : breadcrumbItems.at(-1)?.title;

  // ----------------------------------------------------------------------

  return (
    <Card
      sx={
        card
          ? { mb: 3, bgcolor: "background.default", ...sx }
          : { mb: 3, bgcolor: "transparent", ...sx }
      }
      {...props}
    >
      <Box sx={{ p: 1.25, px: card ? 2 : 0 }}>
        <Grid
          container
          spacing={1}
          direction={rightAlign ? "row" : "column"}
          alignItems={rightAlign ? "center" : "flex-start"}
          justifyContent={rightAlign ? "space-between" : "flex-start"}
        >
          {/* TITLE TOP */}
          {title && !titleBottom && (
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
              {mainTitle}
            </Typography>
          )}

          <Grid>{buildBreadcrumb()}</Grid>

          {/* TITLE BOTTOM */}
          {title && titleBottom && (
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
              {mainTitle}
            </Typography>
          )}
        </Grid>
      </Box>
      {buttons && <SubNavBar buttons={buttons} />}
      {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
    </Card>
  );
}

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  custom: PropTypes.bool,
  divider: PropTypes.bool,
  heading: PropTypes.string,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  links: PropTypes.array,
  maxItems: PropTypes.number,
  rightAlign: PropTypes.bool,
  separator: PropTypes.any,
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
  sx: PropTypes.any,
};

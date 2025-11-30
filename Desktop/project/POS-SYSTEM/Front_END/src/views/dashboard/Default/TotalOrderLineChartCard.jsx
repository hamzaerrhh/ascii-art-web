import PropTypes from "prop-types";
import React, { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// third party
import Chart from "react-apexcharts";

// project imports
import chartOptions from "./chart-data/total-order-line-chart";
import MainCard from "@/ui-component/cards/MainCard";
import SkeletonTotalOrderCard from "@/ui-component/cards/Skeleton/EarningCard";

// assets
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// data
const monthlyData = [{ data: [45, 66, 41, 89, 25, 44, 9, 54] }];
const yearlyData = [{ data: [35, 44, 9, 54, 45, 66, 41, 69] }];

export default function TotalOrderLineChartCard({ isLoading }) {
  const theme = useTheme();

  const [timeValue, setTimeValue] = useState(false);
  const [series, setSeries] = useState(yearlyData);

  const handleChangeTime = (_event, newValue) => {
    setTimeValue(newValue);
    setSeries(newValue ? monthlyData : yearlyData);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: theme.palette.primary.dark,
            color: "#fff",
            overflow: "hidden",
            position: "relative",
            "&>div": { position: "relative", zIndex: 5 },
            "&:after": {
              content: '""',
              position: "absolute",
              width: 210,
              height: 210,
              background: theme.palette.primary[800],
              borderRadius: "50%",
              top: -85,
              right: -95,
            },
            "&:before": {
              content: '""',
              position: "absolute",
              width: 210,
              height: 210,
              background: theme.palette.primary[800],
              borderRadius: "50%",
              top: -125,
              right: -15,
              opacity: 0.5,
            },
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Stack direction="row" justifyContent="space-between">
              <Avatar
                variant="rounded"
                sx={{
                  borderRadius: 2,
                  bgcolor: theme.palette.primary[800],
                  color: "#fff",
                  mt: 1,
                  width: 56,
                  height: 56,
                }}
              >
                <LocalMallOutlinedIcon fontSize="inherit" />
              </Avatar>
              <Box>
                <Button
                  disableElevation
                  variant={timeValue ? "contained" : "text"}
                  size="small"
                  sx={{ color: "inherit" }}
                  onClick={(e) => handleChangeTime(e, true)}
                >
                  Month
                </Button>
                <Button
                  disableElevation
                  variant={!timeValue ? "contained" : "text"}
                  size="small"
                  sx={{ color: "inherit" }}
                  onClick={(e) => handleChangeTime(e, false)}
                >
                  Year
                </Button>
              </Box>
            </Stack>

            <Grid container alignItems="center" spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Stack direction="row" alignItems="center">
                  <Typography
                    sx={{
                      fontSize: "2.125rem",
                      fontWeight: 500,
                      mr: 1,
                    }}
                  >
                    {timeValue ? "$108" : "$961"}
                  </Typography>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary[200],
                      color: theme.palette.primary.dark,
                      width: 24,
                      height: 24,
                    }}
                  >
                    <ArrowDownwardIcon
                      fontSize="inherit"
                      sx={{ transform: "rotate(45deg)" }}
                    />
                  </Avatar>
                </Stack>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: theme.palette.primary[200],
                  }}
                >
                  Total Order
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Chart
                  options={chartOptions}
                  series={series}
                  type="line"
                  height={90}
                />
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
}

TotalOrderLineChartCard.propTypes = { isLoading: PropTypes.bool };

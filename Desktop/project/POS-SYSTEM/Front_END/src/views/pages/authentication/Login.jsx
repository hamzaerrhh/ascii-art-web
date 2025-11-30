import * as React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"; // Example Icon for the 'Logo'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// --- STYLING CONSTANTS (Based on your style guide) ---
const PRIMARY_ACCENT_COLOR = "#8c52ff"; // A deep purple for the button
const SOFT_SHADOW = "0px 10px 30px rgba(0, 0, 0, 0.08)"; // Soft, diffused shadow
const CORNER_RADIUS = 3; // Equivalent to ~12px in MUI spacing

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add your login logic here
    console.log("Sign In Attempted");
  };

  return (
    // 1. Full-screen Container (Flexible)
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8", // Light background color
        p: 2,
      }}
    >
      {/* 2. Login Card (Paper) - Applies Rounded Corners and Soft Shadow */}
      <Paper
        elevation={0} // Override default MUI shadow
        sx={{
          width: "100%",
          maxWidth: 400, // Max width for desktop
          p: { xs: 3, sm: 5 }, // Responsive padding
          borderRadius: CORNER_RADIUS,
          boxShadow: SOFT_SHADOW, // Custom soft shadow
        }}
      >
        {/* 3. Stack for Vertical Layout and Spacing */}
        <Stack
          component="form"
          spacing={3}
          alignItems="center"
          onSubmit={handleSubmit}
        >
          {/* Logo Example (Icon) */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: "50%",
              backgroundColor: PRIMARY_ACCENT_COLOR,
              color: "white",
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Box>

          {/* Welcome Text */}
          <Typography component="h1" variant="h5" fontWeight="bold">
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to continue to your dashboard.
          </Typography>

          {/* Email Text Field */}
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            variant="outlined"
            required
            // Apply rounded corners to the input field
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: CORNER_RADIUS,
              },
            }}
          />

          {/* Password Text Field with Visibility Toggle */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            autoComplete="current-password"
            variant="outlined"
            required
            type={showPassword ? "text" : "password"}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: CORNER_RADIUS,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Sign In Button (Vibrant Accent) */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 2, // Extra margin on top
              borderRadius: CORNER_RADIUS,
              // Use your accent color for the button
              backgroundColor: PRIMARY_ACCENT_COLOR,
              "&:hover": {
                backgroundColor: PRIMARY_ACCENT_COLOR,
                opacity: 0.9,
              },
              boxShadow: "none", // Remove the default shadow for a cleaner look
            }}
          >
            Sign In
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginView;

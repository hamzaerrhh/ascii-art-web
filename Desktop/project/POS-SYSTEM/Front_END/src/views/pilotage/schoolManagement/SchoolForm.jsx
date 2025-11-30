import React from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { z } from "zod";
import SaveIcon from "@mui/icons-material/Save";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PersonIcon from "@mui/icons-material/Person";
import ShareIcon from "@mui/icons-material/Share";
import GavelIcon from "@mui/icons-material/Gavel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Zod validation schema
const schoolSchema = z.object({
  code: z.string().optional(),
  name: z.string().min(1, "School name is required"),
  massar_id: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  phone_1: z.string().optional(),
  phone_2: z.string().optional(),
  fax: z.string().optional(),
  interface_language: z.string().optional(),
  county: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  zip: z.string().optional(),
  site_web: z.string().url("Invalid website URL").optional().or(z.literal("")),
  start_date: z.string().optional(),
  signatory: z.string().optional(),
  title_signatory: z.string().optional(),
  logo: z.string().optional(),
  logo_dark: z.string().optional(),
  logo_light: z.string().optional(),
  facebook: z.string().url("Invalid Facebook URL").optional().or(z.literal("")),
  instagram: z
    .string()
    .url("Invalid Instagram URL")
    .optional()
    .or(z.literal("")),
  snapchat: z.string().optional(),
  discord: z.string().optional(),
  whatsapp: z.string().optional(),
  x: z.string().url("Invalid X/Twitter URL").optional().or(z.literal("")),
  registration_number: z.string().optional(),
  CNSS: z.string().optional(),
  RCE: z.string().optional(),
  TVA: z.string().optional(),
});

const StyledCard = ({ children, designSystem, ...props }) => (
  <Card
    sx={{
      p: 4,
      borderRadius: designSystem.borderRadius.cards,
      boxShadow: designSystem.shadows.md,
      backgroundColor: designSystem.colors.cardBackground,
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Card>
);

const StyledTextField = ({ designSystem, ...props }) => (
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: designSystem.borderRadius.inputs,
        fontSize: "14px",
        "&:hover fieldset": {
          borderColor: designSystem.colors.primaryLight,
        },
        "&.Mui-focused fieldset": {
          borderColor: `${designSystem.colors.primary} !important`,
          boxShadow: `0 0 0 3px ${designSystem.colors.primaryLight}`,
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0 1000px ${designSystem.colors.cardBackground} inset !important`,
          WebkitTextFillColor: `${designSystem.colors.textPrimary} !important`,
          borderRadius: designSystem.borderRadius.inputs,
        },
      },
      "& .MuiInputLabel-root": {
        fontSize: "13px",
        color: designSystem.colors.textSecondary,
        "&.Mui-focused": {
          color: designSystem.colors.primary,
        },
      },
      "& .MuiFormHelperText-root": {
        fontSize: "11px",
        marginLeft: 0,
      },
    }}
    {...props}
  />
);

const StyledButton = ({
  variant = "contained",
  children,
  designSystem,
  ...props
}) => (
  <Button
    variant={variant}
    startIcon={props.startIcon}
    sx={{
      borderRadius: designSystem.borderRadius.buttons,
      px: 3,
      py: 1.2,
      fontWeight: 600,
      fontSize: "14px",
      textTransform: "none",
      boxShadow: variant === "contained" ? designSystem.shadows.sm : "none",
      backgroundColor:
        variant === "contained" ? designSystem.colors.primary : "transparent",
      color:
        variant === "contained" ? "white" : designSystem.colors.textPrimary,
      border:
        variant === "outlined"
          ? `1px solid ${designSystem.colors.border}`
          : "none",
      "&:hover": {
        backgroundColor:
          variant === "contained"
            ? designSystem.colors.primaryDark
            : designSystem.colors.background,
        boxShadow: designSystem.shadows.lg,
      },
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Button>
);

const SectionTitle = ({ children, icon, designSystem }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 4 }}>
    {icon}
    <Typography
      variant="h6"
      sx={{
        fontSize: "16px",
        fontWeight: 600,
        color: designSystem.colors.textPrimary,
        ml: 1,
      }}
    >
      {children}
    </Typography>
  </Box>
);

const FieldLabel = ({ children, required, designSystem }) => (
  <Typography
    variant="body2"
    sx={{
      fontSize: "13px",
      fontWeight: 500,
      color: designSystem.colors.textPrimary,
      mb: 1,
      display: "block",
    }}
  >
    {children}
    {required && <span style={{ color: "#EF4444" }}> *</span>}
  </Typography>
);

const SchoolForm = ({
  formData,
  formMode,
  errors,
  onInputChange,
  onSubmit,
  onBackToList,
  designSystem,
}) => {
  const handleSubmit = () => {
    try {
      const validatedData = schoolSchema.parse(formData);
      onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        // You might want to handle errors differently here
        console.log("Validation errors:", newErrors);
      }
    }
  };

  const handleInputChange = (field) => (event) => {
    onInputChange(field, event.target.value);
  };

  return (
    <StyledCard designSystem={designSystem}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
          pb: 3,
          borderBottom: `1px solid ${designSystem.colors.border}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={onBackToList}
            sx={{
              color: designSystem.colors.primary,
              "&:hover": {
                backgroundColor: designSystem.colors.primaryLight,
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: designSystem.colors.textPrimary,
                fontSize: "22px",
                mb: 1,
              }}
            >
              {formMode === "add" && "Add New School"}
              {formMode === "edit" && "Edit School"}
              {formMode === "view" && "View School"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: designSystem.colors.textSecondary,
                fontSize: "14px",
              }}
            >
              {formMode === "view"
                ? "View school details"
                : "Fill in the school information below"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <StyledButton
            variant="outlined"
            onClick={onBackToList}
            designSystem={designSystem}
          >
            Back to List
          </StyledButton>
          {formMode !== "view" && (
            <StyledButton
              onClick={handleSubmit}
              startIcon={<SaveIcon />}
              designSystem={designSystem}
              sx={{ minWidth: "160px" }}
            >
              {formMode === "add" ? "Add School" : "Save Changes"}
            </StyledButton>
          )}
        </Box>
      </Box>

      <Box component="form" noValidate autoComplete="off">
        {/* Basic Information Section */}
        <SectionTitle
          icon={<LanguageIcon sx={{ color: designSystem.colors.primary }} />}
          designSystem={designSystem}
        >
          Basic Information
        </SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <FieldLabel required designSystem={designSystem}>
              School Name
            </FieldLabel>
            <StyledTextField
              placeholder="Enter the official school name"
              value={formData.name}
              onChange={handleInputChange("name")}
              error={!!errors.name}
              helperText={errors.name}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FieldLabel designSystem={designSystem}>Start Date</FieldLabel>
            <StyledTextField
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.start_date}
              onChange={handleInputChange("start_date")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>School Code</FieldLabel>
            <StyledTextField
              placeholder="Unique school identifier"
              value={formData.code}
              onChange={handleInputChange("code")}
              error={!!errors.code}
              helperText={errors.code}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>Massar ID</FieldLabel>
            <StyledTextField
              placeholder="MASSAR system identifier"
              value={formData.massar_id}
              onChange={handleInputChange("massar_id")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
        </Grid>

        {/* Contact Information Section */}
        <SectionTitle
          icon={
            <ContactPhoneIcon sx={{ color: designSystem.colors.primary }} />
          }
          designSystem={designSystem}
        >
          Contact Information
        </SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>Email Address</FieldLabel>
            <StyledTextField
              type="email"
              placeholder="contact@school.edu"
              value={formData.email}
              onChange={handleInputChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>Website</FieldLabel>
            <StyledTextField
              placeholder="https://www.school.edu"
              value={formData.site_web}
              onChange={handleInputChange("site_web")}
              error={!!errors.site_web}
              helperText={errors.site_web}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FieldLabel designSystem={designSystem}>Primary Phone</FieldLabel>
            <StyledTextField
              placeholder="+212 600-000000"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FieldLabel designSystem={designSystem}>Secondary Phone</FieldLabel>
            <StyledTextField
              placeholder="Additional phone line"
              value={formData.phone_1}
              onChange={handleInputChange("phone_1")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FieldLabel designSystem={designSystem}>Fax</FieldLabel>
            <StyledTextField
              placeholder="Fax number"
              value={formData.fax}
              onChange={handleInputChange("fax")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
        </Grid>

        {/* Location Section */}
        <SectionTitle
          icon={<LocationOnIcon sx={{ color: designSystem.colors.primary }} />}
          designSystem={designSystem}
        >
          Location Details
        </SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FieldLabel designSystem={designSystem}>Full Address</FieldLabel>
            <StyledTextField
              placeholder="Street address, building number"
              value={formData.address}
              onChange={handleInputChange("address")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FieldLabel designSystem={designSystem}>City</FieldLabel>
            <StyledTextField
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange("city")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FieldLabel designSystem={designSystem}>State/Region</FieldLabel>
            <StyledTextField
              placeholder="State or region"
              value={formData.state}
              onChange={handleInputChange("state")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FieldLabel designSystem={designSystem}>Country</FieldLabel>
            <StyledTextField
              placeholder="Country"
              value={formData.county}
              onChange={handleInputChange("county")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>ZIP/Postal Code</FieldLabel>
            <StyledTextField
              placeholder="Postal code"
              value={formData.zip}
              onChange={handleInputChange("zip")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>
              Interface Language
            </FieldLabel>
            <StyledTextField
              placeholder="Preferred system language"
              value={formData.interface_language}
              onChange={handleInputChange("interface_language")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
        </Grid>

        {/* Administration Section */}
        <SectionTitle
          icon={<PersonIcon sx={{ color: designSystem.colors.primary }} />}
          designSystem={designSystem}
        >
          Administration
        </SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>Signatory Name</FieldLabel>
            <StyledTextField
              placeholder="Full name of authorized signatory"
              value={formData.signatory}
              onChange={handleInputChange("signatory")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>Signatory Title</FieldLabel>
            <StyledTextField
              placeholder="Position/Title (e.g., Director, Principal)"
              value={formData.title_signatory}
              onChange={handleInputChange("title_signatory")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
        </Grid>

        {/* Social Media Section */}
        <SectionTitle
          icon={<ShareIcon sx={{ color: designSystem.colors.primary }} />}
          designSystem={designSystem}
        >
          Social Media & Online Presence
        </SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>Facebook</FieldLabel>
            <StyledTextField
              placeholder="https://facebook.com/school"
              value={formData.facebook}
              onChange={handleInputChange("facebook")}
              error={!!errors.facebook}
              helperText={errors.facebook}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>Instagram</FieldLabel>
            <StyledTextField
              placeholder="https://instagram.com/school"
              value={formData.instagram}
              onChange={handleInputChange("instagram")}
              error={!!errors.instagram}
              helperText={errors.instagram}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>X (Twitter)</FieldLabel>
            <StyledTextField
              placeholder="https://twitter.com/school"
              value={formData.x}
              onChange={handleInputChange("x")}
              error={!!errors.x}
              helperText={errors.x}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>WhatsApp</FieldLabel>
            <StyledTextField
              placeholder="WhatsApp contact number"
              value={formData.whatsapp}
              onChange={handleInputChange("whatsapp")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
        </Grid>

        {/* Legal Information Section */}
        <SectionTitle
          icon={<GavelIcon sx={{ color: designSystem.colors.primary }} />}
          designSystem={designSystem}
        >
          Legal Information
        </SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>
              Registration Number
            </FieldLabel>
            <StyledTextField
              placeholder="Official business registration number"
              value={formData.registration_number}
              onChange={handleInputChange("registration_number")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>CNSS Number</FieldLabel>
            <StyledTextField
              placeholder="Social security registration number"
              value={formData.CNSS}
              onChange={handleInputChange("CNSS")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>RCE Number</FieldLabel>
            <StyledTextField
              placeholder="Commerce registry number"
              value={formData.RCE}
              onChange={handleInputChange("RCE")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FieldLabel designSystem={designSystem}>TVA Number</FieldLabel>
            <StyledTextField
              placeholder="Tax identification number"
              value={formData.TVA}
              onChange={handleInputChange("TVA")}
              disabled={formMode === "view"}
              designSystem={designSystem}
            />
          </Grid>
        </Grid>

        {formMode !== "view" && (
          <Box
            sx={{
              mt: 4,
              p: 2,
              backgroundColor: designSystem.colors.primaryLight,
              borderRadius: designSystem.borderRadius.inputs,
              border: `1px solid ${designSystem.colors.primary}20`,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: designSystem.colors.primaryDark,
                fontSize: "13px",
              }}
            >
              💡 <strong>Note:</strong> Only the school name field is required.
              All other fields are optional and can be filled in later.
            </Typography>
          </Box>
        )}
      </Box>
    </StyledCard>
  );
};

export default SchoolForm;

import React, { useState } from "react";
import { Box, Alert } from "@mui/material";
import SchoolTable from "./SchoolTable";
import SchoolForm from "./SchoolForm";
import { schoolData } from "../../../assets/fakeData";
// Design System Constants
const DESIGN_SYSTEM = {
  colors: {
    primary: "#7266F0",
    primaryDark: "#5B52CC",
    primaryLight: "#EDEBFF",
    secondary: "#2979FF",
    secondaryLight: "#E6F0FF",
    accentYellow: "#FDE68A",
    background: "#F5F7FA",
    cardBackground: "#FFFFFF",
    border: "#E5E7EB",
    textPrimary: "#111827",
    textSecondary: "#6B7280",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  shadows: {
    sm: "0 2px 4px rgba(0,0,0,0.05)",
    md: "0 4px 12px rgba(0,0,0,0.08)",
    lg: "0 8px 24px rgba(0,0,0,0.10)",
  },
  borderRadius: {
    buttons: "12px",
    inputs: "12px",
    cards: "20px",
  },
};

const SchoolManagement = () => {
  const [schools, setSchools] = useState(schoolData);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    massar_id: "",
    email: "",
    phone: "",
    phone_1: "",
    phone_2: "",
    fax: "",
    interface_language: "",
    county: "",
    state: "",
    city: "",
    address: "",
    zip: "",
    site_web: "",
    start_date: "",
    signatory: "",
    title_signatory: "",
    logo: "",
    logo_dark: "",
    logo_light: "",
    facebook: "",
    instagram: "",
    snapchat: "",
    discord: "",
    whatsapp: "",
    x: "",
    registration_number: "",
    CNSS: "",
    RCE: "",
    TVA: "",
  });
  const [errors, setErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const [formMode, setFormMode] = useState("add");

  const handleAddNew = () => {
    setFormData({
      code: "",
      name: "",
      massar_id: "",
      email: "",
      phone: "",
      phone_1: "",
      phone_2: "",
      fax: "",
      interface_language: "",
      county: "",
      state: "",
      city: "",
      address: "",
      zip: "",
      site_web: "",
      start_date: "",
      signatory: "",
      title_signatory: "",
      logo: "",
      logo_dark: "",
      logo_light: "",
      facebook: "",
      instagram: "",
      snapchat: "",
      discord: "",
      whatsapp: "",
      x: "",
      registration_number: "",
      CNSS: "",
      RCE: "",
      TVA: "",
    });
    setFormMode("add");
    setEditingSchool(null);
    setShowForm(true);
    setErrors({});
  };

  const handleEdit = (school) => {
    setFormData(school);
    setFormMode("edit");
    setEditingSchool(school);
    setShowForm(true);
    setErrors({});
  };

  const handleView = (school) => {
    setFormData(school);
    setFormMode("view");
    setEditingSchool(school);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = (schoolCode) => {
    if (window.confirm("Are you sure you want to delete this school?")) {
      setSchools(schools.filter((school) => school.code !== schoolCode));
      if (editingSchool?.code === schoolCode) {
        setShowForm(false);
        setEditingSchool(null);
      }
    }
  };

  const handleSubmit = (validatedData) => {
    if (formMode === "add") {
      const newSchool = {
        ...validatedData,
        code: validatedData.code || `SCH-${Date.now()}`,
      };
      setSchools([...schools, newSchool]);
      setSubmissionResult({
        success: true,
        message: "School added successfully!",
      });
    } else if (formMode === "edit") {
      setSchools(
        schools.map((school) =>
          school.code === editingSchool.code
            ? { ...validatedData, code: editingSchool.code }
            : school
        )
      );
      setSubmissionResult({
        success: true,
        message: "School updated successfully!",
      });
    }

    setShowForm(false);
    setEditingSchool(null);
    setErrors({});
  };

  const handleBackToList = () => {
    setShowForm(false);
    setEditingSchool(null);
    setErrors({});
    setSubmissionResult(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: DESIGN_SYSTEM.colors.background,
        minHeight: "100vh",
      }}
    >
      {submissionResult && (
        <Alert
          severity={submissionResult.success ? "success" : "error"}
          sx={{
            mb: 3,
            borderRadius: DESIGN_SYSTEM.borderRadius.inputs,
          }}
          onClose={() => setSubmissionResult(null)}
        >
          {submissionResult.message}
        </Alert>
      )}

      {!showForm ? (
        <SchoolTable
          schools={schools}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          designSystem={DESIGN_SYSTEM}
        />
      ) : (
        <SchoolForm
          formData={formData}
          formMode={formMode}
          errors={errors}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onBackToList={handleBackToList}
          designSystem={DESIGN_SYSTEM}
        />
      )}
    </Box>
  );
};

export default SchoolManagement;

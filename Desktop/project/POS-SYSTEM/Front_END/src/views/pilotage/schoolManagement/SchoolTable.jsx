import React, { useMemo } from "react";
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

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

const SchoolTable = ({
  schools,
  onAddNew,
  onEdit,
  onView,
  onDelete,
  designSystem,
}) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "code",
        header: "Code",
        size: 100,
      },
      {
        accessorKey: "name",
        header: "School Name",
        size: 200,
      },
      {
        accessorKey: "massar_id",
        header: "Massar ID",
        size: 120,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 180,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 140,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 120,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 120,
      },
      {
        id: "actions",
        header: "Actions",
        size: 120,
        cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => onEdit(row.original)}
                sx={{
                  color: designSystem.colors.primary,
                  "&:hover": {
                    backgroundColor: designSystem.colors.primaryLight,
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="View">
              <IconButton
                size="small"
                onClick={() => onView(row.original)}
                sx={{
                  color: designSystem.colors.secondary,
                  "&:hover": {
                    backgroundColor: designSystem.colors.secondaryLight,
                  },
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => onDelete(row.original.code)}
                sx={{
                  color: "#EF4444",
                  "&:hover": {
                    backgroundColor: "#FEE2E2",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [onEdit, onView, onDelete, designSystem]
  );

  const table = useReactTable({
    data: schools,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <StyledCard designSystem={designSystem}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          pb: 3,
          borderBottom: `1px solid ${designSystem.colors.border}`,
        }}
      >
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
            Schools Management
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: designSystem.colors.textSecondary,
              fontSize: "14px",
            }}
          >
            Manage your schools list. Add new schools or edit existing ones.
          </Typography>
        </Box>

        <StyledButton
          onClick={onAddNew}
          startIcon={<AddIcon />}
          designSystem={designSystem}
          sx={{ minWidth: "160px" }}
        >
          Add New School
        </StyledButton>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: designSystem.borderRadius.inputs,
          boxShadow: designSystem.shadows.sm,
          border: `1px solid ${designSystem.colors.border}`,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      fontWeight: 600,
                      backgroundColor: designSystem.colors.background,
                      color: designSystem.colors.textPrimary,
                      fontSize: "14px",
                      borderBottom: `2px solid ${designSystem.colors.border}`,
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: designSystem.colors.background,
                  },
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      fontSize: "14px",
                      color: designSystem.colors.textPrimary,
                      borderBottom: `1px solid ${designSystem.colors.border}`,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: designSystem.colors.textSecondary }}
        >
          Showing {table.getRowModel().rows.length} of {schools.length} schools
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <StyledButton
            variant="outlined"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            designSystem={designSystem}
          >
            Previous
          </StyledButton>
          <StyledButton
            variant="outlined"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            designSystem={designSystem}
          >
            Next
          </StyledButton>
        </Box>
      </Box>
    </StyledCard>
  );
};

export default SchoolTable;

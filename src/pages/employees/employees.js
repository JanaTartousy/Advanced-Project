import "./employees.css";
import React from "react";
import { Button } from "@mui/material";
import EmployeeRow from "./../../components/employeeRow/employeeRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const theme = createTheme({
  palette: {
    white: { main: "#F6F8FA" },
    accent: { main: "#369fff" },
    accentderv: { main: "#69B7FF" },
    gray: { main: "#707070" },
    black: { main: "#333" },
  },
});

function Employees() {
  return (
    <div className="container">
      <Button
        startIcon={<AddCircleIcon />}
        style={{
          fontSize: 12,
          backgroundColor: "#369fff",
          color: "white",
          left: 1250,
          bottom: 12,
        }}
        size="large"
        variant="contained"
        sx={{
          "&:hover": {
            transform: "scale(1.05)",
            transition: "0.2s ease-out",
          },
        }}
      >
        Add
      </Button>
      <div className="employee-header">
        <h2>Employees</h2>
        <div style={{ position: "relative" }} />
      </div>
      <EmployeeRow />
    </div>
  );
}

export default Employees;

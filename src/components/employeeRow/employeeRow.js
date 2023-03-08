import "./employeeRow.css";
import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    white: { main: "#F6F8FA" },
    accent: { main: "#369fff" },
    accentderv: { main: "#69B7FF" },
    gray: { main: "#707070" },
    black: { main: "#333" },
  },
});

function EmployeeRow() {
  return (
    <div className="contain">
      <div className="employee-name">
        <h4>Employee Name</h4>
      </div>
      <div className="row">
        <div className="edit-button">
          <Button
            variant="contained"
            style={{
              fontSize: 15,
              backgroundColor: "accent",
              color: "white",
            }}
            size="large"
            startIcon={<CreateIcon />}
            onClick={() => alert("You can now edit employee profile")}
          >
            Edit
          </Button>
        </div>
        <div className="delete-button">
          <Button
            variant="contained"
            style={{
              fontSize: 15,
              backgroundColor: "accent",
              color: "white",
            }}
            size="large"
            startIcon={<DeleteIcon />}
            onClick={() => alert("Employee has been removed")}
          >
            Delete
          </Button>
          <ThemeProvider theme={theme}></ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRow;

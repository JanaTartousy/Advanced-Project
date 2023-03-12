import "./employees.css";
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmployeeRow from "./../../components/employeeRow/employeeRow";


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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        onClick={handleClickOpen}
      >
        Add
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: '#369fff' }}>Add Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="picture"
            label="Picture URL"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}
          sx={{
            color: "#4caf50",
            "&:hover": {
              color: "#c62828",
              transform: "scale(1.05)",
              transition: "0.2s ease-out",
            }
          }}
          >Cancel</Button>
          <Button onClick={handleClose}
           sx={{
            color: "#F6F8FA",
            backgroundColor: "#4caf50",
            "&:hover": {
              transform: "scale(1.4)",
              transition: "0.3s ease-out",
              color: "#F6F8FA",
              backgroundColor: " #388e3c",
            }
          }}
          >Save</Button>
        </DialogActions>
      </Dialog>

      <header className="employee-header">
        <h2>Employees</h2>
        <div style={{ position: "relative" }} />
      </header>
      <EmployeeRow />
    </div>
  );
}

export default Employees;

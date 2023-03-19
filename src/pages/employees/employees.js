import "./employees.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EmployeeRow from "./../../components/employeeRow/employeeRow";
import PageHeader from "../../components/pageHeader/pageHeader";
import axios from "axios";

function Employees() {
  const [open, setOpen] = useState(false);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [picture, setPicture] = useState("");
  const [employee, setEmployee] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("first_name", employee.firstName);
    formdata.append("last_name", employee.lastName);
    formdata.append("email", employee.email);
    formdata.append("phone_number", employee.phoneNumber);
    formdata.append("dob", employee.dob);
    formdata.append("picture", employee.picture);
    let response = await axios.post(
      `${process.env.REACT_APP_API_URL}/employees`,
      formdata
    );
    // console.log("qwertyuio");
    setEmployee([...employee, response.data]);
    setOpen(false);
    try {
      if (response.data.message === "undefined") alert(response.data.message);
      // fetchemployees();
    } catch (error) {
      console.log(error.response.data);
     
    }
  };

  useEffect(() => {
    // fetchEmployees();
  }, []);

  return (
    <div className="container">
      <PageHeader
        pageName={"Employees"}
        onAddClick={handleClickOpen}
        // handleSearchChange={handleSearchChange}
        // searchQuery={searchQuery}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: "#369fff" }}>
          Add Employee
        </DialogTitle>
        <DialogContent>
          <form onSubmit={addEmployee}>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, firstName: event.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, lastName: event.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, email: event.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone Number"
              type="text"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, phone: event.target.value })
              }
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
              onChange={(event) =>
                setEmployee({ ...employee, dob: event.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="picture"
              label="Picture"
              type="file"
              fullWidth
              onChange={(event) =>
                setEmployee({ ...employee, picture: event.target.value })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "#4caf50",
              "&:hover": {
                color: "#c62828",
                transform: "scale(1.05)",
                transition: "0.2s ease-out",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={addEmployee}
            type="submit"
            sx={{
              color: "#F6F8FA",
              backgroundColor: "#4caf50",
              "&:hover": {
                transform: "scale(1.05)",
                transition: "0.2s ease-out",
                color: "#F6F8FA",
                backgroundColor: " #388e3c",
              },
            }}
            onSubmit={handleClose}
          >
            Save
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
      <EmployeeRow />
    </div>
  );
}

export default Employees;


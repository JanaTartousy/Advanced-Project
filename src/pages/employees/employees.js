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
import { useContext } from "react";
import { UserContext } from "../../userContext";
import PageHeader from "../../components/pageHeader/pageHeader";
import axios from "axios";
import { toast } from "react-toastify";

function Employees() {
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [image, setImage] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { token } = useContext(UserContext);

  const addEmployee = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("first_name", employee.firstName);
    formData.append("last_name", employee.lastName);
    formData.append("email", employee.email);
    formData.append("phone_number", employee.phoneNumber);
    formData.append("dob", employee.dob);
    formData.append("picture", image);

    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/employees`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === true) {
        toast.success("Added Employee Successfully");
        setOpen(false);
      } else {
        toast.error("Failed to add employee");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred while sending the request");
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      <PageHeader pageName={"Employees"} onAddClick={handleClickOpen} />

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
                setEmployee({ ...employee, phoneNumber: event.target.value })
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
            <input
              id="picture"
              label="Picture"
              type="file"
              onChange={(event) => {
                setImage(event.target.files[0]);
                console.log(image);
              }}
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
      </Dialog>
      <EmployeeRow />
    </div>
  );
}

export default Employees;

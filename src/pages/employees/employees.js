import "./employees.css";
import React, { useState } from "react";
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
// import { toast } from "react-toastify";
// import axios from "axios";



function Employees(props) {
  const [open, setOpen] = useState(false);
  const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [dateOfBirth,setDateOfBirth]=useState("");
    const [picture, setPictureUrl] = useState(""); 
    
  // const test = () => {
  //   console.log("clicked!!!");}

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddClick(firstName);
    setFirstName("");
    props.onAddClick(lastName);
    setLastName("");
    props.onAddClick(email);
    setEmail("");
    props.onAddClick(phoneNumber);
    setPhoneNumber("");
    props.onAddClick(dateOfBirth);
    setDateOfBirth("");
    props.onAddClick(picture);
    setPictureUrl("");
    props.onClose();
  }
    // const formData = new FormData();
    // if(firstName) formData.append("firstName", firstName);
    // if(lastName) formData.append("lastName", lastName);
    // if(email) formData.append("email", email);
    // if(phoneNumber) formData.append("phoneNumber", phoneNumber);
    // if(dateOfBirth) formData.append("dateOfBirth", dateOfBirth);
    // if(picture) formData.append("picture", picture);
    // formData.append("_method","POST");
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/employees`, formData,)
    //   .then((response) => {
    //     console.log(response)
    //     return toast(" Employee added successfully", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       style: { backgroundColor: "#4dedf5", color: "#16202a" },
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error(error, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //   });
    

  return (
    <div className="container">
      <PageHeader
        pageName={"Employees"}
        onAddClick={handleClickOpen}
        // handleSearchChange={handleSearchChange}
        // searchQuery={searchQuery}
      />

      <Dialog open={open} onClose={handleClose}>
      {/* <form action="Post" onSubmit={handleSubmit}> */}

        <DialogTitle style={{ backgroundColor: "#369fff" }}>
          Add Employee
        </DialogTitle>
        <DialogContent>
        <form  onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="text"
            fullWidth
            onChange={(event) => setPhoneNumber(event.target.value)}
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
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="picture"
            label="Picture URL"
            type="text"
            fullWidth
            onChange={(event) => setPictureUrl(event.target.value)}
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
            onClick={handleClose}
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
            onSubmit={handleSubmit}
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

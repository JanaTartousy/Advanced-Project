import { Link } from "react-router-dom";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./employeeRow.css";
import PaginationContainer from "../table/tablePagination/pagination";
import fetchData from "../../reUsableFunctions/dataGetter";
import PageHeader from "../pageHeader/pageHeader";

export default function DataGridDemo({
  employee,
  onDelete,
  firstName,
  lastName,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { token } = useContext(UserContext);
  const [Employee, setEmployee] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const handleClickOpenDelete = (id) => {
    setOpenDelete(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Employee deleted successfully!");
        handleCloseDelete();
        // history("/employees");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "teamName",
      headerName: "Team Name",
      flex: 1,
    },
    {
      field: "Actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <Link to={`/profile/${params.row.id}`}>
            <VisibilityIcon
              className="employee-view-icon"
              name="view employee"
              variant="contained"
              sx={{
                color: "#4caf50",
                "&:hover": {
                  transform: "scale(1.2)",
                  transition: "0.3s ease-out",
                  color: "#388e3c",
                  marginRight: "5px",
                },
              }}
            ></VisibilityIcon>
          </Link>
          <Delete
            className="employee-delete-icon"
            onClick={() => handleClickOpenDelete(params.row.id)}
            name="delete employee"
            variant="contained"
            sx={{
              color: "#f44336",
              marginLeft: "10px",
              "&:hover": {
                transform: "scale(1.2)",
                transition: "0.3s ease-out",
                color: "#c62828",
              },
            }}
          ></Delete>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (token) {
      fetchData(
        `${process.env.REACT_APP_API_URL}/employees`,
        { Authorization: `Bearer ${token}` },
        { per_page: 10, page: currentPage, search: searchQuery }
      )
        .then((data) => {
          // set teams and lastPage state
          const employees = data.employees.data.map((employee, index) => {
            return {
              id: employee.id,
              firstName: employee.first_name,
              lastName: employee.last_name,
              teamName: employee.team?.name || "Empty",
            };
          });
          setEmployee(employees);
          setLastPage(data.employees.last_page);
        })
        .catch((error) => {
          toast.error("Error occurred while getting employees.");
          console.log(error.message);
        });
    }
  }, [currentPage, searchQuery, token]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  function handlePageChange(event, value) {
    setCurrentPage(value);
  }
  return (
    <>
      <PageHeader
        pageName={"Teams"}
        onAddClick={handleClickOpen}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
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
      <div style={{ width: "100%" }}>
        <DataGrid
          autoHeight
          autoWidth
          rows={Employee}
          onDelete={handleDelete}
          columns={columns.filter((column) => column.field !== "id")}
          disableRowSelectionOnClick
          sx={{
            width: "100%",
            height: "71vh",
            marginTop: "20px",
            backgroundColor: "#f4f9fc",
          }}
          pagination="false"
        />
      </div>
      <PaginationContainer
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
      />
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle sx={{ color: "#f44336" }}>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this employee?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDelete}
            sx={{
              "&:hover": {
                transform: "scale(1.05)",
                transition: "0.2s ease-out",
                color: "#388e3c",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(openDelete)}
            variant="contained"
            color="error"
            sx={{
              "&:hover": {
                transform: "scale(1.05)",
                transition: "0.2s ease-out",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

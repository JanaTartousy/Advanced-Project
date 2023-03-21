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
} from "@mui/material";
import "./employeeRow.css";

export default function DataGridDemo({
  employee,
  onDelete,
  firstName,
  lastName,
}) {
  const { token } = useContext(UserContext);
  const [Employee, setEmployee] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);

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
    { field: "id", headerName: "ID" },

    {
      field: "firstName",
      headerName: "First name",
      width: 400,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 400,
    },
    {
      field: "teamName",
      headerName: "Team Name",
      width: 400,
    },
    {
      field: "Actions",
      headerName: "Action",
      width: 300,
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
    token &&
      axios
        .get(`${process.env.REACT_APP_API_URL}/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response);
          // console.log(response.data);
          const employees = response.data.employees.map((employee, index) => {
            return {
              id: employee.id,
              firstName: employee.first_name,
              lastName: employee.last_name,
              teamName: employee.team?.name || "Empty",
            };
          });
          setEmployee(employees);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error occurred while getting employees.");
        });
  }, [token]);

  return (
    <>
      <DataGrid
        rows={Employee}
        onDelete={handleDelete}
        columns={columns.filter((column) => column.field !== "id")}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        sx={{
          width: "100%",
          height: "71vh",
          marginTop: "20px",
          backgroundColor: "#f4f9fc",
        }}
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

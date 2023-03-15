import { Link } from "react-router-dom";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
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

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    onDelete(employee.id);
    setOpenDelete(false);
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
    },    {
      field: "teamName",
      headerName: "Team Name",
      width: 400,
    },
    {
      field: "Actions",
      headerName: "Action",
      width:150, 
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
                marginRight:"5px"
              },
            }}
          ></VisibilityIcon>
        </Link>
  <Delete
  className="employee-delete-icon"
  onClick={handleClickOpenDelete}
  name="delete employee"
  variant="contained"
  sx={{
    color: "#f44336",
    "&:hover": {
      transform: "scale(1.2)",
      transition: "0.3s ease-out",
      color: "#c62828",
    },
  }}
></Delete></>
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
          console.log(response);
          console.log(response.data);
          const employees = response.data.employees.map((employee, index) => {
            return {
              id: employee.id,
              firstName: employee.first_name,
              lastName: employee.last_name,
              teamName:employee.team?.name||"Empty"
            };
          });
          setEmployee(employees);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [token]);

  return (
    <>
      <DataGrid
        rows={Employee}
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
          marginTop: "50px",
          backgroundColor: "#f4f9fc",
        }}
      />
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle sx={{ color: "#f44336" }}>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this team?
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
            onClick={handleDelete}
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

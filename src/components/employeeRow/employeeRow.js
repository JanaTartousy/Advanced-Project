import { Link } from "react-router-dom";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";



export default function DataGridDemo({ firstName, lastName }) {
  const {token}= useContext(UserContext);
  const [Employee, setEmployee] = useState([]);
 
  useEffect(() => {
    token &&
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/employees`, // include search query in API request
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log(response.data);
          const employees= response.data.employees.map((employee,index)=>{
            return {id:employee.id,firstName:employee.first_name,lastName:employee.last_name}
          })
          setEmployee(employees)
        })
        .catch((error) => {
          console.log(error);
        });
  }, [ token]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 250,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 800,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Link to={`/profile/${params.row.id}`}>
          <Edit
            name="edit employee"
            variant="contained"
            sx={{
              color: "#333",
              "&:hover": {
                transform: "scale(1.4)",
                transition: "0.3s ease-out",
                color: "#369fff",
              },
            }}
          ></Edit>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: () => (
        <Delete
          name="delete employee"
          variant="contained"
          sx={{
            color: "rgb(219 28 28)",
            "&:hover": {
              transform: "scale(1.4)",
              transition: "0.3s ease-out",
            },
          }}
        ></Delete>
      ),
    },
  ];
  
 

  return (
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
        backgroundColor: "#f4f9fc",
      }}
    />
  );
}

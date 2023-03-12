import { Link } from "react-router-dom";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

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
export default function DataGridDemo({ firstName, lastName }) {
  const rows = [
    // { id: 1, firstName: firstName, lastName: lastName },
    { id: 1, firstName: "Jon", lastName: "Snow" },
    { id: 2, firstName: "Cersei", lastName: "Lannister" },
    { id: 3, firstName: "Jaime", lastName: "Lannister" },
    { id: 4, firstName: "Arya", lastName: "Stark" },
    { id: 5, firstName: "Daenerys", lastName: "Targaryen" },
    { id: 6, firstName: "Bella", lastName: "Melisandre" },
    { id: 7, firstName: "Ferrara", lastName: "Clifford" },
    { id: 8, firstName: "Rossini", lastName: "Frances" },
    { id: 9, firstName: "Harvey", lastName: "Roxie" },
  ];

  return (
    <DataGrid
      rows={rows}
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

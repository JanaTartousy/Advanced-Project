import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "employeeName",
    headerName: "Employee name",
    width: 610,
    editable: true,
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 150,
    renderCell: () => (
      <Edit
        name="edit employee"
        variant="contained"
        sx={{
          color: "#333",
          "&:hover": {},
        }}
      ></Edit>
    ),
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 200,
    renderCell: () => (
      <Delete
        name="delete employee"
        variant="contained"
        sx={{
          color: "rgb(219 28 28)",
          "&:hover": {},
        }}
      ></Delete>
    ),
  },
];

const rows = [
  { id: 1, employeeName: "Jon" },
  { id: 2, employeeName: "Cersei" },
  { id: 3, employeeName: "Jaime" },
  { id: 4, employeeName: "Arya" },
  { id: 5, employeeName: "Daenerys" },
  { id: 6, employeeName: "Bella" },
  { id: 7, employeeName: "Ferrara" },
  { id: 8, employeeName: "Rossini" },
  { id: 9, employeeName: "Harvey" },
];

export default function DataGridDemo() {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
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
        width: 1000,
        backgroundColor: "#f4f9fc",
      }}
    />
  );
}

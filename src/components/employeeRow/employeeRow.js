import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";


const columns = [
   { field: 'id', headerName: 'ID', width: 90 },
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
      <Button
        name="edit employee"
        variant="contained"
        onClick={()=>alert('You can now edit an employee')}
        sx={{
          
          backgroundColor: "#369fff",
          color: "#F6F8FA",
          "&:hover": {
            backgroundColor: "#369fff",
            color: "#333",
          },
        }}
      >
        {" "}
        <Edit />
      </Button>
    ),
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 200,
    renderCell: () => (
      <Button
        name="delete employee"
        variant="contained"
        onClick={()=>alert('Employee deleted successfully')}
       sx={{
         
          backgroundColor: "#369fff",
          color: "#F6F8FA",
          "&:hover": {
            backgroundColor: "#369fff",
            color: "#333",
          },
        }}
      >
        {" "}
        <Delete />
      </Button>
    ),
  },
];

const rows = [
  { id: 1, employeeName: "Jon"},
  { id: 2, employeeName: "Cersei"},
  { id: 3, employeeName: "Jaime"},
  { id: 4, employeeName: "Arya"},
  { id: 5, employeeName: "Daenerys" },
  { id: 6, employeeName: "Bella" },
  { id: 7, employeeName: "Ferrara" },
  { id: 8, employeeName: "Rossini" },
  { id: 9, employeeName: "Harvey"},
];

export default function DataGridDemo() {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 20,
          },
        },
      }}
      pageSizeOptions={[20]}
      disableRowSelectionOnClick
      sx={{
        width: 1000,
        backgroundColor: '#daf1fc',
      }}
    />
  );
};

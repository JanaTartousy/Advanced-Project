import "./projects.css";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const useStyles = makeStyles({
  table: {
    height: "70vh",
    margin: "0 auto",
    width: "90%",
  },
});

function Projects() {
  const classes = useStyles();

  const projects = [
    { id: 1, name: "Project A", description: "2023-03-15", finished: "no" },
    { id: 2, name: "Project B", description: "2023-03-20", finished: "yes" },
    { id: 3, name: "Project C", description: "2023-03-25", finished: "yes" },
    { id: 1, name: "Project A", description: "2023-03-15", finished: "no" },
    { id: 2, name: "Project B", description: "2023-03-20", finished: "no" },
    { id: 3, name: "Project C", description: "2023-03-25", finished: "yes" },
    { id: 1, name: "Project A", description: "2023-03-15", finished: "no" },
    { id: 2, name: "Project B", description: "2023-03-20", finished: "yes" },
    { id: 3, name: "Project C", description: "2023-03-25", finished: "yes" },
    
  ];

  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Button
          startIcon={<AddCircleIcon />}
          style={{
            fontSize: 12,
            backgroundColor: "#369fff",
            color: "white",
            marginLeft: "55%",
            marginBottom: "0.5%",
          }}
          size="large"
          onClick={() => alert("You can now add a project")}
          variant="contained"
        >
          Add
        </Button>
        <div
          className="project-header"
          style={{
            position: "relative",
            width: "100%",
            height: "80px",
            backgroundColor: "#369FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: " 1px solid #E0E0E0",
            color: "white",
          }}
        >
          <h2>Projects</h2>
          <div />
        </div>

        <Table className={classes.table} aria-label="projects table">
          <TableHead>
            <TableRow>
              <TableCell className="MuiTableCell-head">Projects Name</TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                Description
              </TableCell>

              <TableCell align="center" className="MuiTableCell-head">
                Finished
              </TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                Team
              </TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                Edit
              </TableCell>
              <TableCell align="center" className="MuiTableCell-head">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="MuiTableRow-root">
                <TableCell
                  component="th"
                  scope="row"
                  className="MuiTableCell-root"
                >
                  {project.name}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  {project.description}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  {project.finished}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  <Button
                    sx={{
                      color: "#333",
                      "&:hover": { color: "darkblue" },
                    }}
                  >
                    Team
                  </Button>
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  <Button
                    sx={{
                      color: "#1976d2",
                    }}
                  >
                    {<EditIcon />}
                  </Button>
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  <Button
                    sx={{
                      color: "red"
                    }}
                  >
                    {<DeleteIcon />}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Projects;

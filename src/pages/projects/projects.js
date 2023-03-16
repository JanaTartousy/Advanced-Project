import "./projects.css";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import SearchBar from "../teams/search";
import { FaPlus } from "react-icons/fa";

function Projects() {
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
        <header className="projectsHeader">
          <h1>Projects</h1>

          <button className="Add-button">
            <FaPlus /> ADD
          </button>
          <SearchBar />
        </header>

        <Table className="tableall" aria-label="projects table">
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
                    {<Edit />}
                  </Button>
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  <Button
                    sx={{
                      color: "red",
                    }}
                  >
                    {<Delete />}
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

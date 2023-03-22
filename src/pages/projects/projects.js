import "./projects.css";
import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { UserContext } from "../../userContext";
import PageHeader from "../../components/pageHeader/pageHeader";

function Projects() {
  const [projects, setProjects] = useState([]);
  const { token } = useContext(UserContext);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const data = response.data.projects;
        setProjects(
          data.data.map((project) => {
            return {
              id: project.id,
              name: project.name,
              description: project.description,
              team: project.team?.name || "Not Assigned",
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  const handleAddProject=() => {

  }
  return (
    <div className="container">
      <PageHeader onAddClick={handleAddProject} pageName={"Projects"} />

      <TableContainer sx={{ width: "100%" }} component={Paper}>
        {projects && (
          <Table className="tableall" aria-label="projects table">
            <TableHead
              sx={{ backgroundColor: "var(--accent)"}}
            >
              <TableRow>
                <TableCell className="MuiTableCell-head">
                  Projects Name
                </TableCell>
                <TableCell align="center" sx={{color: "var(--main)" }}>
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
                    {project.finished ? "YES" : "NO"}
                  </TableCell>
                  <TableCell align="center" className="MuiTableCell-root">
                    <Button
                      sx={{
                        color: "#333",
                        "&:hover": { color: "darkblue" },
                      }}
                    >
                      {project.team}
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
        )}
      </TableContainer>
    </div>
  );
}

export default Projects;

import "./projects.css";
import React from "react";
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
import CategoryIcon from "@material-ui/icons/Category";
import { Box } from "@mui/system";
// import Add from "@mui/icons-material/Add";

const useStyles = makeStyles({
  table: {
    maxWidth: "40%",
    backgroundColor: "#f4f9fc",
    margin: "0 auto",
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
    { id: 1, name: "Project A", description: "2023-03-15", finished: "no" },
    { id: 2, name: "Project B", description: "2023-03-20", finished: "no" },
    { id: 3, name: "Project C", description: "2023-03-25", finished: "yes" },
  ];

  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "40%",
              height: "56px",
              backgroundColor: "blue",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: " 1px solid #E0E0E0",
              color: "white",
            }}
          >
            <h2>Projects</h2>
          </Box>
        </Box>

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
                  {<CategoryIcon />}
                  {project.name}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  {project.description}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  {project.finished}
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  <Button variant="contained" color="secondary">
                    Team
                  </Button>
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  <Button variant="contained" color="primary">
                    {<EditIcon />}
                  </Button>
                </TableCell>
                <TableCell align="center" className="MuiTableCell-root">
                  <Button variant="contained" color="secondary">
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

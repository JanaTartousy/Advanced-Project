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
import axios from "axios";
import { UserContext } from "../../userContext";
import PageHeader from "../../components/pageHeader/pageHeader";
import AddProjectPopup from "./addProjectPopup/addProjectPopup";
import EditProjectPopup from "./editProjectPopup/editEditPopup";
import DeleteProjectPopup from "./deleteProjectPopup/deleteProjectPopup";
import { toast } from "react-toastify";
import fetchData from "../../reUsableFunctions/dataGetter";
import PaginationContainer from "../../components/table/tablePagination/pagination";
import { IconButton } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";

function Projects() {
  const [refresh, setRefresh] = useState(false);
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [deleteProjectOpen, setDeleteProjectOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editProject, setEditProject] = useState(false);
  const { token } = useContext(UserContext);
  function handlePageChange(event, value) {
    setCurrentPage(value);
  }
  useEffect(() => {
    if (token) {
      fetchData(
        `${process.env.REACT_APP_API_URL}/projects`,
        { Authorization: `Bearer ${token}` },
        { per_page: 10, page: currentPage, search: searchQuery }
      )
        .then((response) => {
          const data = response.projects;
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
          setLastPage(response.projects.last_page);
          // set teams and lastPage state
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [token, refresh, currentPage, searchQuery]);
  const handleAddProjectClose = () => {
    setAddProjectOpen(false);
  };
  const handleEditProjectClose = () => {
    setEditProjectOpen(false);
  };
  const handleDeleteProjectClose = () => {
    setDeleteProjectOpen(false);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleAddProject = (obj) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/projects`, obj, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Project Added Successfully");
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
      });
  };
  const handleEditProject = (id, obj) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/projects/${id}`, obj, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Project Edited Successfully");
        setEditProject("");
        setRefresh(!refresh);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  const handleDeleteProject = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.error("Project Deleted successfully");
        setEditProject("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <PageHeader
        onAddClick={(event) => {
          setAddProjectOpen(true);
        }}
        pageName={"Projects"}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />

      <TableContainer sx={{ width: "100%" }} component={Paper}>
        {projects && (<>
          <Table className="tableall" aria-label="projects table">
            <TableHead sx={{ backgroundColor: "var(--accent)" }}>
              <TableRow>
                <TableCell sx={{ color: "var(--main)" }}>
                  Projects Name
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--main)" }}>
                  Description
                </TableCell>

                <TableCell align="center" sx={{ color: "var(--main)" }}>
                  Finished
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--main)" }}>
                  Team
                </TableCell>
                <TableCell align="center" sx={{ color: "var(--main)" }}>
                  Action
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
                  <IconButton onClick={(event)=>setEditProjectOpen(true)}>
            <FaEdit
              className="action-icon edit-team-icon-name"
              title="Edit Team Name"
            />
          </IconButton>
          <IconButton onClick={(event)=>setDeleteProjectOpen(true)}>
            <FaTrash
              className="action-icon delete-team-icon"
              title="Delete Team"
            />
          </IconButton>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
        )}
      </TableContainer>
        {projects&&<PaginationContainer
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={handlePageChange}
        />}

      <AddProjectPopup
        open={addProjectOpen}
        onClose={handleAddProjectClose}
        onAddProject={handleAddProject}
      />
      <EditProjectPopup
        project={editProject}
        open={editProjectOpen}
        onClose={handleEditProjectClose}
        onEditProject={handleEditProject}
      />
      <DeleteProjectPopup
        id={editProject.id}
        open={deleteProjectOpen}
        onClose={handleDeleteProjectClose}
        onDelete={handleDeleteProject}
      />
    </div>
  );
}

export default Projects;

import React, { useState } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./teamRow.css";
import { useNavigate } from "react-router-dom";

function TeamRow({ team, onDelete, onEdit }) {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [teamName, setTeamName] = useState(team.name);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    onDelete(team.id);
    setOpenDelete(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = () => {
    onEdit(team.id, teamName);
    setOpenEdit(false);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };
  function viewTeam() {
    navigate(`/teams/${team.id}`);
  }
  const members = team.employees.length;
  const projects = team.projects.length;

  return (
    <>
      <tr>
        <td>
          <IconButton onClick={handleClickOpenEdit}>
            <FaEdit
              className="action-icon edit-team-icon-name"
              title="Edit Team Name"
            />
          </IconButton>
          {team.name}{" "}
        </td>
        <td>{projects}</td>
        <td>{members}</td>
        <td>
          <IconButton onClick={() => {}}>
            <FaEye
              className="action-icon view-team-icon"
              title="View Team"
              onClick={viewTeam}
            />
          </IconButton>
          <IconButton>
            <FaEdit
              className="action-icon edit-team-members-icon"
              title="Edit Team Members and Projects"
            />
          </IconButton>
          <IconButton onClick={handleClickOpenDelete}>
            <FaTrash
              className="action-icon delete-team-icon"
              title="Delete Team"
            />
          </IconButton>
        </td>
      </tr>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle sx={{ color: "#f44336" }}>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this team?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle sx={{ color: "#2196f3" }}>Edit Team</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="teamName"
            label="Team Name"
            type="text"
            value={teamName}
            onChange={handleTeamNameChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TeamRow;

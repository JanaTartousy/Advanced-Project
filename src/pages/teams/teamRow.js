import React, { useState } from 'react';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import './teamRow.css';

function TeamRow({ team, onDelete ,onEdit}) {
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
    onEdit(team.id,teamName)
    setOpenEdit(false);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const members = team.employees.length;
  const projects = team.projects.length;

  return (
    <>
      <tr>
        <td>{teamName}</td>
        <td>{projects}</td>
        <td>{members}</td>
        <td>
          <IconButton onClick={() => {}}>
            <FaEye className="action-icon view-icon" title="View Team" />
          </IconButton>
          <IconButton onClick={handleClickOpenEdit}>
            <FaEdit className="action-icon edit-icon" title="Edit Team" />
          </IconButton>
          <IconButton onClick={handleClickOpenDelete}>
            <FaTrash className="action-icon delete-icon" title="Delete Team" />
          </IconButton>
        </td>
      </tr>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle sx={{color:"#f44336"}}>Delete Confirmation</DialogTitle>
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
        <DialogTitle sx={{color:"#2196f3"}}>Edit Team</DialogTitle>
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

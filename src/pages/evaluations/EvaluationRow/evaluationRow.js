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
import "./evaluationRow.css";
import { useNavigate } from "react-router-dom";

function EvaluationRow({ evaluations, onDelete, onEdit ,projects,members}) {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [evaluationName, setEvaluationName] = useState("");

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    onDelete(evaluations.id);
    setOpenDelete(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = () => {
    onEdit(evaluations.id, evaluationName);
    setOpenEdit(false);
  };

  const handleEvaluationNameChange = (event) => {
    setEvaluationName(event.target.value);
  };
  function viewEvaluation() {
    navigate(`/evaluation/${evaluations.id}`);
  }


  return (
    <>
      <tr>
        <td>

          {evaluations.employeeName}{" "}
        </td>
        <td>{evaluations.kpiName}</td>
        <td>{evaluations.evaluation}</td>
        <td>{evaluations.dateEvaluated}</td>
        <td>
          <IconButton onClick={viewEvaluation}>
            <FaEye
              className="action-icon view-evaluations-icon"
              title="View Evaluation"
              
            />
          </IconButton>
          <IconButton onClick={handleClickOpenEdit}>
            <FaEdit
              className="action-icon edit-evaluations-icon-name"
              title="Edit Evaluation Name"
            />
          </IconButton>
          <IconButton onClick={handleClickOpenDelete}>
            <FaTrash
              className="action-icon delete-evaluations-icon"
              title="Delete Evaluation"
            />
          </IconButton>
        </td>
      </tr>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle sx={{ color: "#f44336" }}>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this evaluations?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle sx={{ color: "#2196f3" }}>Edit Evaluation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="evaluationName"
            label="Evaluation Name"
            type="text"
            value={evaluationName}
            onChange={handleEvaluationNameChange}
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

export default EvaluationRow;

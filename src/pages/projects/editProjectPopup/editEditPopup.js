import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function EditProjectPopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = {_method:"PATCH"};

    if (name) obj.name = name;
    if (description) obj.description = description;

    props.onEdit(props.project.id, obj);
    setName("");
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle sx={{ color: "var(--accent)" }}>Add Project</DialogTitle>
      <DialogContent>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Name"
            variant="outlined"
            defaultValue={props.project?.name}
            onChange={(event) => setName(event.target.value)}
            required
            sx={{ marginTop: "1rem" }}
          />
          <TextField
            defaultValue={props.project?.description}
            label="Description"
            variant="outlined"
            onChange={(event) => setDescription(event.target.value)}
            required
            sx={{ marginTop: "1rem" }}
          />

        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Project
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProjectPopup;

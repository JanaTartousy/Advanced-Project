import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

function AddProjectPopup(props) {
  const [finished, setFinished] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = { name, description, finished };

    props.onAddProject(obj);
    setName("");
    props.onClose();
  };
  const handleCheckboxChange = (event) => {
    setFinished(event.target.checked);
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
            autoFocus={true}
            onChange={(event) => setName(event.target.value)}
            required
            sx={{ marginTop: "1rem" }}
          />

          <TextField
            label="Description"
            variant="outlined"
            autoComplete="off"
            onChange={(event) => setDescription(event.target.value)}
            required
            sx={{ marginTop: "1rem" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={finished}
                onChange={handleCheckboxChange}
                inputProps={{ "aria-label": "finished checkbox" }}
              />
            }
            label="Finished"
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

export default AddProjectPopup;

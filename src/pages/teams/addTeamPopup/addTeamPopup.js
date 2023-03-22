import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function AddTeamPopup(props) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddTeam(name);
    setName("");
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} sx={{ padding: "100px" }}>
      <DialogTitle sx={{ color: "var(--accent)" }}>Add Team</DialogTitle>
      <DialogContent>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            sx={{ marginTop: "1rem" }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Team
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTeamPopup;

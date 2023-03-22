import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function AddAdminPopup(props) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddTeam(name);
    setName("");
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle sx={{color:"#4caf50"}}>Add Admin</DialogTitle>
      <DialogContent>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Name"
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
            required
            sx={{ marginTop: "1rem" }}
          />
           <TextField
            label="Email"
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
            required
            sx={{ marginTop: "1rem" }}
          />
           <TextField
           type="password"
            label="Password"
            variant="outlined"
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

export default AddAdminPopup;

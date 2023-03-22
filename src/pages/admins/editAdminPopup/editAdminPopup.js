import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function EditAdminPopup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = {_method:"PATCH"};

    if (name) obj.name = name;
    if (email) obj.email = email;
    if (password) obj.password = password;

    props.onEditAdmin(props.admin.id, obj);
    setName("");
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle sx={{ color: "var(--accent)" }}>Add Admin</DialogTitle>
      <DialogContent>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Name"
            variant="outlined"
            defaultValue={props.admin?.name}
            onChange={(event) => setName(event.target.value)}
            required
            sx={{ marginTop: "1rem" }}
          />
          <TextField
            defaultValue={props.admin?.email}
            label="Email"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
            required
            sx={{ marginTop: "1rem" }}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            autoComplete="new-password"
            onChange={(event) => setPassword(event.target.value)}
            required
            sx={{ marginTop: "1rem" }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Admin
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAdminPopup;

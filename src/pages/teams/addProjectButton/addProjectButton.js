import { Button } from "@mui/material";
import React from "react";
import "./addProjectButton.css";

function AddProjectButton(props) {
  return (
    <Button className="custom-button" onClick={props.onClick}>
      {props.children}
    </Button>
  );
}

export default AddProjectButton;

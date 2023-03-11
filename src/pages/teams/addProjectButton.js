import React from "react";
import "./addProjectButton.css";

function AddProjectButton(props) {
  return (
    <button className="custom-button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default AddProjectButton;

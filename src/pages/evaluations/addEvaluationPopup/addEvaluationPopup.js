import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Input,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SelectMenu from "../SelectOptions/selectMenu";
import dayjs from 'dayjs';
import zIndex from "@mui/material/styles/zIndex";

function AddEvaluationPopup(props) {
  // const [ , setName] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const [employee, setEmployee] = useState("");
  const [kpi, setKpi] = useState("");
  // const [name, set] = useState("");


  const handleNumberInput = (event) => {
    const value = Number(event.target.value);
  
    // Check if the value is outside the range of 0 to 10
    if (value < 0) {
      event.target.value = 0;
    } else if (value > 10) {
      event.target.value = 10;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.onAddTeam(name);
    // setName("");
    props.onClose();
  };
  const date = new Date;

  // console.log(props.options);
  console.log(props.kpiOption);
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      {/* {console.log(props)} */}
      <DialogTitle sx={{color:"#4caf50", marginBottom: "5px"}}>Add Employee</DialogTitle>
      <DialogContent
         sx={{marginTop: "4px", overflow: "visible"}}
      >
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem"}}
          onSubmit={handleSubmit}
        >
        <SelectMenu
          labelName="Employee"
          value ={"employeeName"}
          options={props.employeeOption}
         
        />
        <SelectMenu
          labelName="Kpi"
          value ={'kpiName'}
          options={props.kpiOption}
        />
        <TextField 
          type="date"
          id="date-evaluated"
          label="Date Evaluated"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          type="number"
          label="Evaluation Value"
          hiddenLabel="Evaluation Value"
          InputProps={{
            inputProps: {
              min: 0,
              max: 10,
              oninput: handleNumberInput
            }
          }}
        />

        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Evaluation
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEvaluationPopup;

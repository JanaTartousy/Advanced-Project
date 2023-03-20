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
import SelectMenu from "../SelectOptions/selectMenu";
import axios from "axios";

function AddEvaluationPopup(props) {
 const [selectedEmployee, setSelectedEmployee] = useState('');
 const [kpiName, setKpiName] = useState("");
 const [dateEvaluated, setDateEvaluated] = useState("");
 const [evaluation, setEvaluation] = useState(0);
const [newEvaluation, setNewEvaluation] = useState({
  employeeName: "",
  kpiName: "",
  dateEvaluated: "",
  evaluation: "",
})
    const handleNumberInput = (event) => {
    const value = Number(event.target.value);
  
    // Check if the value is outside the range of 0 to 10
    if (value < 0) {
      event.target.value = 0;
    } else if (value > 10) {
      event.target.value = 10;
    }
  };

  const handleChange = (e) => {
    setNewEvaluation({ ...newEvaluation, [e.target.name]: e.target.value });
    console.log(newEvaluation);
  };

  // const handleChangeEmployee = (setSelectedEmployee) => (event) => {
  //   setSelectedEmployee(event.target.value);
  //   console.log(selectedEmployee);
  // }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const response = await axios.post(``, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // Access the selected employee value


  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle sx={{color:"#4caf50", marginBottom: "5px"}}>New Evaluation</DialogTitle>
      <DialogContent
         sx={{marginTop: "4px", overflow: "visible"}}
      >
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem"}}
          onSubmit={handleSubmit}
        >
        <SelectMenu
          labelName="Employee"
          categorie ={"employeeName"}
          options={props.employeeOption}
          // onChange={(event) => handleChangeEmployee(setSelectedEmployee)}
          onChange={handleChange}
          name="employeeName"
        />
        <SelectMenu
          labelName="Kpi"
          categorie ={'kpiName'}
          options={props.kpiOption}
          onChange={handleChange}
          // onChange={(event) => handleChange(event, 'kpiName')}
          name="kpiName"
        />
        <TextField 
          type="date"
          id="date-evaluated"
          label="Date Evaluated"
          onChange={handleChange}
          // onChange={(event) => handleChange(event, 'employeeName')}
          name="dateEvaluated"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          type="number"
          label="Evaluation Value"
          onChange={handleChange}
          // onChange={handleChange}
          name="evaluation"
          InputProps={{
            inputProps: {
              min: 0,
              max: 10,
              onInput: handleNumberInput
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

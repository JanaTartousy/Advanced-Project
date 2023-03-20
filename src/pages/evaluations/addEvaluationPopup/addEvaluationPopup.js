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
 const [employeeId, setEmployeeId] = useState('');
 const [kpiId, setKpiId] = useState("");
 const [dateEvaluated, setDateEvaluated] = useState("");
 const [evaluation, setEvaluation] = useState(0);
const [newEvaluation, setNewEvaluation] = useState({
  kpi_id: "",
  employee_id: "",
  date_evaluated: "",
  evaluation: 0,
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

  const handleChange2 = (event) => {
    setNewEvaluation({ ...newEvaluation, [event.target.name]: event.target.value })
    console.log(newEvaluation);
  };

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
          onChange={handleChange}
          name="employee_id"
          handleChange={handleChange2}
        />
        <SelectMenu
          labelName="Kpi"
          categorie ={'kpiName'}
          options={props.kpiOption}
          onChange={handleChange}
          name="kpi_id"
          handleChange={handleChange2}
        />
        <TextField 
          type="date"
          id="date-evaluated"
          label="Date Evaluated"
          onChange={handleChange2}
          name="date_evaluated"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          type="number"
          label="Evaluation Value"
          onChange={handleChange2}
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

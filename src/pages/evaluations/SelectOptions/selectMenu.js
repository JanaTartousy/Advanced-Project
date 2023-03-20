import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMenu(props) {
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
    console.log(event.target.value); 
  };
  const handleClick = (name) => {
    props.getValue ? props.getEmployeeName(name) : props.getKpiName(name);
  }

  const handleChangeEmployee = (setSelectedEmployee) => (event) => {
    setSelectedEmployee(event.target.value);
  }

  // const handleChangeEmployee = (setSelectedEmployee) => (event) => {
  //   setSelectedEmployee(event.target.value);
  // }
  

  console.log(props.options);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.labelName}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          // id="demo-simple-select"
          // value={selected}
          label={props.labelName}
          onChange={handleChange}
          sx={{ minWidth: 200}}
        >
          {props.options && props.options.map((option, index) => {
            return (
              <MenuItem
                key={index}
                value={option[props.categorie]}
                >
                {option[props.categorie]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

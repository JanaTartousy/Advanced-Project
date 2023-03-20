import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMenu(props) {
  const [selected, setSelected] = useState('');




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
          name={props.name}
          label={props.labelName}
          onChange={props.handleChange}
          sx={{ minWidth: 200}}
        >
          {props.options && props.options.map((option, index) => {
            return (
              <MenuItem
                key={index}
                value={option.id}

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

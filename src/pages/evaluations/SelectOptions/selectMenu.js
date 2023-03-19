// import * as React from "react";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// function SelectMenu(props) {
//   const [section, setSection] = useState([]);
//   const [data, setData] = useState([]);

//   const handleClassesChange = (event) => {
//     setData(event.target.value);
//   };
//   const handleSectionsChange = (event) => {
//     setSection(event.target.value);
//   };
//   const handleClick = (id) => {
//     props.getSections ? props.getSections(id) : props.getStudents(id)
//   };
//    const handleChange = (event) => {
//     setData(event.target.value);
//   };

//   console.log(data);
//   console.log(section)
//   return (
//     <Box sx={{ minWidth: 200 }}>
//       <InputLabel id="demo-simple-select-label">{props.labelName}</InputLabel>
//      <Select
// labelId="demo-simple-select-label"
// id="demo-simple-select"
// value={age}
// label={props.labelName}
// onChange={handleChange}
// sx={{ minWidth: 200 }}
// >
//         {props.options.map((option, index) => {
//           return (
//             <MenuItem
//               key={index}
//               value={option.name}
//               onClick={() => handleClick(option.id)}
//             >
//               {option.employeeName}
//             </MenuItem>
//           );
//         })}
//       </Select>
//     </Box>
//   );
// }


import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMenu(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  console.log(props.options);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.labelName}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={props.labelName}
          onChange={handleChange}
          sx={{ minWidth: 200}}
        >
          {props.options && props.options.map((option, index) => {
            return (
              <MenuItem
                key={index}
                value={option[props.value]}
              >
                {option[props.value]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

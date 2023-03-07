import "./employees.css";
import { Button } from "@mui/material";
import EmployeeRow from "./../../components/employeeRow/employeeRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
      white: { main: "#F6F8FA" },
      accent: {main: "#369fff"},
      accentderv: {main: "#69B7FF"},
      gray: {main: "#707070"},
      black: {main: "#333"},
  },
});

function Employees() {
  return (
    <div className="container">
      <div className="employee-header">
        <h2>Employees</h2>
        <div style={{ position: 'relative' }}/>
        <Button 
         style={{
            fontSize: 12,
            backgroundColor: "white",
            color: "black",
             position: 'absolute',right: 71, top: 18,
         }}
         
         size="large"
         onClick={()=>alert('You can now add an employee')}
         variant="contained">
            Add
        </Button>
        <ThemeProvider theme={theme}></ThemeProvider>
      </div>
      <EmployeeRow/>
    </div>
  );
}

export default Employees;

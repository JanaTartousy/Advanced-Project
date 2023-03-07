import "./employeeRow.css";
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import  DeleteIcon from "@mui/icons-material/Delete";

const theme = createTheme({
  palette: {
    white: { main: "#F6F8FA" },
    accent: { main: "#369fff" },
    accentderv: { main: "#69B7FF" },
    gray: { main: "#707070" },
    black: { main: "#333" },
  },
});

function EmployeeRow() {
  return (
    <div className="contain"> 
      <div className="employee-name">
        <h4>Employee Name</h4>
      </div>
      <div className="row">
        <div className="buttons">
          <ButtonGroup
            variant="contained"
            style={{
              fontSize: 15,
              backgroundColor: "accent",
              color: "white",
            }}
            size="large"
          >
            <Button onClick={() => alert("You can now edit employee profile")}>
              Edit
            </Button>
            <Button 
            startIcon={<DeleteIcon/>}
            onClick={() => alert("Employee has been removed")}>
              Delete
            </Button>
          </ButtonGroup>
          <ThemeProvider theme={theme}></ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRow;

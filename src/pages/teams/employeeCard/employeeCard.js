import { useNavigate } from "react-router-dom";
import "./employeeCard.css"

function EmployeeCard(props) {
    const { employee } = props;
    const navigate=useNavigate()
    return (
      <div className="employee-card" onClick={()=>{navigate(`/profile/${employee.id}`)}}>
        <img src={employee.picture} alt="Profile" />
          <h3>{employee.first_name} {employee.last_name}</h3>
      </div>
    );
  }
export default EmployeeCard  
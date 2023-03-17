import "./employeeCard.css"

function EmployeeCard(props) {
    const { employee } = props;
  
    return (
      <div className="employee-card">
        <img src={employee.picture} alt="Profile" />
          <h3>{employee.first_name} {employee.last_name}</h3>
      </div>
    );
  }
export default EmployeeCard  
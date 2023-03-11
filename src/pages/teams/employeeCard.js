import "./employeeCard.css"

function EmployeeCard(props) {
    const { employee } = props;
  
    return (
      <div className="employee-card">
        <img src={`${process.env.REACT_APP_PICTURE_URL}/storage/employee_pictures/${employee.picture.split("/").pop()}`} alt="Profile" />
          <h3>{employee.first_name} {employee.last_name}</h3>
      </div>
    );
  }
export default EmployeeCard  
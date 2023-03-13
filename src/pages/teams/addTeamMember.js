import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./addTeamMember.css"
import { UserContext } from "../../userContext";
import { toast } from "react-toastify";
const AddTeamMember = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesSelected,setEmployeesSelected] = useState([]);
  const { token } = useContext(UserContext);
  useEffect(() => {
    token&&axios
      .get(`${process.env.REACT_APP_API_URL}/employees`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      .then((response) => {
        const unassignedEmployees = response.data.employees.filter(
          (employee) => employee.team_id === null
        );
        setEmployees(unassignedEmployees);
      })
      .catch((error) => toast.error("error fetching data from backend"));
  }, [token]);
  function handleAddMember(id){
    setEmployeesSelected(...employeesSelected,id)
  }
  function saveEmployees(){
    axios.post(``)
  }
  return (
    <div className="add--team_members-container">
      <h2>Unassigned Employees</h2>
      {employees.length === 0 ? (
        <p>No unassigned employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>
                  <button onClick={handleAddMember(employee.id)}>Select</button>
                </td>
              </tr>
            ))}
            <button onClick={saveEmployees}>Save</button>
          </tbody>
        </table>
      )}
      
    </div>
  );
};

export default AddTeamMember;

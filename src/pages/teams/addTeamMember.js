import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./addTeamMember.css"
import { UserContext } from "../../userContext";
const AddTeamMember = () => {
  const [employees, setEmployees] = useState([]);
  const { token } = useContext(UserContext);
  console.log(token)
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
        console.log(response);
        const unassignedEmployees = response.data.employees.filter(
          (employee) => employee.team_id === null
        );
        setEmployees(unassignedEmployees);
      })
      .catch((error) => console.log(error));
  }, [token]);

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
                  <button>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
};

export default AddTeamMember;

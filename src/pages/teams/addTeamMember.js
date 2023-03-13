import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addTeamMember.css"
const AddTeamMember = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("/employees")
      .then((response) => {
        const unassignedEmployees = response.data.filter(
          (employee) => employee.team_id === null
        );
        setEmployees(unassignedEmployees);
      })
      .catch((error) => console.log(error));
  }, []);

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
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
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

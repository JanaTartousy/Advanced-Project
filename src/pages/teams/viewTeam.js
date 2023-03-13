import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext";
import EmployeeCard from "./employeeCard";
import "./viewTeam.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddProjectButton from "./addProjectButton";
import AddTeamMember from "./addTeamMember";


function ViewTeam() {
  const { teamId } = useParams();
  const { token } = useContext(UserContext);
  const [team, setTeam] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const history = useNavigate();

  useEffect(() => {
   token&&axios
      .get(`${process.env.REACT_APP_API_URL}/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTeam(response.data.team);
        setEmployees(response.data.team.employees);
        setProjects(response.data.team.projects);
        setError(null);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setError("Team not found");
        } else {
          setError("An error occurred while fetching the team data");
        }
      });
  }, [teamId, token]);

  const handleBackButtonClick = () => {
    history("/teams");
  };

  const handleAddEmployeeClick = () => {
    //  employee functionality here
  };

  const handleAddProjectClick = () => {
    //  project functionality here
  };

  return (
    <div className="view-team-container">
      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="back-button" onClick={handleBackButtonClick}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        </div>
      )}
      {!error && team && (
        <>
          <div className="header-container">
            <button className="back-button" onClick={handleBackButtonClick}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
          </div>
          <h2>Team: {team.name}</h2>
          <h3>Members:</h3>
          <div className="employees-container">
            {employees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
            <div className="add-employee-card" onClick={handleAddEmployeeClick}>
              <div className="add-employee-icon">
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div className="add-employee-text">Add member</div>
            </div>
          </div>
          <h3>Projects:</h3>
          <table className="projects-table">
            <thead className="projects-table-header">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th className="add-project">
      <AddProjectButton onClick={handleAddProjectClick}>Add project</AddProjectButton>
    </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>

        </>
      )}
      <div>
        <AddTeamMember/>
      </div>
    </div>
  );
}

export default ViewTeam;

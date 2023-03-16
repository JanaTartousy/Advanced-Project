import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./viewTeam.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import EmployeeCard from "./../employeeCard/employeeCard";
import { UserContext } from "../../../userContext";
import EditTeamPopup from "../editTeam/editTeamPopup";


function ViewTeam() {
  const { teamId } = useParams();
  const { token } = useContext(UserContext);
  const [team, setTeam] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [openAddProjects, setOpenAddProjects] = useState(false);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
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
        console.log(error)
        if (error.response.status === 404) {
          setError("Team not found");
        } else {
          setError("An error occurred while fetching the team data");
        }
      });
  }, [teamId, token,openAddEmployee,openAddProjects]);

  const handleBackButtonClick = () => {
    history("/teams");
  };

  const handleAddEmployeeClick = () => {
    //  employee functionality here
    setOpenAddEmployee(true)
  };
  const handleCloseAddEmployee=()=>{

    setOpenAddEmployee(false)
  }
  const handleCloseAddProjects=()=>{

    setOpenAddProjects(false)
  }
  const handleAddProjectClick = () => {
    setOpenAddProjects(true)
    
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
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div className="add-employee-text">Edit Members</div>
            </div>
          </div>
          <h3>Projects:</h3>
          <table className="projects-table">
            <thead className="projects-table-header">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th className="add-project">
                <FontAwesomeIcon icon={faEdit}  onClick={handleAddProjectClick} style={{fontSize:"2rem"}}/>

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

        <EditTeamPopup type={"employee"} teamId={parseInt(teamId)} open={openAddEmployee} onClose={handleCloseAddEmployee}/>
        <EditTeamPopup type={"project"} teamId={parseInt(teamId)} open={openAddProjects} onClose={handleCloseAddProjects}/>
      
    </div>
  );
}

export default ViewTeam;

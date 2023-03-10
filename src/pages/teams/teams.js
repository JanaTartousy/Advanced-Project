import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
import PaginationContainer from "./pagination";
import TeamTable from "./teamTable";
import "./teams.css";
import "./pagination.css";
import AddTeamPopup from "./addTeamPopup.js";

function Teams(props) {
  const { token } = useContext(UserContext);
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [teamAdded, setTeamAdded] = useState(false); // new state variable

  useEffect(() => {
    token &&
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/teams?per_page=10&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setTeams(response.data.teams.data);
          setLastPage(response.data.teams.last_page);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [currentPage, token, teamAdded]); // include teamAdded in dependencies array

  function handlePageChange(event, value) {
    setCurrentPage(value);
  }

  const [addTeamOpen, setAddTeamOpen] = useState(false);

  const handleAddTeamOpen = () => {
    setAddTeamOpen(true);
  };

  const handleAddTeamClose = () => {
    setAddTeamOpen(false);
  };

  const handleAddTeam = (name) => {
    axios.post(`${process.env.REACT_APP_API_URL}/teams`,{name}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response =>{
      setTeamAdded(true); // set teamAdded state variable to true
    }).catch(e=>console.error(e));
  };

  return (
    <div>
      <div className="team-container">
        <div className="team-header">
          <h2>Team Table</h2>
          <button className="add-team-button" onClick={handleAddTeamOpen}>
            Add Team
          </button>
          <AddTeamPopup
            open={addTeamOpen}
            onClose={handleAddTeamClose}
            onAddTeam={handleAddTeam}
          />
        </div>
        <TeamTable teams={teams} />
        <PaginationContainer
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Teams;

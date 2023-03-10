import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { UserContext } from "../../userContext";
import PaginationContainer from "./pagination";
import TeamTable from "./teamTable";
import "./teams.css";
import "./pagination.css";
import AddTeamPopup from "./addTeamPopup.js";

function SearchBar(props) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={props.searchQuery}
        onChange={props.handleSearchChange}
      />
      <Search/>
    </div>
  );
}

function Teams(props) {
  const { token } = useContext(UserContext);
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // new state variable for search query
  const [teamAdded, setTeamAdded] = useState(false);

  useEffect(() => {
    token &&
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/teams?per_page=10&page=${currentPage}&search=${searchQuery}`, // include search query in API request
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
  }, [currentPage, token, teamAdded, searchQuery]);

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
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/teams`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTeamAdded(true);
      })
      .catch((e) => console.error(e));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="team-container">
        <div className="team-header">
          <h2>Team Table</h2>
          <SearchBar
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
          ></SearchBar>
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

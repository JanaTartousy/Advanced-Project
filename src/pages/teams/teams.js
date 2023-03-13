import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
import PaginationContainer from "./pagination";
import TeamTable from "./teamTable";
import "./teams.css";
import "./pagination.css";
import AddTeamPopup from "./addTeamPopup.js";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import SearchBar from "./search";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Teams(props) {
  const { token } = useContext(UserContext);
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // new state variable for search query
  const [teamAdded, setTeamAdded] = useState(false);

  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/teams/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTeamAdded(!teamAdded);
        toast.error("Team deleted successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  useEffect(() => {
    token &&
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/teams?per_page=12&page=${currentPage}&search=${searchQuery}`, // include search query in API request
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
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

  function handleAddTeam(name) {
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
        toast.success("Team added successfully!");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEdit = (id, name) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/teams/${id}`,
        { name, _method: "patch" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setTeamAdded(!teamAdded); // force re-fetch of teams data by toggling state
        toast.success("Team edited successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="team-parent">
      <div className="team-container">
        <div>
          <div className="team-header">
            <h2>Teams</h2>{" "}
            <div className="add-button-parent">
              <Button
                startIcon={<FaPlus />}
                style={{
                  fontSize: "1rem",
                  backgroundColor: "var(--main)",
                  color: "var(--accent)",
                }}
                size="large"
                variant="contained"
                sx={{
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "0.2s ease-out",
                  },
                }}
                onClick={handleAddTeamOpen}
              >
                Add
              </Button>
            </div>
            <SearchBar
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
            ></SearchBar>
            <AddTeamPopup
              open={addTeamOpen}
              onClose={handleAddTeamClose}
              onAddTeam={handleAddTeam}
            />
          </div>
          <TeamTable
            teams={teams}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <PaginationContainer
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Teams;

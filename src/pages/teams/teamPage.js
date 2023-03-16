import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../components/pageHeader/pageHeader";
import TableHeader from "../../components/table/tableHeader/tableHeader";
import PaginationContainer from "../../components/table/tablePagination/pagination";
import fetchData from "../../reUsableFunctions/dataGetter";
import { UserContext } from "../../userContext";
import AddTeamPopup from "./addTeamPopup/addTeamPopup";
import "./teamPage.css";
import TeamList from "./teamList";
import LoadingBars from "../../components/loadingBars/loadingBars";

function TeamPage() {
  const [addTeamOpen, setAddTeamOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teamAdded, setTeamAdded] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [teams, setTeams] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(UserContext);
  useEffect(() => {
    setLoading(true); // set loading to true before making the API call
    
    if (token) {
      fetchData(
        `${process.env.REACT_APP_API_URL}/teams`,
        { Authorization: `Bearer ${token}` },
        { per_page: 12, page: currentPage, search: searchQuery }
      )
        .then((data) => {
          // set teams and lastPage state
          setTeams(
            data.teams.data.map((team) => {
              return {
                id: team.id,
                name: team.name,
                members: team.employees.length,
                projects: team.projects.length,
              };
            })
          );
          setLastPage(data.teams.last_page);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => setLoading(false)); // set loading to false after the API call completes
    }
    // setTimeout(() => {
    
    // }, 5000);
  }, [currentPage, token, searchQuery, teamAdded]);
  //function to delete a team
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
        toast.success("Team added successfully!");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  const handleAddTeamOpen = () => {
    setAddTeamOpen(true);
  };

  const handleAddTeamClose = () => {
    setAddTeamOpen(false);
  };
  function handlePageChange(event, value) {
    setCurrentPage(value);
  }
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

        setTeamAdded(!teamAdded);

        toast.success("Team edited successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
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
  return (
    <div className="page--container">
      <PageHeader
        pageName={"Teams"}
        onAddClick={handleAddTeamOpen}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
      <div className="table--container">
      <table className="a--table">
        <TableHeader
          columns={["Team", "Number of Projects", "Number of Members"]}
        />
        {loading ? (
          <LoadingBars/>
        ) : (
          <TeamList rows={teams} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </table>
          </div>
      <AddTeamPopup
        open={addTeamOpen}
        onClose={handleAddTeamClose}
        onAddTeam={handleAddTeam}
      />
      <PaginationContainer
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default TeamPage;
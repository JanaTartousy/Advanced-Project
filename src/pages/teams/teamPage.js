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


function TeamPage() {
  const [addTeamOpen, setAddTeamOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teamAdded,setTeamAdded] = useState(false)
  const [lastPage, setLastPage] = useState(1);
  const [teams, setTeams] = useState(null);
  const { token } = useContext(UserContext);
  useEffect(() => {
    if (token) {
      fetchData(
        `${process.env.REACT_APP_API_URL}/teams`,
        { Authorization: `Bearer ${token}` },
        { per_page: 12, page: currentPage, search: searchQuery }
      )
        .then((data) => {
          console.log(data.teams.data);
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
        });
    }
  }, [currentPage, token, searchQuery,teamAdded]);

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
      <table className="a--table">
        <TableHeader
          columns={["Team", "Number of Projects", "Number of Members"]}
        />
         {teams&&<TeamList
          rows={teams}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />} 
      </table>

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

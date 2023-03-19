import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../components/pageHeader/pageHeader";
import TableHeader from "../../components/table/tableHeader/tableHeader";
import PaginationContainer from "../../components/table/tablePagination/pagination";
import fetchData from "../../reUsableFunctions/dataGetter";
import { UserContext } from "../../userContext";
import "./evaluationPage.css";
import LoadingBars from "../../components/loadingBars/loadingBars";
import EvaluationList from "./EvaluationList/evaluationList";
import AddEvaluationPopup from "./addEvaluationPopup/addEvaluationPopup";

function EvaluationPage() {
  const [addEvaluationOpen, setAddEvaluationOpen] = useState(false);
  const [employeeOption, setEmployeeOption] = useState([]);
  const [kpiOption, setKpiOption] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [evaluationAdded, setEvaluationAdded] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(UserContext);
  useEffect(() => {
    setLoading(true); // set loading to true before making the API call

    if (token) {
      fetchData(
        `${process.env.REACT_APP_API_URL}/evaluations`,
        { Authorization: `Bearer ${token}` },
        { per_page: 12, page: currentPage, search: searchQuery }
      )
        .then((data) => {
          console.log(data);
          let evaluationData = data.evaluations.data.map((evaluations) => {
            return {
              id: evaluations.id,
              employeeName: `${evaluations.employees.first_name} ${evaluations.employees.last_name}`,
              dateEvaluated: evaluations.date_evaluated,
              kpiId: evaluations.kpi_id,
              kpiName: evaluations.kpis.name,
              evaluation: `${evaluations.evaluation}/10`,
            };
          })
          // let employeeData = data.employees.map((employees) => {
          //   return { employeeName: `${employees.first_name} ${employees.last_name}` }
          // })
          let kpiData = data.kpis.map((kpis) => {
            return { kpiName: `${kpis.name}`}
          })
          // console.log(employeeData);
          // console.log(kpiData);
          setEmployeeOption(data.employees.map((employees) => {
            return { employeeName: `${employees.first_name} ${employees.last_name}` }
          }));
          setEvaluations(evaluationData);
          setKpiOption(kpiData);
          console.log(kpiOption)
          setLastPage(data.evaluations.last_page);
          console.log(employeeOption);
        }).then(console.log('Dataaaaaaaaa', evaluations),)
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => setLoading(false)); // set loading to false after the API call completes
    }

  }, [currentPage, token, searchQuery, evaluationAdded]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  function handleAddEvaluation(name) {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/evaluations`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Evaluation added successfully!");
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  const handleAddEvaluationOpen = () => {
    setAddEvaluationOpen(true);
  };

  const handleAddEvaluationClose = () => {
    setAddEvaluationOpen(false);
  };
  function handlePageChange(event, value) {
    setCurrentPage(value);
  }
  const handleEdit = (id, name) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/evaluations/${id}`,
        { name, _method: "patch" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {

        setEvaluationAdded(!evaluationAdded);

        toast.success("Evaluation edited successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  function handleDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/evaluations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setEvaluationAdded(!evaluationAdded);
        toast.error("Evaluation deleted successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  return (
    <div className="page--container">
      <PageHeader
        pageName={"Evaluations"}
        onAddClick={handleAddEvaluationOpen}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
      <table className="a--table">
        <TableHeader
          columns={["Employee Name", "Kpi", "Evaluation", "Date Evaluated"]}
        />{
          evaluations && <EvaluationList rows={evaluations} onDelete={handleDelete} onEdit={handleEdit} />
        }
      </table>
        
      
      {employeeOption && kpiOption && <AddEvaluationPopup
        employeeOption={employeeOption}
        kpiOption={kpiOption}
        open={addEvaluationOpen}
        onClose={handleAddEvaluationClose}
        onAddEvaluation={handleAddEvaluation}
      />}
      <PaginationContainer
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default EvaluationPage;

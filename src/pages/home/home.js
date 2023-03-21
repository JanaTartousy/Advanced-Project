import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
import "./home.css";
import PageHeader from "../../components/pageHeader/pageHeader";
import { useNavigate } from "react-router-dom";
import ChartComponent from "../../components/chartComponent/chatComponent";

function Home(props) {
  const yearOptions = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, index) => {
    const year = 2000 + index;
    return (
      <option key={year} value={year}>
        {year}
      </option>
    );
  });
  const years = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, index) => {
    const year = 2000 + index;
    return (
      year
    );
  });
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const [homeData, setHomeData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("yearly");
  const [selectedYear, setSelectedYear] = useState(Math.max(...years));
  const [selectedMonth, setSelectedMonth] = useState(null);
  
  const [chartData, setChartData] = useState([
    { evaluation: 5, evaluation_date: "2005-05-01" },
    { evaluation: 3, evaluation_date: "2005-05-02" },
    { evaluation: 5, evaluation_date: "2005-07-03" },
    { evaluation: 8, evaluation_date: "2005-06-04" },
    { evaluation: 1, evaluation_date: "2005-04-05" },
    { evaluation: 5, evaluation_date: "2005-05-06" },
    { evaluation: 4, evaluation_date: "2005-07-07" },
    { evaluation: 5, evaluation_date: "2005-07-08" },
    { evaluation: 3, evaluation_date: "2005-10-09" },
    { evaluation: 3, evaluation_date: "2005-01-10" },
    { evaluation: 5, evaluation_date: "2005-05-11" },
    { evaluation: 3, evaluation_date: "2005-05-12" },
    { evaluation: 5, evaluation_date: "2005-07-13" },
    { evaluation: 8, evaluation_date: "2005-06-14" },
    { evaluation: 6, evaluation_date: "2005-04-15" },
    { evaluation: 5, evaluation_date: "2005-05-16" },
    { evaluation: 4, evaluation_date: "2005-07-17" },
    { evaluation: 5, evaluation_date: "2005-07-18" },
    { evaluation: 3, evaluation_date: "2005-10-19" },
    { evaluation: 3, evaluation_date: "2005-01-20" },
    { evaluation: 5, evaluation_date: "2005-05-21" },
    { evaluation: 3, evaluation_date: "2005-05-22" },
    { evaluation: 5, evaluation_date: "2005-07-23" },
    { evaluation: 8, evaluation_date: "2005-06-24" },
    { evaluation: 2, evaluation_date: "2005-04-25" },
    { evaluation: 5, evaluation_date: "2005-05-26" },
    { evaluation: 4, evaluation_date: "2005-07-27" },
    { evaluation: 5, evaluation_date: "2005-07-28" },
    { evaluation: 3, evaluation_date: "2005-10-29" },
    { evaluation: 3, evaluation_date: "2005-01-16" },
    { evaluation: 5, evaluation_date: "2005-05-16" },
    { evaluation: 3, evaluation_date: "2005-05-16" },
    { evaluation: 5, evaluation_date: "2005-07-16" },
    { evaluation: 8, evaluation_date: "2005-06-16" },
    { evaluation: 2, evaluation_date: "2005-04-16" },
    { evaluation: 5, evaluation_date: "2005-05-16" },
    { evaluation: 4, evaluation_date: "2005-07-16" },
    { evaluation: 5, evaluation_date: "2005-07-16" },
    { evaluation: 3, evaluation_date: "2005-10-16" },
    { evaluation: 3, evaluation_date: "2005-01-16" },
    { evaluation: 5, evaluation_date: "2005-05-16" },
    { evaluation: 3, evaluation_date: "2005-05-16" },
    { evaluation: 5, evaluation_date: "2005-07-16" },
    { evaluation: 8, evaluation_date: "2005-06-16" },
    { evaluation: 2, evaluation_date: "2005-04-16" },
    { evaluation: 5, evaluation_date: "2005-05-16" },
    { evaluation: 4, evaluation_date: "2005-07-16" },
    { evaluation: 5, evaluation_date: "2005-07-16" },
    { evaluation: 3, evaluation_date: "2005-10-16" },
    { evaluation: 3, evaluation_date: "2005-01-16" },
    { evaluation: 5, evaluation_date: "2005-05-16" },
    { evaluation: 3, evaluation_date: "2005-05-16" },
    { evaluation: 5, evaluation_date: "2005-07-16" },
    { evaluation: 8, evaluation_date: "2005-06-16" },
    { evaluation: 2, evaluation_date: "2005-04-16" },
    { evaluation: 5, evaluation_date: "2005-05-16" },
    { evaluation: 4, evaluation_date: "2005-07-16" },
    { evaluation: 5, evaluation_date: "2005-07-16" },
    { evaluation: 3, evaluation_date: "2005-10-16" },
    { evaluation: 3, evaluation_date: "2005-01-16" },
  ].sort((a, b) => {
    const dateA = new Date(a.evaluation_date);
    const dateB = new Date(b.evaluation_date);
    return dateA - dateB;
  }));

  useEffect(() => {
    token &&
      axios
        .get(`${process.env.REACT_APP_API_URL}/home`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setHomeData(response.data);
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [token]);
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  
  return (
    <div className="home-page">
      <PageHeader pageName={"Home"} hideAdd={true} hideSearch={true} />
      <div className="home-page-content-peek">
        <div
          onClick={(event) => {
            navigate("/employees");
          }}
        >
          <PageHeader pageName={"Employees"} hideAdd={true} hideSearch={true} />
          <div className="potatoes">
            {homeData && <h2>{homeData.employeeCount}</h2>}
          </div>
        </div>
        <div
          onClick={(event) => {
            navigate("/projects");
          }}
        >
          <PageHeader pageName={"Projects"} hideAdd={true} hideSearch={true} />
          <div className="potatoes">
            {homeData && <h2>{homeData.projectCount}</h2>}
          </div>
        </div>
        <div
          onClick={(event) => {
            navigate("/teams");
          }}
        >
          <PageHeader pageName={"Teams"} hideAdd={true} hideSearch={true} />
          <div className="potatoes">
            {homeData && <h2>{homeData.teamCount}</h2>}
          </div>
        </div>
      </div>
      {chartData&&<div>
        <select
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
        >
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </select>
        
        <select value={selectedYear} onChange={handleYearChange}>
            <option value="">Select Year</option>
            {yearOptions}
          </select>
        
        {selectedOption === "monthly" && (
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            <option value="Jan">January</option>
            <option value="Feb">February</option>
            <option value="Mar">March</option>
            <option value="Apr">April</option>
            <option value="May">May</option>
            <option value="Jun">June</option>
            <option value="Jul">July</option>
            <option value="Aug">August</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
            <option value="Dec">December</option>
          </select>
        )}

        <ChartComponent
          data={chartData}
          chartType={selectedOption}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>}
    </div>
  );
}

export default Home;

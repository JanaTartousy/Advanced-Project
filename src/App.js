import "./App.css";
import { Routes, Route } from "react-router-dom";
import Employees from "./pages/employees/employees";
import Projects from "./pages/projects/projects";
import Kpi from "./pages/reports/reports";
import Login from "./pages/login/login";
import { useEffect, useState } from "react";
import { UserContext } from "./userContext";
import Cookies from "universal-cookie";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import { ToastContainer } from "react-toastify";
import ViewTeam from "./pages/teams/viewTeam/viewTeam";
import EmployeeProfile from "./components/employeeProfile/employeeProfile";
import TeamPage from "./pages/teams/teamPage";
import ViewProject from "./pages/projects/viewProject/viewProject";
import EvaluationPage from "./pages/evaluations/evaluationPage";
import Admins from "./pages/admins/admins";
const cookie = new Cookies();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const authToken = cookie.get("auth-token");
    if (authToken) {
      setToken(authToken);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ token, isLoggedIn, setToken, setIsLoggedIn }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ViewProject/>} />
            <Route path="/teams" element={<TeamPage />} />
            <Route path="/evaluations" element={<EvaluationPage />} />
            <Route path="/teams/:teamId" element={<ViewTeam />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/profile/:id" element={<EmployeeProfile />} />
            <Route path="/kpi" element={<Kpi />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>

      <ToastContainer />
    </div>
  );
}

export default App;

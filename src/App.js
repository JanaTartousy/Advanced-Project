import "./App.css";
import { Routes, Route } from "react-router-dom";
import Employees from "./pages/employees/employees";
import Projects from "./pages/projects/projects";
import Reports from "./pages/reports/reports";
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
            <Route path="/teams" element={<TeamPage />} />
            <Route path="/teams/:teamId" element={<ViewTeam />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile/:id" element={<EmployeeProfile />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>

      <ToastContainer />
    </div>
  );
}

export default App;

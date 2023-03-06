import "./App.css";
import { Routes, Route } from "react-router-dom";
import Employees from "./pages/employees/employees";
import Projects from "./pages/projects/projects";
import Teams from "./pages/teams/teams";
import Reports from "./pages/reports/reports";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import { useState } from "react";
import { UserContext } from "./userContext";
import { Cookie } from "universal-cookie";
const cookie = new Cookie()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  setToken(cookie.get('auth-token'))
  return (
    <div className="App">
      <Routes>
        <UserContext.Provider value={{ token, isLoggedIn ,setToken,setIsLoggedIn}}>
          <Route path="/" element={<Home />}>
            <Route path="/employees" element={<Employees />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </UserContext.Provider>
      </Routes>
    </div>
  );
}

export default App;

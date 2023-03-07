import "./App.css";
import { Routes, Route } from "react-router-dom";
import Employees from "./pages/employees/employees";
import Projects from "./pages/projects/projects";
import Teams from "./pages/teams/teams";
import Reports from "./pages/reports/reports";
import Login from "./pages/login/login";
import Home from "./pages/home/home";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/employees" element={<Employees />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </div>
  );
}

export default App;

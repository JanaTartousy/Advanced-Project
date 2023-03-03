import { Routes, Route } from "react-router-dom";
import Employees from "./pages/employees";
import Projects from "./pages/projects";
import Teams from "./pages/teams";
import Reports from "./pages/reports";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/employees" element={<Employees />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;

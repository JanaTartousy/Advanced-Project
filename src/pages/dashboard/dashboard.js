import { Outlet, Navigate } from "react-router-dom";
import "./dashboard.css";
import Sidebar from "./../../components/Sidebar/sidebar";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="dashboard--main_content">
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;

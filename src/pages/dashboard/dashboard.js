import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import "./dashboard.css";

function Dashboard() {

  return (
    <>
    <Sidebar/>
      <h1>home</h1>
      <Outlet />
    </>
  );
}

export default Dashboard;

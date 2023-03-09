import { Outlet, Navigate } from "react-router-dom";
import "./dashboard.css";
import Sidebar from "./../../components/Sidebar/sidebar"

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

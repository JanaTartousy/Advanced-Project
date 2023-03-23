import { Outlet} from "react-router-dom";
import Sidebar from "./../../components/Sidebar/sidebar";
import {  useState } from "react";
import "./dashboard.css";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (

    <>
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      <div className={`dashboard--main_content ${isSidebarOpen ? 'sidebar-open-content' : 'sidebar-closed-content'}`}>
        <Outlet />
      </div>
    </>
  )
}

export default Dashboard;

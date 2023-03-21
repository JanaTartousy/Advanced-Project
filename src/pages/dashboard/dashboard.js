import { Outlet, useNavigate} from "react-router-dom";
import Sidebar from "./../../components/Sidebar/sidebar";
import { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import { UserContext } from "../../userContext";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {isLoggedIn}=useContext(UserContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isLoggedIn){
      navigate("/login")

    }
  },[isLoggedIn, navigate])
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

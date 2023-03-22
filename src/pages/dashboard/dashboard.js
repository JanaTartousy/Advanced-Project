import { Outlet, useNavigate} from "react-router-dom";
import Sidebar from "./../../components/Sidebar/sidebar";
import { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import { UserContext } from "../../userContext";
import { toast } from "react-toastify";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {isLoggedIn}=useContext(UserContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!isLoggedIn){
      navigate("/login")
      toast.error("Not Authorized Please Login")

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

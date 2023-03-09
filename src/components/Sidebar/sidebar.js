import "./sidebar.css";
import { useState } from "react";
import {NavLink} from "react-router-dom";
import {BiHomeAlt,BiLogOut,BiChevronRight, BiBarChartSquare, BiGroup, BiBriefcase, BiFile} from "react-icons/bi";
import {MdOutlinePersonPin} from "react-icons/md";
import erp from "./erplogo.svg";

const Sidebar = () => {
 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const handleToggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    
    return (
        <>
        <div className={`sidebar ${isSidebarOpen ? "close" : ""}`}>
        <div className="head">
            <div className="image-text">
                <span className="image">
                    <img src={erp} alt="logo" />
                </span>

                <div className="text logo-text">
                    <span className="name">Welcome</span>
                    <span className="profession">CEO</span>
                </div>
            </div>  
            <BiChevronRight className="toggle" onClick={handleToggleSidebar} />
        </div>

        <div className="menu-bar">
            <div className="menu">

                <ul className="menu-links">
                    <li className="nav-link">
                       <NavLink to="/">
                            <BiHomeAlt className="icon"/>
                            <span className="text nav-text">Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="nav-link">
                        <NavLink to="/employees">
                            <MdOutlinePersonPin className="icon"/>
                            <span className="text nav-text">Employees</span>
                        </NavLink>
                    </li>

                    <li className="nav-link">
                        <NavLink to="/teams">
                            <BiGroup className="icon"/>
                            <span className="text nav-text">Teams</span>
                        </NavLink>
                    </li>

                    <li className="nav-link">
                        <NavLink to="/projects">
                            <BiBriefcase className="icon"/>
                            <span className="text nav-text">Projects</span>
                        </NavLink>
                    </li>

                    <li className="nav-link">
                        <NavLink to="/evaluations">
                            <BiBarChartSquare className="icon"/>
                            <span className="text nav-text">Evaluations</span>
                        </NavLink>
                    </li>

                    <li className="nav-link">
                        <NavLink to="/reports">
                            <BiFile className="icon" />
                            <span className="text nav-text">Reports</span>
                        </NavLink>
                    </li>

                </ul>
            </div>

            <div className="bottom-content">
                <li className="">
                    <NavLink to="/logout">
                        <BiLogOut className="icon"/>
                        <span className="text nav-text">Logout</span>
                    </NavLink>
                </li>
            </div>
        </div>

    </div>
        </>
     );
}

export default Sidebar;
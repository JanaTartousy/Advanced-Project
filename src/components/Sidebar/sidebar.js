import "./sidebar.css";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BiHomeAlt,
  BiLogOut,
  BiChevronRight,
  BiBarChartSquare,
  BiGroup,
  BiBriefcase,
  BiFile,
} from "react-icons/bi";
import { MdOutlinePersonPin } from "react-icons/md";
import erp from "./erplogo.svg";
import Cookies from "js-cookie";
import { UserContext } from "../../userContext";
const Sidebar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setIsLoggedIn, setToken } = useContext(UserContext);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    props.setIsSidebarOpen(isSidebarOpen)
  };
  const logout = () => {
    Cookies.remove("auth-token");
    setIsLoggedIn(false);
    setToken(null);
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
                  <BiHomeAlt className="icon" />
                  <span className="text nav-text">Home</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/employees">
                  <MdOutlinePersonPin className="icon" />
                  <span className="text nav-text">Employees</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/teams">
                  <BiGroup className="icon" />
                  <span className="text nav-text">Teams</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/projects">
                  <BiBriefcase className="icon" />
                  <span className="text nav-text">Projects</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/evaluations">
                  <BiBarChartSquare className="icon" />
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
              <NavLink to="/login" onClick={logout}>
                <BiLogOut className="icon" />
                <span className="text nav-text">Logout</span>
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

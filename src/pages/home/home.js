import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import "./home.css";

function Home() {

  return (
    <>
    <Sidebar/>
      <h1>home</h1>
      <Outlet />
    </>
  );
}

export default Home;

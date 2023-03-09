import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/sidebar";
import "./home.css";

function Home() {

  return (
    <>
    <Sidebar/>
      <div className="outlet">
        <h1>amenn</h1>
        <Outlet />
      </div>
    </>
  );
}

export default Home;

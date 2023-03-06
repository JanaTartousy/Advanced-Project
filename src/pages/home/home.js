import { Outlet, Navigate } from "react-router-dom";
import "./home.css";

function Home() {

  return (
    <>
      <h1>home</h1>
      <Outlet />
    </>
  );
}

export default Home;

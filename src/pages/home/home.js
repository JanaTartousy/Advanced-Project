import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
function Home() {
  return (
    <>
      <h1>home</h1>
      <Outlet/>
    </>
  );
}

export default Home;

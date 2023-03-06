import { Outlet } from "react-router-dom";
function Home() {
  return (
    <>
      <h1>home</h1>
      <Outlet/>
    </>
  );
}

export default Home;

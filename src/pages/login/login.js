import LoginForm from "../../components/loginForm/loginForm";
import "./login.css"
import logo from "./../../images/Logo.svg"
import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../userContext";


function Login() {
  const navigate = useNavigate();
  const {  isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) {
    navigate("/");
  }
  return (
    <main className="main-login-page">
      
      <div className="login-container">
        <div className="empty-login">
          <img src={logo} alt="logo" className="login-logo-image" />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;

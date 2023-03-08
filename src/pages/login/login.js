import LoginForm from "../../components/loginForm/loginForm";
import "./login.css"
import logo from "./../../images/Logo.svg"
function Login() {
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

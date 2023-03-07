import LoginForm from "../../components/loginForm/loginForm";
import "./login.css"

function Login() {
  return (
    <main className="main-login-page">

      <div className="login-container">
        <div className="empty-login"></div>
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;

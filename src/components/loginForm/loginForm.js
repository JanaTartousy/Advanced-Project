import LoginButton from "./loginButton";
import "./loginForm.css";
function handleLogin(event) {
  event.preventDefault();
}
function LoginForm(props) {
  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        <label htmlFor="email" className="login-input-labels">
          Email:
          <input type="email" name="email" id="email" placeholder="email"/>
        </label>

        <label htmlFor="password" className="login-input-labels">
          Password:
          <input type="password" name="password" id="password" placeholder="password"/>
        </label>

        <LoginButton/>
      </form>
    </>
  );
}

export default LoginForm;

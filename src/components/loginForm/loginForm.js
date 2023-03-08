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
  <label  htmlFor="email" className="login-input-labels">
    <input type="text" name="email" id="email" required />
    <span className="label-name">
      Email
    </span>
  </label>

  <label htmlFor="password" className="login-input-labels">
    <input type="password" name="password" id="password" required />
    <span className="label-name">
      Password
    </span>
  </label>

  <LoginButton />
</form>

    </>
  );
}

export default LoginForm;

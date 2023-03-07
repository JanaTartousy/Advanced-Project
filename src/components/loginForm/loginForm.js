import "./loginForm.css";
function handleLogin(event) {
  event.preventDefault();
}
function LoginForm(props) {
  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        <label htmlFor="email" className="login-email">
          Email
          <input type="email" name="email" id="email" placeholder="email"/>
        </label>

        <label htmlFor="password" className="login-password">
          Password
          <input type="password" name="password" id="password" placeholder="password"/>
        </label>

        <button type="submit" name="login" id="login">
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;

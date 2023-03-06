import "./login.css";
function handleLogin(event){
    event.preventDefault();
}
function Login(props) {
  return <>
  
  <form onSubmit={handleLogin}>
    <h1 >

    </h1>
    <label for="email">Email</label>
    <input type="email" name="email" id="email"/>
    <label for="password">Password</label>
    <input type="password" name="password" id="password"/>
    <button type="submit" name="login" id="login">Login</button>
  </form>
  </>;
}

export default Login;

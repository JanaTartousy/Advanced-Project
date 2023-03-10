import LoginButton from "./loginButton";
import axios from "axios";
import { useContext, useState } from "react";
import "./loginForm.css";
import { UserContext } from "../../userContext";
import Cookies from "js-cookie";


function LoginForm(props) {
  const { setToken, setIsLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to check password length
  function isValidPassword(password) {
    return password.length >= 6;
  }

  const handleLogin = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
      .then((response) => {
        const authToken = response.data.access_token;
        setToken(authToken);
        setIsLoggedIn(true);
        setErrorMessage("");
        Cookies.set("auth-token", authToken, { expires: 1 });

      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage("An error occurred, please try again");
        }
      });
  };

  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label htmlFor="email" className="login-input-labels">
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder=" "
            required
          />
          <span className="label-name">Email</span>
        </label>

        <label htmlFor="password" className="login-input-labels">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder=" "
            required
          />
          <span className="label-name">Password</span>
        </label>

        <LoginButton />
      </form>
    </>
  );
}

export default LoginForm;

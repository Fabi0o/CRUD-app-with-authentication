import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    })
      .then(() => {
        history.push("/dashboard");
      })
      .catch(() => {
        alert("Wrong password or user does nor exist!");
      });
  };
  return (
    <div>
      <form onSubmit={loginUser}>
        <label htmlFor="E-mail">E-mail:</label>
        <input
          id="E-mail"
          type="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>Login</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;

import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    await Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    })
      .then(() => {
        props.setIsLoggedIn(true);
        updateLoginTime(props.currentTime(), email, `lastLoginTime`);
        history.push("/dashboard");
        if (wrongPass) setWrongPass(false);
      })
      .catch((err) => {
        console.log(err);
        setWrongPass(true);
      });
  };
  const updateLoginTime = (value, email, column) => {
    Axios.post("http://localhost:3001/update", {
      value: value,
      email: email,
      column: column,
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
        <div>{wrongPass ? "Wrong Password or user does not exist!" : ""}</div>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;

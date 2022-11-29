import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const getUsers = () => {
    Axios.get("https://crud-app-with-auth.herokuapp.com/users").then(
      (response) => {
        props.setUsersList(response.data);
      }
    );
  };
  const loginUser = async (e) => {
    e.preventDefault();
    await Axios.post("https://crud-app-with-auth.herokuapp.com/login", {
      email: email,
      password: password,
    })

      .then(() => {
        props.setIsLoggedIn(true);
        updateLoginTime(props.currentTime(), email, `lastLoginTime`);
        props.setCurrentUser(email);
        if (wrongPass) setWrongPass(false);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setWrongPass(true);
      });
  };
  const updateLoginTime = (value, email, column) => {
    Axios.post("https://crud-app-with-auth.herokuapp.com/update", {
      value: value,
      email: email,
      column: column,
    }).then(() => {
      getUsers();
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
        <button className="btn btn-primary m-2">Login</button>
        <div>
          {wrongPass
            ? "Wrong Password, user does not exist or user blocked!"
            : ""}
        </div>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;

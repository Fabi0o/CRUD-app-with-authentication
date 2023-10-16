import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const registerUser = (e) => {
    e.preventDefault();
    Axios.post("https://crud-app-with-authentication.vercel.app/createUser", {
      email: email,
      password: password,
      name: name,
      status: "active",
      registerTime: props.currentTime(),
      lastLoginTime: props.currentTime(),
    })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={registerUser}>
      <label htmlFor="E-mail">E-mail:</label>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        id="E-mail"
        type="email"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        id="password"
        type="password"
        required
      />
      <label htmlFor="name">Name:</label>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        id="name"
        required
      />
      <button className="btn btn-primary m-2">Register</button>
    </form>
  );
};

export default Register;

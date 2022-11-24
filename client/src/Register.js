import { useState } from "react";
import Axios from "axios";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/createUser", {
      name: email,
      password: password,
    }).then(() => {
      console.log("succes");
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
      <button>Register</button>
    </form>
  );
};

export default Register;

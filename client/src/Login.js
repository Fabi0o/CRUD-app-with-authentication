import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div>
      <form>
        <label htmlFor="E-mail">E-mail:</label>
        <input id="E-mail" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" required />
        <button>Login</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;

const Register = () => {
  return (
    <form>
      <label htmlFor="E-mail">E-mail:</label>
      <input id="E-mail" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" type="password" required />
      <label htmlFor="confPassword">Confirm password:</label>
      <input id="confPassword" type="password" required />
      <button>Register</button>
    </form>
  );
};

export default Register;

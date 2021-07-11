import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <div className="create">
      <h2>Login</h2>
      <form action={props.LocationPost} method="post">
        <label>Username :</label>
        <input type="text" name="username" required />
        <label>Password :</label>
        <input type="password" name="password" required />
        <button>Login</button>
      </form>
      <div className="form-below">
        <Link to="/feedback">feedback</Link>
        <Link to="/forgot_pass">forgot password?</Link>
      </div>
    </div>
  );
};

export default Login;

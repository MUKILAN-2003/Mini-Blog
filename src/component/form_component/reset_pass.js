import { Link } from "react-router-dom";

const ResetPass = (props) => {
  return (
    <div className="create">
      <h2>Reset Password</h2>
      <form action={props.LocationPost} method="post">
        <label>Username :</label>
        <input type="text" name="username" required />
        <label>Mail Id :</label>
        <input type="mail" name="mail" required />
        <button>Sumbit</button>
      </form>
      <div className="form-below">
        <Link to="/feedback">feedback</Link>
        <Link to="/forgot_pass">forgot password?</Link>
      </div>
    </div>
  );
};

export default ResetPass;

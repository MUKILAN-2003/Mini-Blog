import { Link } from "react-router-dom";

const ResetPass = (props) => {
  return (
    <div className="form-center">
      <h2>Reset Password</h2>
      <form
        action={props.LocationPost}
        method="post"
        encType="multipart/form-data"
      >
        <label>Username :</label>
        <input type="text" name="username" autoComplete="off" required />
        <label>Mail Id :</label>
        <input type="mail" name="mail" autoComplete="off" required />
        <input type="file" name="image" />
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

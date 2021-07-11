import { Link } from "react-router-dom";

const FeedBack = (props) => {
  return (
    <div className="create">
      <h2>Feedback Form</h2>
      <form action={props.LocationPost} method="post">
        <label>Name:</label>
        <input type="text" name="name" required />
        <label>Mail-Id :</label>
        <input type="mail" name="mail" required />
        <label>Feedback :</label>
        <textarea type="text" name="feedback" required></textarea>
        <button>Sumbit</button>
      </form>
      <div className="form-below">
        <Link to="/feedback">feedback</Link>
        <Link to="/forgot_pass">forgot password?</Link>
      </div>
    </div>
  );
};

export default FeedBack;

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const FeedBack = (props) => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [mail_id, setMail] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [errmsg, setErrmsg] = useState(null);

  const history = useHistory();

  const Sumbit = (e) => {
    setIsPending(true);
    e.preventDefault();
    const data = { name, mail_id, feedback };
    fetch(props.LocationPost, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setErrmsg(null);
        return res.json().then((err) => {
          if (err.message === "CleanRun") {
            setIsPending(false);
            history.push("/");
          } else {
            setIsPending(false);
            setErrmsg(err.message);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="form-center">
      <h2>Feedback Form</h2>
      <form action={props.LocationPost} method="post">
        <label>Name:</label>
        <input
          autoComplete="off"
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Mail-Id :</label>
        <input
          autoComplete="off"
          type="mail"
          name="mail"
          required
          value={mail_id}
          onChange={(e) => setMail(e.target.value)}
        />
        <label>Feedback :</label>
        <textarea
          autoComplete="off"
          type="text"
          name="feedback"
          required
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        {errmsg && <div>{errmsg}</div>}
        {!isPending && <button onClick={Sumbit}>Sumbit</button>}
        {isPending && (
          <button disabled>
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        )}
      </form>
      <div className="form-below">
        <Link to="/feedback">feedback</Link>
        <Link to="/forgot_pass">forgot password?</Link>
      </div>
    </div>
  );
};

export default FeedBack;

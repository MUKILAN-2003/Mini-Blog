import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const ResetPass = (props) => {
  const [username, setName] = useState("");
  const [mail_id, setMail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errmsg, setErrmsg] = useState(null);
  const Sumbit = (e) => {
    setIsPending(true);
    e.preventDefault();
    const data = { username, mail_id };
    fetch(props.LocationPost, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setErrmsg(null);
        return res.json().then((err) => {
          if (
            err.message === "Check your Registered Mail ID to reset password"
          ) {
            setIsPending(false);
            setErrmsg(err.message);
            Cookies.set("r_jwt", err.token);
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
      <h2>Reset Password</h2>
      <form action={props.LocationPost} method="post">
        <label>Username :</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Mail Id :</label>
        <input
          type="email"
          name="mail_id"
          autoComplete="off"
          value={mail_id}
          onChange={(e) => setMail(e.target.value)}
          required
        />

        {errmsg && <div className="login-err-msg">{errmsg}</div>}
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

export default ResetPass;

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [isPending, setIsPending] = useState(false);
  const [errmsg, setErrmsg] = useState(null);
  const Sumbit = (e) => {
    setIsPending(true);
    e.preventDefault();
    const data = { username, password };
    fetch(props.LocationPost, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setErrmsg(null);
        return res.json().then((err) => {
          if (err.message === "CleanRun") {
            Cookies.set("jwt", err.jwt);
            setIsPending(false);
            history.push("/dashboard");
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
      <h2>Login</h2>
      <form action={props.LocationPost} method="post">
        <label>Username :</label>
        <input
          autoComplete="off"
          type="text"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password :</label>
        <input
          autoComplete="off"
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errmsg && <div className="login-err-msg">{errmsg}</div>}
        {!isPending && <button onClick={Sumbit}>Login</button>}
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

export default Login;

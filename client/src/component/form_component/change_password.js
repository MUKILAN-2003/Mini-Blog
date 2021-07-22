import { useHistory } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const history = useHistory();
  var cookie_get = Cookies.get("r_jwt");
  const { tmptoken } = useParams();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [errmsg, setErrmsg] = useState(null);
  if (tmptoken === cookie_get) {
    const Sumbit = (e) => {
      setIsPending(true);
      e.preventDefault();
      const data = { username, password };
      fetch("/verifyed_success/change_password/" + tmptoken, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          setErrmsg(null);
          return res.json().then((err) => {
            if (err.message === "CleanRun") {
              Cookies.remove("r_jwt");
              setIsPending(false);
              history.push("/login");
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
        <form action="verifyed_success/change_password" method="post">
          <label>Username :</label>
          <input
            autoComplete="off"
            type="text"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>New Password :</label>
          <input
            autoComplete="off"
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      </div>
    );
  } else {
    return <div style={{ textAlign: "center" }}>Link / Session Expired</div>;
  }
};

export default ChangePassword;

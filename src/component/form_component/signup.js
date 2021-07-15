import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [errmsg, setErrmsg] = useState(null);

  const history = useHistory();

  const Sumbit = (e) => {
    setIsPending(true);
    e.preventDefault();
    const data = { username, name, mail, password };
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
      <h2>Signup</h2>
      <form>
        <label>Username :</label>
        <input
          autoComplete="off"
          type="text"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Name:</label>
        <input
          autoComplete="off"
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email-Id :</label>
        <input
          autoComplete="off"
          type="mail"
          name="mail"
          required
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <label>Password:</label>
        <input
          autoComplete="off"
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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

export default SignUp;

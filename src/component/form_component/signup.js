import { Link } from "react-router-dom";
import { useState } from "react";
import usePost from "../server_fetch/usePost";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const Sumbit = (e) => {
    e.preventDefault();
    const data = { username, name, mail, password };
    const { errMsg } = usePost(props.LocationPost, data);
  };

  return (
    <div className="create">
      <h2>Signup</h2>
      <form>
        <label>Username :</label>
        <input
          type="text"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email-Id :</label>
        <input
          type="mail"
          name="mail"
          required
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errMsg && <p>{errMsg}</p>}
        <button onClick={Sumbit}>Sumbit</button>
      </form>
      <div className="form-below">
        <Link to="/feedback">feedback</Link>
        <Link to="/forgot_pass">forgot password?</Link>
      </div>
    </div>
  );
};

export default SignUp;

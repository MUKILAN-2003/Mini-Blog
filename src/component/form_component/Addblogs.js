import { useHistory } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
const jwt = require("jsonwebtoken");

let cookie_parse = null;

const AddBlog = (props) => {
  const history = useHistory();
  var cookie_get = Cookies.get("jwt");
  if (!cookie_get) {
    history.push("/home");
  } else {
    cookie_parse = jwt.verify(
      cookie_get,
      "%$iwudibdiiwd@#$wdjdwnomdw(*&whdwhd#$>idnw(*&^"
    );
  }
  const [b_title, setTitle] = useState("");
  const [b_body, setBody] = useState("");
  const [b_author, setAuthor] = useState(cookie_parse.name);
  const [user_author, setUserAuthor] = useState(cookie_parse.username);

  const [isPending, setIsPending] = useState(false);
  const [errmsg, setErrmsg] = useState(null);

  const Sumbit = (e) => {
    setIsPending(true);
    e.preventDefault();
    const data = { b_title, b_body, b_author, user_author };
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
            history.push("/my-blog");
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
    <div className="addform-center">
      <h2 className="add-heading">Add New Blog</h2>
      <form className="add-form">
        <label className="add-label">Blog Title :</label>
        <input
          className="add-input"
          autoComplete="off"
          type="text"
          name="b_title"
          required
          value={b_title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="add-label">Blog Body :</label>
        <textarea
          className="add-input"
          autoComplete="off"
          type="text"
          name="b_body"
          required
          value={b_body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label className="add-label">Author Name:</label>
        <input
          className="add-input"
          autoComplete="off"
          type="text"
          name="name"
          required
          value={b_author}
          onChange={(e) => setAuthor(cookie_parse.name)}
        />
        <input
          className="add-input"
          autoComplete="off"
          type="hidden"
          name="user_author"
          required
          value={b_author}
          onChange={(e) => setUserAuthor(cookie_parse.username)}
        />
        {errmsg && <div class="login-err-msg">{errmsg}</div>}
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
};

export default AddBlog;

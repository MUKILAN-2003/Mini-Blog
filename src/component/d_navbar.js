import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
const jwt = require("jsonwebtoken");

let cookie_parse = null;

const DNavbar = () => {
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

  return (
    <nav className="navbar">
      <div className="heading">
        <h1>
          <Link to="/dashboard">Mini Blog</Link>
        </h1>
      </div>
      <div className="nav-links">
        <div className="welcome-note">
          <img
            src="/favicon.ico"
            width={30}
            height={30}
            alt={"Brand_Logo"}
          ></img>
          {cookie_parse && (
            <strong>
              <p style={{ textAlign: "right", color: "#ff6600", margin: 10 }}>
                Welcome, {cookie_parse.name}
              </p>
            </strong>
          )}
        </div>
        <Link to="/my-blog">My Blog</Link>
        <Link to="/add-blog">Add Blog</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </nav>
  );
};

export default DNavbar;

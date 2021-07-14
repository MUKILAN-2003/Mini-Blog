import { Link } from "react-router-dom";

const HNavbar = () => {
  return (
    <nav className="navbar">
      <div className="heading">
        <h1>
          <Link to="/home">Mini Blog</Link>
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
          <strong>
            <p style={{ textAlign: "right", color: "#ff6600", margin: 10 }}>
              Mini Blog
            </p>
          </strong>
        </div>
        <Link to="/login">Login</Link>
        <Link to="/register">Signup</Link>
      </div>
    </nav>
  );
};

export default HNavbar;

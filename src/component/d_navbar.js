import { Link } from "react-router-dom";

const DNavbar = () => {
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
          <strong>
            <p style={{ textAlign: "right", color: "#ff6600", margin: 10 }}>
              Welcome, Mukilan
            </p>
          </strong>
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

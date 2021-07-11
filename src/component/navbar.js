import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="heading">
        <h1>
          <Link to="/">Mini Blog</Link>
        </h1>
      </div>
      <div className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;

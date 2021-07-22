import useGet from "../server_fetch/useGet";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
const jwt = require("jsonwebtoken");

let cookie_parse = null;
var delete_blog_link = "delete_blog/";
const DisplayMyBlog = (props) => {
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
  const { data, error, isPending } = useGet(
    "http://localhost:8000/get_my_blog/" + cookie_parse.username
  );

  if (data) {
    if (data.allData.length === 0) {
      return <p style={{ textAlign: "center" }}>Nothing To Show</p>;
    } else {
      var blogs = data.allData;
      return (
        <div className="main-page-blogs">
          <div className="blog-list">
            {blogs.map((blog) => (
              <div className="blog-preview" key={blog._id}>
                <Link to={props.LocationDetail + `${blog._id}`}>
                  <h2>{blog.b_title}</h2>
                  <p>Written by : {blog.b_author}</p>
                </Link>
                <Link
                  style={{ color: "red" }}
                  to={delete_blog_link + `${blog._id}`}
                >
                  Delete Blog
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
  if (isPending) {
    return (
      <div className="main-page-blogs">
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
      </div>
    );
  }
  if (error) {
    return <div className="main-page-blogs">{error}</div>;
  } else {
    return <div className="main-page-blogs">Sorry Try Again Later</div>;
  }
};

export default DisplayMyBlog;

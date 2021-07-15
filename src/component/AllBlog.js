import useGet from "./server_fetch/useGet";
import { Link } from "react-router-dom";

const DisplayBlog = (props) => {
  const { data, error, isPending } = useGet(
    "http://localhost:8000/get_all_blogs"
  );
  if (data) {
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
            </div>
          ))}
        </div>
      </div>
    );
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

export default DisplayBlog;

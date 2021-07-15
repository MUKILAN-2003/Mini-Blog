import { Redirect } from "react-router";
import { useParams } from "react-router-dom";

const DeleteBlog = () => {
  const { id } = useParams();
  fetch("http://localhost:8000/blog-delete/" + id);
  return <Redirect to="/my-blog" />;
};

export default DeleteBlog;

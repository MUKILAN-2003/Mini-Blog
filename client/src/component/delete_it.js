import { Redirect } from "react-router";
import { useParams } from "react-router-dom";

const DeleteBlog = () => {
  const { id } = useParams();
  fetch("/blog-delete/" + id);
  return <Redirect to="/my-blog" />;
};

export default DeleteBlog;

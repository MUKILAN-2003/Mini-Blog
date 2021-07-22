import { useParams } from "react-router-dom";
import useFetch from "../server_fetch/useGet";

const BlogDeatil = () => {
  const { id } = useParams();
  const { data, error, isPending } = useFetch("/detail-blogs/" + id);
  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && (
        <article>
          <h2>{data.allData[0].b_title}</h2>
          <p>Written By : {data.allData[0].b_author}</p>
          <p>Created At: {data.allData[0].createdAt.split("T")[0]}</p>
          <div>{data.allData[0].b_body}</div>
        </article>
      )}
    </div>
  );
};

export default BlogDeatil;

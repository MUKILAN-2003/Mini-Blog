import { useHistory } from "react-router-dom";
import { useState } from "react";

const usePost = (url, data) => {
  const [errMsg, setErrmsg] = useState(null);
  const history = useHistory();
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      setErrmsg(null);
      return res.json().then((err) => {
        if (err.message == "CleanRun") {
          history.push("/login");
        } else {
          setErrmsg(err.message);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
  return { errMsg };
};

export default usePost;

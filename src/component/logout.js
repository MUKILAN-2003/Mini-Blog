import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  Cookies.remove("jwt");
  history.push("/home");
};

export default Logout;

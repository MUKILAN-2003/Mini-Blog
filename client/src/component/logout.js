import Cookies from "js-cookie";
import { Redirect } from "react-router";

const Logout = () => {
  Cookies.remove("jwt");
  return <Redirect to="/home" />;
};

export default Logout;

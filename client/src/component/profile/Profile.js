import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
const jwt = require("jsonwebtoken");

let cookie_parse = null;

const Profile = () => {
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
  return (
    <div className="user-profile">
      <img
        src="https://cdn.shoplightspeed.com/shops/635857/files/27372479/1652x1652x2/madshus-madshus-endurance-skate-boot.jpg"
        alt="User Profile"
      ></img>
      <div className="user-deatil">
        <h2>USERNAME &nbsp;&nbsp;&nbsp;: {cookie_parse.username}</h2>
        <h2>
          NAME
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          :&nbsp;
          {cookie_parse.name}
        </h2>
        <h2>
          Mail-ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;
          {cookie_parse.mail}
        </h2>
        <h2>Total Blogs &nbsp;&nbsp; : Updated Soon</h2>
      </div>
    </div>
  );
};

export default Profile;

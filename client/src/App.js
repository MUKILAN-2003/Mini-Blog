import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import "./App.css";
import "./css/dashboard_profile.css";
import "./css/lds_spinner.css";
import HNavbar from "./component/h_navbar";
import DNavbar from "./component/d_navbar";
import AddBlog from "./component/form_component/Addblogs";
import DisplayBlog from "./component/AllBlog";
import MyBlog from "./component/profile/MyBlog";
import BlogDetail from "./component/Blog_Detail/blog_detail";
import Logout from "./component/logout";
import DeleteBlog from "./component/delete_it";
import ShowProfile from "./component/profile/Profile";
import Login from "./component/form_component/login";
import ChangePassword from "./component/form_component/change_password";

import SignUp from "./component/form_component/signup";
import ResetPass from "./component/form_component/reset_pass";
import FeedBack from "./component/form_component/feedback";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/home">
                <HNavbar />
                <DisplayBlog LocationDetail={"/blog-detail/"} />
              </Route>
              <Route exact path="/blogs">
                <DNavbar />
                <DisplayBlog LocationDetail={"/a_blog-detail/"} />
              </Route>
              <Route exact path="/register">
                <HNavbar />
                <SignUp LocationPost={"/user_register"} />
              </Route>
              <Route exact path="/login">
                <HNavbar />
                <Login LocationPost={"/user_login"} />
              </Route>
              <Route exact path="/forgot_pass">
                <HNavbar />
                <ResetPass LocationPost={"/forgot_pass"} />
              </Route>
              <Route exact path="/feedback">
                <HNavbar />
                <FeedBack LocationPost={"/user_feedback"} />
              </Route>
              <Route exact path="/dashboard">
                <DNavbar />
                <ShowProfile />
              </Route>
              <Route exact path="/add-blog">
                <DNavbar />
                <AddBlog LocationPost={"add_blog"} />
              </Route>
              <Route exact path="/my-blog">
                <DNavbar />
                <MyBlog LocationDetail={"/a_blog-detail/"} />
              </Route>
              <Route exact path="/blog-detail/:id">
                <HNavbar />
                <BlogDetail />
              </Route>
              <Route exact path="/a_blog-detail/:id">
                <DNavbar />
                <BlogDetail />
              </Route>
              <Route exact path="/delete_blog/:id">
                <DeleteBlog />
              </Route>
              <Route exact path="/reset/password/:tmpid/:tmptoken/:userid">
                <HNavbar />
                <ChangePassword />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;

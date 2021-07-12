import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./css/lds_spinner.css";
import HNavbar from "./component/h_navbar";
import DNavbar from "./component/d_navbar";
import Home from "./component/home";
import Login from "./component/form_component/login";
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
                <HNavbar />
                <Home />
              </Route>
              <Route path="/register">
                <HNavbar />
                <SignUp LocationPost={"/user_register"} />
              </Route>
              <Route path="/login">
                <HNavbar />
                <Login LocationPost={"/user_login"} />
              </Route>
              <Route path="/forgot_pass">
                <HNavbar />
                <ResetPass LocationPost={"/forgot_pass"} />
              </Route>
              <Route path="/feedback">
                <HNavbar />
                <FeedBack LocationPost={"/user_feedback"} />
              </Route>
              <Route path="/dashboard">
                <DNavbar />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;

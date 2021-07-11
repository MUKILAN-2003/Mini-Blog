import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./component/navbar";
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
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/register">
                <SignUp LocationPost={"/user_register"} />
              </Route>
              <Route path="/login">
                <Login LocationPost={"/user_login"} />
              </Route>
              <Route path="/forgot_pass">
                <ResetPass LocationPost={"/forgot_pass"} />
              </Route>
              <Route path="/feedback">
                <FeedBack LocationPost={"/user_feedback"} />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;

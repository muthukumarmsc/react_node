import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Emailtemplates from "./components/pages/Emailtemplates";
import React, { Component } from "react";
import Login from "./components/auth/Login";
import Forgot from "./components/auth/Forgot";
import NotFound from "./components/layout/NotFound";
import { Provider } from "react-redux";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Register from "./components/auth/Register";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "../node_modules/font-awesome/css/font-awesome.css";
import "../node_modules/jquery/dist/jquery.min";
import "../node_modules/popper.js/dist/popper";
import User from "./components/pages/Users";
import Helpdesk from "./components/pages/Helpdesk";
import Company from "./components/pages/Company";
import Changepassword from "./components/pages/Changepassword";
import Resetpassword from "./components/auth/Resetpassword";
import Subscription from "./components/pages/Subscription";
import Transaction from "./components/pages/Transaction";
import Profile from "./components/pages/Profile";
import Sponsorship from "./components/pages/Sponsorship";
import Terms from "./components/auth/Terms";
import Advertisement from "./components/pages/Advertisement";


if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={"/Easysoft/"}>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/Resetpassword/:id" component={Resetpassword} />
              <Route exact path="/terms" component={Terms} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/users" component={User} />
                <PrivateRoute exact path="/company" component={Company} />
                <PrivateRoute exact path="/subscription" component={Subscription} />
                <PrivateRoute exact path="/sponsorship" component={Sponsorship} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/changepassword" component={Changepassword} />
                <PrivateRoute exact path="/transaction" component={Transaction} />
                <PrivateRoute exact path="/helpdesk" component={Helpdesk} />
                <PrivateRoute exact path="/emailtemplates" component={Emailtemplates} />
                <PrivateRoute exact path="/advertisement" component={Advertisement} />
              </Switch>
              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

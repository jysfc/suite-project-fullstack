import React from "react";
import "./style/master.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import EditProperty from "./components/pages/EditProperty";
import EditSuite from "./components/pages/EditSuite";
import LoginAndSignUp from "./components/pages/LoginAndSignUp";
import SelectProperty from "./components/pages/SelectProperty";
import Suite from "./components/pages/Suite";
import NotFound from "./components/pages/NotFound";
import jwtDecode from "jwt-decode";
import store from "./store/store";
import actions from "./store/actions";

const authToken = localStorage.authToken;
if (authToken) {
   // if the authToken is not expired
   const currentTimeInSec = Date.now() / 1000;
   const user = jwtDecode(authToken);
   if (currentTimeInSec > user.exp) {
      console.log("expired token");
      // remove the currentUser from the global state / redux store {}
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
   } else {
      console.log("valid token");
      // store user in global state / redux store (currentUser)
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: user,
      });
      // set authorization headers
      // redirect to select-property
      const currentUrl = window.location.pathname;
      if (currentUrl === "/") {
         window.location.href = "/select-property";
      }
   }
} else {
   console.log("no token");
}

export default function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/edit-property" component={EditProperty} />
            <Route exact path="/edit-suite" component={EditSuite} />
            <Route exact path="/loginAndSignUp" component={LoginAndSignUp} />
            <Route exact path="/select-property" component={SelectProperty} />
            <Route exact path="/suite" component={Suite} />
            <Route component={NotFound} />
         </Switch>
      </Router>
   );
}

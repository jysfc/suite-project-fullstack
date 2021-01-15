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

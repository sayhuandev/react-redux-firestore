import React from "react";
import { Switch, Route } from "react-router-dom";

import UserRouteList from "../../Routes/UserRouteList";
import Home from "../User/Home"

const UserLayout = (...props) => {
  return (
    <div>
      <div className="main-container">
        <Switch>
          {UserRouteList.map((route, idx) => {
            return (
              route.component && <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={(props) => <route.component {...props} />} />
            );
          })}
          <Route path="/" render={(props) => <Home {...props} />} />
        </Switch>
      </div>
    </div>
  );
};

export default UserLayout;

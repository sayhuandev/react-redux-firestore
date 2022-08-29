import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminRouteList from "../../Routes/AdminRouteList";
import Dashboard from "../Admin/Dashboard";

const AdminLayout = (...props) => {
  return (
    <div>
      <div>
        <Switch>
          {AdminRouteList.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => <route.component {...props} />}
                />
              )
            );
          })}
          <Route path="/" render={(props) => <Dashboard {...props} />} />
        </Switch>
      </div>
    </div>
  );
};

export default AdminLayout;

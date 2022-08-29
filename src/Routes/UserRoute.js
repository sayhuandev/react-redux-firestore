import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import UserLayout from "../Components/Layouts/UserLayout";

const UserRoute = (...rest) => {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setAuthenticated(true);
    setLoading(false);
    return () => {
      setAuthenticated(false);
    };
  }, []);

  if (loading) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  }

  return (
    <Route
      {...rest}
      render={(props, location) =>
        authenticated ? <UserLayout {...props} /> : <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    />
  );
};

export default UserRoute;

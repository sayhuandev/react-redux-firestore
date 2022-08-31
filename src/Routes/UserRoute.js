import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import UserLayout from "../Components/Layouts/UserLayout";
import { useSelector } from "react-redux";

const UserRoute = (...rest) => {
  const auth = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let email = auth.auth_email || localStorage.getItem("user_email"); 
    let role = auth.auth_role || localStorage.getItem("user_role"); 
    if (email != "" && role == "user") {
      setAuthenticated(true);
      setLoading(false);
    }

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

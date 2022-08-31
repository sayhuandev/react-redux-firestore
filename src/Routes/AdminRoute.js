import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import AdminLayout from "../Components/Layouts/AdminLayout";
import { useSelector } from "react-redux";

const AdminRoute = (...rest) => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (auth.auth_email != "" && auth.auth_role == "admin") {
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
        authenticated ? <AdminLayout {...props} /> : <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    />
  );
};

export default AdminRoute;

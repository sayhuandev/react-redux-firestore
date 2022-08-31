// Import React / Redux
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Other Plugin
import Swal from "sweetalert2";

// Import Component
import UserLayout from "../Components/Layouts/UserLayout";

const UserRoute = (...rest) => {
  // Hooks
  let history = useHistory();

  // Redux
  const auth = useSelector((state) => state.auth);

  // States
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Functions
  useEffect(() => {
    let email = auth.auth_email || localStorage.getItem("user_email"); 
    let role = auth.auth_role || localStorage.getItem("user_role"); 
    if (email !== "" && role === "user") {
      setAuthenticated(true);
      setLoading(false);
    }
    else {
      Swal.fire("Unauthorized Access", "Please Try Again", "warning");
      history.push("/");
    }

    return () => {
      setAuthenticated(false);
    };
  }, []);

  if (loading) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  }

  // Render
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

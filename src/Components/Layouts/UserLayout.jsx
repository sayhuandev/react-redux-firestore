import React from "react";
import { Switch, Route } from "react-router-dom";

import UserRouteList from "../../Routes/UserRouteList";
import Home from "../User/Home";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Copyright from "../Auth/Copyright";
import NavBar from "../User/NavBar";

const UserLayout = (...props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <div style={{ flexGrow: 1 }}>
        <Switch>
          {UserRouteList.map((route, idx) => {
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
          <Route path="/" render={(props) => <Home {...props} />} />
        </Switch>
      </div>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800]),
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

export default UserLayout;

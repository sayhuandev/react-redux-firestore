import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminRouteList from "../../Routes/AdminRouteList";
import Dashboard from "../Admin/Dashboard";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Copyright from "../Auth/Copyright";
import NavBar from "../Admin/NavBar";

const AdminLayout = (...props) => {
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

export default AdminLayout;

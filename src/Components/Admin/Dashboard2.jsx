import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

const mdTheme = createTheme();

function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <h1>Dashboard Content 2</h1>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard2() {
  return <DashboardContent />;
}

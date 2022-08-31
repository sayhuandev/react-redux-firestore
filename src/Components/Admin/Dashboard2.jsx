// Import React / Redux
import React from "react";

// Import MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

function DashboardContent() {
  // Variables
  const mdTheme = createTheme();

  // Render
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

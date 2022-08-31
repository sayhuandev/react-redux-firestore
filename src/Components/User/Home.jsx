// Import React / Redux
import React from "react";

// Import MUI
import { Box } from "@mui/material";

// Import Component
import UserCard from "./UserCard";

const Home = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <UserCard />
    </Box>
  );
};

export default Home;

import { Box } from "@mui/material";
import React from "react";
import UserCard from "./UserCard";

const Home = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <UserCard />
    </Box>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import { initList } from "../Reducers/listReducer";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Firebase from "../../Firebase";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AddUserDialog from "./Dialogs/AddUserDialog";
import EditUserDialog from "./Dialogs/EditUserDialog";
import DltUserDialog from "./Dialogs/DltUserDialog";
import { toggleDialog } from "../Reducers/adminDialogReducer";

const db = getFirestore(Firebase);
const mdTheme = createTheme();

function DashboardContent() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.list.users);
  const auth = useSelector((state) => state.auth);
  const dialog = useSelector((state) => state.adminDialog);

  useEffect(() => {
    // Fetch All User
    if (userList.length <= 0) init();
    console.log("userList in dashboard :", userList);
  }, []);

  const init = async () => {
    console.log("fetching");
    const querySnapshot = await getDocs(collection(db, "users"));
    let userList = [];
    querySnapshot.forEach((doc) => {
      let uData = doc.data();
      userList.push({
        auth_role: uData.role,
        auth_uid: doc.id,
        auth_email: uData.email,
        auth_user_det: {
          first_name: uData.firstName,
          last_name: uData.lastName,
          gender: uData.gender,
        },
      });
    });

    dispatch(initList({ list: userList, type: "users" }));
  };

  const dialogControl = (currDialog) => {
    dispatch(toggleDialog({ currDialog, visible: true }));
  };

  const dialogMap = {
    add_user: <AddUserDialog />,
    edit_user: <EditUserDialog />,
    delete_user: <DltUserDialog />,
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box className="p-3 user-container" sx={{ maxHeight: "80vh", overflowY: "auto", overflowX: "hidden" }}>
        <Button variant="contained" endIcon={<AddReactionIcon />} className="mb-1 float-end" onClick={() => dialogControl("add_user")}>
          Add New User
        </Button>
        <Grid container spacing={2}>
          {userList.map((u, idx) => {
            return (
              <Grid item md={3} key={idx}>
                <UserCard user={u} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {dialogMap[dialog.currDialog]}
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

// Import React / Redux
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Import MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Import Firebase / Firestore
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import Firebase from "../../../Firebase";

// Import Other Plugin
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

// Import Reducer
import { toggleDialog } from "../../Reducers/adminDialogReducer";
import { updateUser } from "../../Reducers/listReducer";

export default function EditUserDialog(props) {
  // Hooks
  const dispatch = useDispatch();

  // Variables
  const db = getFirestore(Firebase);

  // Redux
  const dialog = useSelector((state) => state.adminDialog);
  const users = useSelector((state) => state.list.users);
  const targetUser = users.find((x) => x.auth_uid === dialog.targetUser);

  // Functions
  const submitEditUser = async (e) => {
    e.preventDefault();
    console.log("submitting edit user");
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("password"));
    let userData = { ...Object.fromEntries(formData) };
    if (formData.get("password") !== "") {
      let encryptedPsw = CryptoJS.AES.encrypt(formData.get("password"), process.env.REACT_APP_SECRET_KEY).toString();
      userData = { ...userData, password: encryptedPsw };
    } else {
      delete userData["password"];
    }

    const userRef = doc(db, "users", dialog.targetUser);
    if (userRef) {
      await updateDoc(userRef, { ...userData });
      let latestUserData = { ...userData, uid: dialog.targetUser };
      dispatch(updateUser({ latestUserData }));
      handleClose();
      Swal.fire("Successfully updated user", "", "success");
    }
  };

  const handleClose = () => {
    dispatch(toggleDialog({ ...dialog, visible: false }));
  };

  // Render
  return (
    <Dialog open={dialog.visible} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={submitEditUser} sx={{ mt: 3 }} autoComplete="off" autoFocus={false}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="firstName" required fullWidth label="First Name" defaultValue={targetUser.auth_user_det.first_name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Last Name" name="lastName" defaultValue={targetUser.auth_user_det.last_name} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth label="Email Address" name="email" value={targetUser.auth_email} />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select labelId="demo-simple-select-label" name="gender" label="Gender" defaultValue={targetUser.auth_user_det.gender}>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                autoFocus={false}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Edit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

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
import { addDoc, collection, getFirestore, query, where, getDocs } from "firebase/firestore";
import Firebase from "../../../Firebase";

// Import Other Plugin
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

// Import Reducer
import { toggleDialog } from "../../Reducers/adminDialogReducer";
import { addNewUser } from "../../Reducers/listReducer";

export default function AddUserDialog() {
  // Hooks
  const dispatch = useDispatch();

  // Variables
  const db = getFirestore(Firebase);

  // Redux
  const dialog = useSelector((state) => state.adminDialog);

  // Functions
  const submitAddNewUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let encryptedPsw = CryptoJS.AES.encrypt(formData.get("password"), process.env.REACT_APP_SECRET_KEY).toString();
    let userData = { ...Object.fromEntries(formData), password: encryptedPsw, role: "user" };
    if (userData) {
      const q = query(collection(db, "users"), where("email", "==", userData.email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size <= 0) {
        const docRef = await addDoc(collection(db, "users"), userData);
        if (docRef.id) {
          handleClose();
          Swal.fire("Successfully Added New User", "", "success");
          let newUserData = {
            auth_role: "user",
            auth_uid: docRef.id,
            auth_email: userData.email,
            auth_user_det: {
              first_name: userData.firstName,
              last_name: userData.lastName,
              gender: userData.gender,
            },
          };
          dispatch(addNewUser({ newUserData }));
        }
      } else {
        handleClose();
        Swal.fire("Email has been used by another user!", "Please add using another email address", "warning");
      }
    }
  };

  const handleClose = () => {
    dispatch(toggleDialog({ ...dialog, visible: false }));
  };

  // Render
  return (
    <Dialog open={dialog.visible} onClose={handleClose}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={submitAddNewUser} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="firstName" required fullWidth label="First Name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Last Name" name="lastName" />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth label="Email Address" name="email" />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select labelId="demo-simple-select-label" name="gender" label="Gender" defaultValue={"male"}>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth name="password" label="Password" type="password" id="password" />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

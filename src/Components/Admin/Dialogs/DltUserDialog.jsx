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
import Typography from "@mui/material/Typography";

// Import Firebase / Firestore
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import Firebase from "../../../Firebase";

// Import Other Plugin
import Swal from "sweetalert2";

// Import Reducer
import { toggleDialog } from "../../Reducers/adminDialogReducer";
import { deleteUser } from "../../Reducers/listReducer";

export default function DltUserDialog(props) {
  // Hooks
  const dispatch = useDispatch();

  // Variables
  const db = getFirestore(Firebase);

  // Redux
  const dialog = useSelector((state) => state.adminDialog);
  const users = useSelector((state) => state.list.users);
  const targetUser = users.find((x) => x.auth_uid === dialog.targetUser);

  // Functions
  const submitDeleteUser = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", dialog.targetUser);
    if (userRef) {
      await deleteDoc(userRef);
      dispatch(deleteUser({ uid: dialog.targetUser }));
      handleClose();
      Swal.fire("Successfully deleted user", "", "success");
    }
  };

  const handleClose = () => {
    dispatch(toggleDialog({ ...dialog, visible: false }));
  };

  // Render
  return (
    <>
      {targetUser && (
        <Dialog open={dialog.visible} onClose={handleClose}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate onSubmit={submitDeleteUser} sx={{ mt: 3 }} autoComplete="off" autoFocus={false}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField name="firstName" required fullWidth label="First Name" value={targetUser.auth_user_det.first_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="Last Name" name="lastName" value={targetUser.auth_user_det.last_name} />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth label="Email Address" name="email" value={targetUser.auth_email} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select labelId="demo-simple-select-label" name="gender" label="Gender" value={targetUser.auth_user_det.gender}>
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Typography fontWeight={"bold"} color="error" className="text-center mt-2">
                Are you sure want to delete this user?
              </Typography>
              <Button type="submit" color="error" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Delete
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

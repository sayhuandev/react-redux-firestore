import React, { useEffect } from "react";
// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

// Custom Component
import Copyright from "./Copyright";
import firebase from "../../Firebase";
import { addDoc, collection, getFirestore, query, where, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

const theme = createTheme();
const db = getFirestore(firebase);

export default function SignUp() {
  useEffect(() => {}, []);

  const register = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let encryptedPsw = CryptoJS.AES.encrypt(formData.get("password"), process.env.REACT_APP_SECRET_KEY).toString();
    let userData = { ...Object.fromEntries(formData), password: encryptedPsw, role: "user" };
    if (userData) {
      const q = query(collection(db, "users"), where("email", "==", userData.email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size <= 0) {
        const docRef = await addDoc(collection(db, "users"), userData);
        if (docRef.id) Swal.fire("Successfully Added New User", "", "success");
      } else {
        Swal.fire("Email has been used by another user!", "Please register using another email address", "warning");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

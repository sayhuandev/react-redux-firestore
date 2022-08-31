import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./Copyright";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import firebase from "../../Firebase";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initAuth } from "../Reducers/authReducer";

const db = getFirestore(firebase);
const theme = createTheme();

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let { email, password } = Object.fromEntries(data);
    if (email && password) {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot && querySnapshot.size > 0) {
        let user = querySnapshot.docs?.[0];
        if (user) {
          let userId = user.id;
          let userData = user?.data();
          let userPsw = CryptoJS.AES.decrypt(userData.password, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
          if (userPsw === password) {
            Swal.fire("Logged In Successfully", "", "success");
            localStorage.setItem("user_role", userData.role);
            localStorage.setItem("user_email", userData.email);
            dispatch(
              initAuth({
                auth_role: userData.role,
                auth_uid: userId,
                auth_email: userData.email,
                auth_user_det: { first_name: userData.firstName, last_name: userData.lastName, gender: userData.gender },
              })
            );
            if (userData.role === "user") history.push("/home");
            else if (userData.role === "admin") history.push("/admin/dashboard");
          } else {
            Swal.fire("Incorrect Password!", "Please try again", "warning");
          }
        }
      } else {
        Swal.fire("User Not Exist!", "Please try again with another email address", "error");
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
            Sign innnnn
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

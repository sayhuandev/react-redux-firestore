// Import React / Redux
import * as React from "react";
import { useSelector } from "react-redux";

// Import MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function UserCard() {
  // Redux
  const auth = useSelector((state) => state.auth);

  // Variables
  let authLS = JSON.parse(localStorage.getItem("user_auth_data"));

  // Functions
  const randomNum = (min = 11, max = 80) => Math.floor(Math.random() * (max - min + 1) + min);
  
  // Render
  return (
    <Card sx={{ minWidth: 450, minHeight: 380 }} className="my-auto">
      <CardMedia component="img" height="300" image={`https://picsum.photos/id/10${randomNum()}/900/1000`} alt="avatar" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="text-center">
          {`${auth?.auth_user_det.first_name || authLS?.auth_user_det.first_name} ${auth?.auth_user_det.last_name || authLS?.auth_user_det.last_name}`}
        </Typography>
        <hr />
        <table className="table">
          <tbody>
            <tr>
              <td className="font-weight-bolder">
                <b>First name</b>
                <span>:</span>
              </td>
              <td>{auth?.auth_user_det.first_name || authLS?.auth_user_det.first_name}</td>
            </tr>
            <tr>
              <td className="font-weight-bolder">
                <b>Last Name</b>
                <span>:</span>
              </td>
              <td>{auth?.auth_user_det.last_name || authLS?.auth_user_det.last_name}</td>
            </tr>
            <tr>
              <td className="font-weight-bolder">
                <b>Email</b>
                <span>:</span>
              </td>
              <td>{auth?.auth_email || authLS?.auth_email}</td>
            </tr>
            <tr>
              <td className="font-weight-bolder">
                <b>Gender</b>
                <span>:</span>
              </td>
              <td>{auth?.auth_user_det.gender || authLS?.auth_user_det.gender}</td>
            </tr>
            <tr>
              <td className="font-weight-bolder">
                <b>Role</b>
                <span>:</span>
              </td>
              <td>{auth?.auth_role || authLS?.auth_role}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

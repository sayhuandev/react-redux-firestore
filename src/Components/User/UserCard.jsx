import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function UserCard() {
  const auth = useSelector((state) => state.auth);
  const randomNum = (min = 11, max = 80) => Math.floor(Math.random() * (max - min + 1) + min);
  return (
    <Card sx={{ minWidth: 450, minHeight: 400 }} className="my-auto">
      <CardMedia component="img" height="300" image={`https://picsum.photos/id/10${randomNum()}/900/1000`} alt="avatar" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="text-center">
          {`${auth.auth_user_det.first_name} ${auth.auth_user_det.last_name}`}
        </Typography>
        <hr />
        <table className="table">
          <tbody>
            <tr>
              <td className="font-weight-bolder">
                <b>First name</b>
                <span>:</span>
              </td>
              <td>{auth.auth_user_det.first_name}</td>
            </tr>
            <tr>
              <td className="font-weight-bolder">
                <b>Last Name</b>
                <span>:</span>
              </td>
              <td>{auth.auth_user_det.last_name}</td>
            </tr>
            <tr>
              <td className="font-weight-bolder">
                <b>Email</b>
                <span>:</span>
              </td>
              <td>{auth.auth_email}</td>
            </tr>
            <tr>
              <td className="font-weight-bolder">
                <b>Gender</b>
                <span>:</span>
              </td>
              <td>{auth.auth_user_det.gender}</td>
            </tr>
            <tr>
              <td className="font-weight-bolder">
                <b>Role</b>
                <span>:</span>
              </td>
              <td>{auth.auth_role}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

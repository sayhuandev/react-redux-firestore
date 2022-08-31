import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { toggleDialogWithUser } from "../Reducers/adminDialogReducer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function UserCard(props) {
  const auth = props.user;
  const dispatch = useDispatch();
  const randomNum = (min = 11, max = 80) => Math.floor(Math.random() * (max - min + 1) + min);

  const dialogControl = (currDialog, targetUser) => {
    dispatch(toggleDialogWithUser({ currDialog, visible: true, targetUser }));
  };

  return (
    <Card sx={{ maxWidth: 350, minHeight: 250 }} className="my-auto">
      {/* <CardMedia component="img" height="200" image={`https://picsum.photos/id/10${randomNum()}/900/1000`} alt="avatar" /> */}
      <CardMedia component="img" height="200" image={`https://picsum.photos/id/1035/900/1000`} alt="avatar" />
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
        <div className="d-flex justify-content-between">
          <Button
            variant="contained"
            color="success"
            startIcon={<EditIcon />}
            className="mb-3 float-end"
            fullWidth
            onClick={() => dialogControl("edit_user", auth.auth_uid)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            className="mb-3 float-end ms-1"
            fullWidth
            onClick={() => dialogControl("delete_user", auth.auth_uid)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

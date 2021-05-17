import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useNavigate } from "@reach/router";
import { useSnackbar } from "notistack";

import authApi from "../api/auth";
import authStorage from "../storage";

export default function MainContent({ user }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const hendelTestrequest = async () => {
    const result = await authApi.test();
    if (!result.ok)
      enqueueSnackbar("Somthing went wrong!", { variant: "error" });
    else enqueueSnackbar("Request sent successfully", { variant: "success" });
  };

  const handleLogout = () => {
    authStorage.removeToken();
    navigate("/signin");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
        {`Hello ${user.firstName}`}
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Congratulation, you have logged in successfully.
      </Typography>
      <ul style={{ marginBottom: "5rem" }}>
        <li>{`First Name: ${user.firstName}`}</li>
        <li>{`Last Name: ${user.lastName}`}</li>
        <li>{`Email Address: ${user.email}`}</li>
        <li>{`Phone Number: ${user.phoneNumber}`}</li>
      </ul>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={hendelTestrequest}
          >
            send test request
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Log Out
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

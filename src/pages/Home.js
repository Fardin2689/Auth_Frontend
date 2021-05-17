import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";

import MainContent from "./MainContent";
import Loading from "../components/Loading";
import authApi from "../api/auth";
import authStorage from "../storage";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: theme.spacing(8, 0, 6),
    flex: 1,
  },
}));

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const restoreToken = async () => {
    const token = authStorage.getToken();
    if (!token) return navigate("/signin");

    const session = await authApi.session();
    if (!session.ok) return navigate("/signin");

    setUser(session.data);
  };

  useEffect(() => {
    restoreToken();
    // eslint-disable-next-line
  }, []);

  if (!user) return <Loading />;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <MainContent user={user} />
      </main>
    </div>
  );
}

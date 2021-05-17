import React from "react";
import { Router } from "@reach/router";
import { SnackbarProvider } from "notistack";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";

const NotFound = () => <div>Sorry, nothing here.</div>;

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Home path="/" />
        <SignIn path="signin/*userEmail" />
        <SignUp path="signup" />
        <ForgotPass path="forgotpass" />
        <ResetPass path="resetpassword/:token" />
        <NotFound default />
      </Router>
    </SnackbarProvider>
  );
}

export default App;

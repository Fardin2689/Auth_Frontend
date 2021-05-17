import React from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useNavigate } from "@reach/router";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import FormikForm from "../components/FormikForm";
import CTextField from "../components/CustomTextInput";
import authApi from "../api/auth";
import authStorage from "../storage";
import useApi from "../hooks/useApi";

const Footer = () => (
  <Grid container>
    <Grid item xs>
      <Link href="/forgotpass" variant="body2">
        Forgot password?
      </Link>
    </Grid>
    <Grid item>
      <Link href="/signup" variant="body2">
        Don't have an account? Sign Up
      </Link>
    </Grid>
  </Grid>
);

const FormikFormSignIn = ({ userEmail }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const sendApi = useApi(authApi.signIn);

  const initialValues = { email: userEmail ? userEmail : "", password: "" };
  const handleSubmit = async (values) => {
    const result = await sendApi.request(values);
    if (!result.ok) {
      return enqueueSnackbar("Invalid email and/or password.", {
        variant: "error",
      });
    } else {
      authStorage.storeToken(result.data.accessToken);
      enqueueSnackbar("Loged In Successfully", { variant: "success" });
      navigate("/");
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please Enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  return (
    <FormikForm
      initial={initialValues}
      validation={validationSchema}
      handleSubmit={handleSubmit}
      loading={sendApi.loading}
      buttonTitle={"Sign In"}
      footer={<Footer />}
    >
      <CTextField
        label="Email Address"
        name="email"
        type="text"
        autoComplete="email"
        margin="normal"
        autoFocus
      />
      <CTextField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        margin="normal"
      />
    </FormikForm>
  );
};

export default FormikFormSignIn;

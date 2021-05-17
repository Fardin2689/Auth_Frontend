import React from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useNavigate } from "@reach/router";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import FormikForm from "../components/FormikForm";
import CTextField from "../components/CustomTextInput";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";

const Footer = () => (
  <Grid container justify="flex-end">
    <Grid item>
      <Link href="/signin" variant="body2">
        Already have an account? Sign in
      </Link>
    </Grid>
  </Grid>
);

const FormikFormSignIn = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const sendApi = useApi(authApi.signUp);

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    const result = await sendApi.request(values);
    if (!result.ok)
      return enqueueSnackbar(result.problem, {
        variant: "error",
      });
    else {
      enqueueSnackbar("User Created Successfully", { variant: "success" });
      navigate(`signin/${values.email}`);
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Must be 2 characters or more")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^(\+98|0|0098)?9\d{9}$/, "phone number is not valid"),
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
      buttonTitle={"Sign Up"}
      footer={<Footer />}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CTextField label="First Name" name="firstName" type="text" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CTextField label="Last Name" name="lastName" type="text" />
        </Grid>
        <Grid item xs={12}>
          <CTextField label="Phone Number" name="phoneNumber" type="text" />
        </Grid>
        <Grid item xs={12}>
          <CTextField label="Email Address" name="email" type="text" />
        </Grid>
        <Grid item xs={12}>
          <CTextField label="Password" name="password" type="Password" />
        </Grid>
      </Grid>
    </FormikForm>
  );
};

export default FormikFormSignIn;

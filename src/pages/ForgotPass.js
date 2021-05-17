import React, { useState } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import Counter from "../components/Counter";
import FormikForm from "../components/FormikForm";
import CTextField from "../components/CustomTextInput";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";

const Footer = () => (
  <Grid container>
    <Grid item xs>
      <Link href="/signin" variant="body2">
        Sign In
      </Link>
    </Grid>
    <Grid item>
      <Link href="/signup" variant="body2">
        Sign Up
      </Link>
    </Grid>
  </Grid>
);

const ForgotPass = () => {
  const [disable, setDisable] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const sendApi = useApi(authApi.forgotPass);

  const initialValues = { email: "" };

  const handleSubmit = async (values) => {
    const result = await sendApi.request(values);
    if (!result.ok) {
      return enqueueSnackbar(result.problem, {
        variant: "error",
      });
    } else {
      enqueueSnackbar("An Email with a reset-password link has been sent.", {
        variant: "success",
      });
      setDisable(true);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  return (
    <FormikForm
      initial={initialValues}
      validation={validationSchema}
      handleSubmit={handleSubmit}
      loading={sendApi.loading}
      disableBt={disable}
      buttonTitle={
        disable ? <Counter count={15} setDisable={setDisable} /> : "Send Link"
      }
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
    </FormikForm>
  );
};

export default ForgotPass;

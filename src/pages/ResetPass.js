import React from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useNavigate } from "@reach/router";

import FormikForm from "../components/FormikForm";
import CTextField from "../components/CustomTextInput";
import authApi from "../api/auth";
import useApi from "../hooks/useApi";

const ResetPass = ({ token }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const sendApi = useApi(authApi.resetPass);

  const initialValues = { password: "", passwordConfirm: "" };
  const handleSubmit = async (values) => {
    const result = await sendApi.request(values, token);
    if (!result.ok) {
      return enqueueSnackbar("error", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Your Password has been changed successfully.", {
        variant: "success",
      });
      navigate("/signin");
    }
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please Enter your new password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    passwordConfirm: Yup.string()
      .required("Please Enter your password again")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <FormikForm
      initial={initialValues}
      validation={validationSchema}
      handleSubmit={handleSubmit}
      loading={sendApi.loading}
      buttonTitle={"Change Password"}
    >
      <CTextField
        label="Password"
        name="password"
        type="password"
        margin="normal"
      />
      <CTextField
        label="New Password Again"
        name="passwordConfirm"
        type="password"
        margin="normal"
      />
    </FormikForm>
  );
};

export default ResetPass;

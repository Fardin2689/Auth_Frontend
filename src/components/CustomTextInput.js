import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const err = Boolean(meta.touched && meta.error);
  return (
    <TextField
      variant="outlined"
      fullWidth
      label={label}
      id={props.name}
      {...field}
      {...props}
      error={err}
      helperText={err ? meta.error : null}
    />
  );
};

export default CustomTextInput;

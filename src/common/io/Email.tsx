import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { Field } from "react-final-form";

type TextFieldProps = {
  name: string;
  caption?: string;
  validate?: (value: any) => undefined | string;
} & MuiTextFieldProps;

export const Email: React.FC<TextFieldProps> = ({
  name,
  title,
  caption,
  validate,
  ...restProps
}) => {
  return (
    <Field name={name} validate={validate}>
      {(props) => {
        return (
          <MuiTextField
            error={props.meta.touched && !!props.meta.error}
            helperText={props.meta.touched && props.meta.error}
            className="mt-4"
            label={caption}
            type="email"
            {...props.input}
            {...restProps}
          />
        );
      }}
    </Field>
  );
};

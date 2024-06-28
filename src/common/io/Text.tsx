import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { Field } from "react-final-form";

type TextProps = {
  name: string;
  caption?: string;
  validators?: [];
  variant?: string;
  validate?: (value: any) => undefined | string;
} & MuiTextFieldProps;

export const Text: React.FC<TextProps> = ({
  name,
  title,
  caption,
  validate,
  variant,
  ...restProps
}) => {
  return (
    <Field name={name} validate={validate}>
      {(props) => {
        return (
          <MuiTextField
            error={
              (props.meta.touched && !!props.meta.error) ||
              !!props.meta.submitError
            }
            helperText={
              props.meta.touched && (props.meta.error || props.meta.submitError)
            }
            className="mt-4"
            variant={variant}
            label={caption}
            {...props.input}
            {...restProps}
          />
        );
      }}
    </Field>
  );
};

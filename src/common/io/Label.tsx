import { Field } from "react-final-form";

type LabelProps = {
  name: string;
  caption?: string;
  value?: string;
  validators?: [];
  validate?: (value: any) => undefined | string;
};

export const Label: React.FC<LabelProps> = ({
  name,
  caption,
  value,
  validate,
}) => {
  return (
    <Field name={name} validate={validate}>
      {(props) => {
        return (
          <label htmlFor="" className="w-full">
            <p className="text-gray-400 text-sm">{caption}</p>
            <input
              type="text"
              className="border-b w-full border-black bg-transparent"
              value={value}
              disabled
            />
          </label>
        );
      }}
    </Field>
  );
};

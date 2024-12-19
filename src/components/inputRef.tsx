import { Field, FormikProps } from "formik";
import { HTMLInputTypeAttribute } from "react";

interface IProps {
  id: string;
  name: string;
  placeholder?: string;
  formik: FormikProps<any>;
  type?: HTMLInputTypeAttribute;
}

export default function InputRef({
  id,
  name,
  formik,
  type = "text",
  placeholder = name,
}: IProps) {
  const { handleChange, values, touched, errors } = formik;
  return (
    <div className="mb-5 flex flex-col w-full place-content-center items-center">
      <Field
        id={id}
        type={type}
        name={name}
        onChange={handleChange}
        value={values[name].toUpperCase()}
        className="mt-1 w-3/4 rounded-xl border border-gray-300 p-2 px-4 text-center"
        placeholder={placeholder}
      />
      {touched[name] && typeof errors[name] === "string" ? (
        <div className="translate-y-3 text-center text-sm text-rose-500">
          {errors[name]}
        </div>
      ) : null}
    </div>
  );
}

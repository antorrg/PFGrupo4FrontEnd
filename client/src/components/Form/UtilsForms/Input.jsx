import { Field, ErrorMessage } from "formik";

const Input = ({name, title, type , placeholder, values }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-white"
      >
        {" "}
        {title}{" "}
      </label>
      <Field
        className="mt-1 p-2 block w-full border dark:border-none rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        name={name}
        placeholder={placeholder ? placeholder : ""}
        type={type ? type : "text"}
        value={values && values[name]}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm text-red-600"
      />
    </div>
  );
};

export default Input;

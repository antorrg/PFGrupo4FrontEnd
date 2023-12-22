import { ErrorMessage } from "formik";
import Select from "react-select";

const InputSelect = ({name, title, options ,cb , defaul}) => {
  return (
   
    <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 dark:text-white"
    >
      {title}
    </label>

    <Select
    defaultValue={defaul && defaul}
      id={name}
      className="form-control"
      name={name}
      options={options}
      isMulti
      onChange={(selectedOptions) => {
        const selectedValues = selectedOptions.map(
          (option) => option.id
        );
        cb(name, selectedValues);
      }}
    />

    <ErrorMessage
      name={name}
      component="div"
      className="mt-1 text-sm text-red-600"
    />
  </div>
  );
};

export default InputSelect;
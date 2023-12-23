import { Field, ErrorMessage } from "formik";

const InputDate = ({ name, title, cb }) => {
  const handlerDate = (e, cb) => {
    const value = e.target.value;

    // Verifica si el valor no es nulo ni indefinido
    if (value) {
      // Ajusta la fecha para tener en cuenta la zona horaria
      const dateObject = new Date(`${value}T00:00:00Z`);
      const year = dateObject.getUTCFullYear();
      const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getUTCDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      console.log(formattedDate);
      cb("released", formattedDate);
    } else {
      // Puedes manejar el caso cuando el valor es nulo o indefinido
      cb("released", ""); // O algún otro valor predeterminado
    }
  };
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-white"
      >
        {" "}
        {title}
      </label>
      <Field
        className="mt-1 p-2 block w-full border dark:border-none rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        name={name}
        placeholder="AAAA-MM-DD"
        type="date"
        onChange={(e) =>  handlerDate(e, cb)}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm text-red-600"
      />
    </div>
  );
};

export default InputDate;

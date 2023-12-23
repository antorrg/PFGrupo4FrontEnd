import Input from "./UtilsForms/Input";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import { schemaFormRegister } from "./UtilsForms/schema/schema";
import userLog from "../Auth0/Send";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./UtilsForms/iconos";

const FormRegistrer = ({ onClose }) => {
  const user = {
    email: "",
    password: "",
  };

  const [viewPassword, setViewPassword] = useState(false);

  const handlerPassword = () => {
    setViewPassword(!viewPassword);
  };

  const formSchema = schemaFormRegister();

  const createUser = async (values) => {
    try {
      delete values.password1;
      const response = await userLog(values);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handlerClose = () => {
    onClose();
  };
  return (
    <Formik
      initialValues={user}
      validationSchema={formSchema}
      onSubmit={async (values) => {
        await createUser(values);
        onClose();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Input name={"email"} title={"Email"} placeholder={"Obligatorio"} />

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="flex items-center relative">
              <Field
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="password"
                placeholder="Obigatorio"
                type={!viewPassword ? "password" : "text"}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 focus:outline-none"
                type="button"
                onClick={handlerPassword}
              >
                {!viewPassword ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400" />
                )}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password1"
              className="block text-sm font-medium text-gray-700"
            >
              Repita su contraseña
            </label>
            <div className="flex items-center relative">
              <Field
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="password1"
                placeholder="Obigatorio"
                type={!viewPassword ? "password" : "text"}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 focus:outline-none"
                type="button"
                onClick={handlerPassword}
              >
                {!viewPassword ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400" />
                )}
              </button>
            </div>
            <ErrorMessage
              name="password1"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="flex items-center justify-center">
            <Button type="submit" color="primary">
              Crear Usuario
            </Button>
            <Button type="button" onClick={handlerClose} color="primary">
              Cancelar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormRegistrer;

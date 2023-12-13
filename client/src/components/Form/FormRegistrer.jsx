import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";

import userLog from "../Auth0/Send";
import { useState } from "react";

YupPassword(Yup);

import axios from "axios";
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
  const requiredField = () => Yup.string().required("Campo Requerido");

  const passwordField = () =>
    requiredField()
      .min(
        8,
        "La contraseña debe contener 8 o más caracteres con al menos: una mayúscula, una minúscula, un número y un símbolo"
      )
      .minLowercase(1, "Debe contener al menos 1 letra minúscula")
      .minUppercase(1, "Debe contener al menos 1 letra mayúscula")
      .minNumbers(1, "Debe contener al menos 1 número")
      .minSymbols(1, "Debe contener al menos 1 carácter especial");

  const formSchema = Yup.object().shape({
    email: Yup.string().email("Email Inválido").required("Campo Requerido"),
    password: passwordField(),
    password1: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Campo Requerido"),
    given_name: Yup.string(),
    nickname: Yup.string(),
    picture: Yup.string(),
  });

  const handleImageChange = async (event, setFieldValue) => {
    const image = event.currentTarget.files[0];

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dynh9dt8");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/duy9efu8j/image/upload",
          formData
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Imagen cargada con exito",
          showConfirmButton: false,
          timer: 2000,
        });
        setFieldValue("picture", response.data.url);
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

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
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="email"
              placeholder="Obigatorio"
              type="text"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

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
                {viewPassword ? (
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
                {viewPassword ? (
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

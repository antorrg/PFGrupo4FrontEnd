import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
YupPassword(Yup);

const PasswordEdit = ({ onClose }) => {
  const user = useSelector((state) => state.loginUser);

  const initialValues = {
    password: "",
    passwordNew: "",
    passwordNewRepeat: "",
  };

  const [viewPassword, setViewPassword] = useState(false);
  const [validate, setValidate] = useState(false);

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
    password: passwordField(),
  });

  const formSchema1 = Yup.object().shape({
    passwordNew: passwordField(),
    passwordNewRepeat: Yup.string()
      .oneOf([Yup.ref("passwordNew"), null], "Las contraseñas no coinciden")
      .required("Campo Requerido"),
  });

  const validateUser = async (values) => {
    try {
      console.log(values.password);
      const response = await axios.post("/post/user/login", {
        email: user.email,
        password: values.password,
        sub: null,
      });
      console.log(response);
      setValidate(true);
    } catch (error) {
      alert("contraseña incorrecta");
      throw new Error(error);
    }
  };
  const editUser = async (values) => {
    try {
      console.log(values);
      const response = await axios.put(`/put/user/${user.id}`, {
        password: values.passwordNew,
      });
      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate ? formSchema1 : formSchema}
      onSubmit={async (values) => {
        if (validate) {
          await editUser(values);
        } else {
          await validateUser(values);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <h1> {user.email} </h1>

          <hr />
          <br />
          {!validate && (
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña actual
              </label>
              <Field
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="password"
                placeholder="Obigatorio"
                type={!viewPassword ? "password" : "text"}
              />
              <button type="button" onClick={handlerPassword}>
                {" "}
                {viewPassword ? "Ocultar" : "Ver"}{" "}
              </button>
              <ErrorMessage
                name="password"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          )}

          {validate && (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="passwordNew"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ingrese su nueva contraseña
                </label>
                <Field
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="passwordNew"
                  placeholder="Obigatorio"
                  type={!viewPassword ? "password" : "text"}
                />
                <button  type="button" onClick={handlerPassword}>
                  {" "}
                  {viewPassword ? "Ocultar" : "Ver"}{" "}
                </button>
                <ErrorMessage
                  name="passwordNew"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="passwordNewRepeat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Repita su contraseña
                </label>
                <Field
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  name="passwordNewRepeat"
                  placeholder="Obigatorio"
                  type={!viewPassword ? "password" : "text"}
                />
                <button   type="button" onClick={handlerPassword}>
                  {" "}
                  {viewPassword ? "Ocultar" : "Ver"}{" "}
                </button>
                <ErrorMessage
                  name="passwordNewRepeat"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
            </div>
          )}

          {validate ? (
            <div className="flex items-center justify-center">
              <Button type="submit" color="primary">
                Actulizar contraseña
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Button type="submit" color="primary">
                Verificar contraseña
              </Button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PasswordEdit;

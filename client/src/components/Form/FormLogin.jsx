import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import userLog from "../Auth0/Send";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
YupPassword(Yup);
import { login } from "../../redux/actions";
import { NavbarItem } from "@nextui-org/react";
import LoginButton from "../Auth0/LoginButton";
import { useDispatch } from "react-redux";
import FormRegistrer from "./FormRegistrer";
import Modal from "../../Modal/Modal";

const FormularioLogin = ({ onClose}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let user = {
    email: "",
    password: "",
    nickname: "",
    sub: null,
    isLogin: true,
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
  });

  const loginUser = async (values, setFieldValue) => {
    const nickName = values.email.split("@")[0];
    values = { ...values, nickname: nickName };

    const response = await userLog(values);

    if (response) {
      dispatch(login(response));
      navigate("/home");
      onClose();
    }
  };
  return (
    <Formik
      initialValues={user}
      validationSchema={formSchema}
      onSubmit={async (values, setFieldValue) => {
        console.log(values);
        await loginUser(values, setFieldValue);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="flex items-center justify-center">
            <NavbarItem>
              <LoginButton />
            </NavbarItem>
          </div>
          <br />
          <hr />
          <br />

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
              placeholder=""
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
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="password"
              placeholder=""
              type={!viewPassword ? "password" : "text"}
            />
            <button onClick={handlerPassword}>
              {" "}
              {viewPassword ? "Ocultar" : "Ver"}{" "}
            </button>
            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" color="primary">
              Ingresar
            </Button>
          </div>
          <br />
          <hr />
          <br />
          <div>
            <h3>
              ¿No tiene una cuenta ?
              <Modal
                textButton="Registrese"
                title="Cree su usuario"
                body={({ onClose }) => <FormRegistrer onClose={onClose} />}
              />
            </h3>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioLogin;

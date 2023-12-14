import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, Field, FastField, Form, ErrorMessage } from "formik";
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
import logo from "../NavBar/logo.png";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./UtilsForms/iconos";

const FormularioLogin = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let user = {
    email: "",
    password: "",
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
    const response = await userLog(values);

    if (response) {
      dispatch(login(response));
      navigate("/home");
      onClose();
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        {" "}
        <img src={logo} alt="logo" className="h-[60px] w-auto" />
      </div>
      <br />
      <div className="flex items-center justify-center">
        <NavbarItem>
          <LoginButton />
        </NavbarItem>
      </div>
      
      <br />
      <hr />
      
      <Formik
        initialValues={user}
        validationSchema={formSchema}
        onSubmit={async (values, setFieldValue) => {
          await loginUser(values, setFieldValue);
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
                className="mt-2 text-sm text-red-600"
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
            <div className="flex justify-center items-center">
              <h3 className="mr-5">¿No tiene una cuenta ?</h3>
              <Modal
                textButton="Registrese"
                title="Cree su usuario"
                body={({ onClose }) => <FormRegistrer onClose={onClose} />}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormularioLogin;

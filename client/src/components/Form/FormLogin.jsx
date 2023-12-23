import { Formik, Field, FastField, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import userLog from "../Auth0/Send";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions";
import { NavbarItem } from "@nextui-org/react";
import LoginButton from "../Auth0/LoginButton";
import { useDispatch } from "react-redux";
import FormRegistrer from "./FormRegistrer";
import Modal from "../../Modal/Modal";
import logo from "../NavBar/logo.png";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./UtilsForms/iconos";
import { schemaFormLogin } from "./UtilsForms/schema/schema";
import Input from "./UtilsForms/Input";

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

  const formSchema = schemaFormLogin();

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

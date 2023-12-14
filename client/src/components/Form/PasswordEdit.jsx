import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
YupPassword(Yup);
import { showSuccess, showError } from "../../utils/Notifications";
import { useDispatch } from "react-redux";
import { limpiarLogin } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import setAuthHeader from "../../utils/AxiosUtils";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./UtilsForms/iconos";
import Swal from "sweetalert2";

const PasswordEdit = ({ onClose }) => {
  const user = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const token = localStorage.getItem("validToken");
  const navigate = useNavigate();
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
      const response = await axios.post("/post/user/login", {
        email: user.email,
        password: values.password,
        sub: null,
      });

      setValidate(true);
      showSuccess("Validacion exitosa");
    } catch (error) {
      showError("Contraseña incorrecta");
    }
  };

  const editPassword = async (values) => {
    const userConfirmation = await Swal.fire({
      title: `¿Estás seguro de cambiar la contraseña?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (userConfirmation.isConfirmed) {
      try {
        const response = await axios.put(
          `/put/user/${user.id}`,
          {
            password: values.passwordNew,
          },
          setAuthHeader(token)
        );

        if (response.status === 200) {
          showSuccess(`Su contraseña se cambio exitosamente `);
          dispatch(limpiarLogin());
          navigate("/");
        } else {
          showError(`No fue posible cambiar la contraseña`);
        }
      } catch (error) {
        showError(`${error.response.data.error}`);
      }
    } else {
      showInfo(`Se cancelo el cambio de la contraseña`);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate ? formSchema1 : formSchema}
      onSubmit={async (values) => {
        if (validate) {
          await editPassword(values);
        } else {
          await validateUser(values);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <br />
          <hr />
          <div className="sm:border dark:border-none sm:dark:bg-[#0B0120] max-w-[42rem] lg:max-w-[50rem] w-full sm:my-8 rounded-3xl">
            <header className="dark:text-white mx-auto w-fit my-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-secondary">
               {  validate || !user.password ? " Crear contraseña" : "Cambiar contraseña"} 
              </h1>
            </header>
          </div>
          
          {!validate && user.password && (
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña actual
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
          )}

          {(validate || (!user.password && setValidate(true))) && (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="passwordNew"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ingrese su nueva contraseña
                </label>
                <div className="flex items-center relative">
                  <Field
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    name="passwordNew"
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
                <div className="flex items-center relative">
                  <Field
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    name="passwordNewRepeat"
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
                  name="passwordNewRepeat"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
            </div>
          )}

          {validate || !user.password ? (
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

import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import userLog from "../Auth0/Send";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
YupPassword(Yup);
import { login } from "../../redux/actions";
import { NavbarItem } from "@nextui-org/react";
import LoginButton from "../Auth0/LoginButton";
import { useDispatch } from "react-redux";
import axios from "axios";

const FormRegistrer = ({ onClose, setIsAuthenticatedLocal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = {
    email: "",
    password: "",
    nickname: "",
    sub: null,
    given_name: "",
    picture: "",
  };

  const initialValues = {
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
  const pictureDefault =
    " https://res.cloudinary.com/dmhxl1rpc/image/upload/c_scale,w_250/v1701669223/gameworld/avatar_gamer.jpg";

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

  const loginUser = async (values) => {
    const nickName = values.email.split("@")[0];
    values = { ...values, nickname: nickName };
    delete values.password1;
    if (!values.picture) {
      values.picture = pictureDefault;
    }
    console.log(values);
  };
  return (
    <Formik
      initialValues={user}
      validationSchema={formSchema}
      onSubmit={async (values) => {
        try {
          await loginUser(values);
        } catch (error) {
          console.log(error.message);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="password"
              placeholder="Obigatorio"
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

          <div className="mb-4">
            <label
              htmlFor="password1"
              className="block text-sm font-medium text-gray-700"
            >
              Repita su contraseña
            </label>
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="password1"
              placeholder="Obigatorio"
              type={!viewPassword ? "password" : "text"}
            />
            <button onClick={handlerPassword}>
              {" "}
              {viewPassword ? "Ocultar" : "Ver"}{" "}
            </button>
            <ErrorMessage
              name="password1"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="given_name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="given_name"
              placeholder="Opcional"
              type="text"
            />
            <ErrorMessage
              name=" given_name"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              Apodo
            </label>
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="nickname"
              placeholder="Opcional"
              type="text"
            />
            <ErrorMessage
              name="nickname"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="picture"
              className="block text-sm font-medium text-gray-700"
            >
              Foto
            </label>
            <input
              type="file"
              id="picture"
              name="picture"
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(event) =>
                handleImageChange(event, setFieldValue, values)
              }
            />
            <div>
              <img className="rounded-xl" src={values.picture} alt="" />
            </div>

            <ErrorMessage
              name="picture"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="flex items-center justify-center">
            <Button type="submit" color="primary">
              Crear Usuario
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormRegistrer;

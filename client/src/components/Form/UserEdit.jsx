import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { showSuccess, showError } from "../../utils/Notifications";
import { useDispatch } from "react-redux";
import { limpiarLogin, login } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";
import setAuthHeader from "../../utils/AxiosUtils";

const UserEdit = ({ onClose }) => {
  const user = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const token = localStorage.getItem("validToken");
  const navigate = useNavigate();

  const { country, given_name, nickname, picture, email, id, role, enable } =
    user;

  let userEdit = { country, given_name, nickname, picture, role, enable };

  if (userEdit.country === null) userEdit = { ...userEdit, country: "" };

  const formSchema = Yup.object().shape({
    country: Yup.string(),
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
        showSuccess("Imagen cargada");
        setFieldValue("picture", response.data.url);
      } catch (error) {
        showError("No fue posible cargar la imagen");
      }
    }
  };

  const editUser = async (values) => {
    try {
      const { data } = await axios.put(
        `/put/user/${id}`,
        values,
        setAuthHeader(token)
      );
      showSuccess("Usuario actualizado, vuelva a ingresar ");
      dispatch(limpiarLogin());
      navigate("/");
    } catch (error) {
      showError("No fue posible actualizar su usuario");
      throw new Error(error);
    }
  };
  return (
    <Formik
      initialValues={userEdit}
      validationSchema={formSchema}
      onSubmit={async (values) => {
        await editUser(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex h-full">
          <div className="mr-4 w-[300px] p-4 ">
            <div className="h-[200px] w-[200px] mx-auto">
              <img
                className="w-full h-full object-contain rounded-2xl"
                src={values.picture}
                alt={values.nickname ? values.nickname : values.given_name}
              />
            </div>

          <br />
            <div class="relative flex justify-center items-center">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  id="image"
                  name="image"
                  class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={(event) =>
                    handleImageChange(event, setFieldValue, values)
                  }
                />
                <label
                  for="image"
                  class="cursor-pointer bg-blue-500 text-white p-2 rounded-md"
                >
                  Seleccionar Imagen
                </label>
              </div>
            

            <ErrorMessage
              name="picture"
              component="div"
              className="text-sm text-red-600"
            />
          </div>

          <div className="flex-1 h-full flex flex-col gap-4">
            <div>
              <Input
                isReadOnly
                type="email"
                labelPlacement="outside"
                label="Email"
                variant="faded"
                defaultValue={email}
              ></Input>
            </div>
            <div>
              <label
                htmlFor="given_name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <Field
                className="p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="given_name"
                type="text"
              />
              <ErrorMessage
                name=" given_name"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700"
              >
                Apodo
              </label>
              <Field
                className="p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="nickname"
                type="text"
              />
              <ErrorMessage
                name="nickname"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Pais
              </label>
              <Field
                className="p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="country"
                type="text"
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
            <div className="flex items-center justify-center">
              <Button type="submit" color="primary">
                Guardar
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserEdit;

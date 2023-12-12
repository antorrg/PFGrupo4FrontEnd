import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { showSuccess, showError } from "../../utils/Notifications";
import { useDispatch } from "react-redux";
import { limpiarLogin } from "../../redux/actions";
import { useNavigate } from "react-router-dom";



const UserEdit = ({ onClose }) => {
  const user = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { country, given_name, nickname, picture, email, id, role , enable} = user;
 
  let userEdit = { country, given_name, nickname, picture ,role, enable};

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
       showSuccess("Imagen cargada")
        setFieldValue("picture", response.data.url);
      } catch (error) {
        showError("No fue posible cargar la imagen")
      }
    }
  };

  const editUser = async (values) => {
    try {
      const response = await axios.put(`/put/user/${id}`, values);
      showSuccess("Usuario actualizado");
      dispatch(limpiarLogin());
      navigate("/");
    } catch (error) {
      showError("No fue posible actualizar su usuario")
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
        <Form>
          <h1> {email} </h1>

          <hr />
          <br />
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
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Pais
            </label>
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="country"
              type="text"
            />
            <ErrorMessage
              name="country"
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
              className="  mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(event) =>
                handleImageChange(event, setFieldValue, values)
              }
            />
            <div className="w-[300px] h-[200px]"> 
              <img className="rounded-3xl w-full h-full object-contain" src={values.picture} alt="" />
            </div>

            <ErrorMessage
              name="picture"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="flex items-center justify-center">
            <Button type="submit" color="primary">
              Editar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserEdit;

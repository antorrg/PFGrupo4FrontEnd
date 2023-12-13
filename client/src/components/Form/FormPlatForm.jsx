import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import { getPlatforms } from "../../redux/actions";
import { showInfo, showError, showSuccess } from "../../utils/Notifications";
import setAuthHeader from '../../utils/AxiosUtils'


const FormPlatForm = ({ props, onClose }) => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms).map((p) => p.name);

  // console.log(platforms);
   const token =localStorage.getItem('validToken')
  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  const platform = {
    name: "",
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Campo obligatorio")
      .min(2, "Minimo dos caracteres")
      .test("Plataforma repetida", "La plataforma ya existe", (value) => {
        let upperCaseValue = value.toUpperCase();
        return !platforms.some((platform) => platform.toUpperCase() === upperCaseValue);
      }),
  });


  const postPlatform = async (value) => {
     const token =localStorage.getItem('validToken')

    try {
      await axios.post("/post/platform/", value, setAuthHeader(token));
      showSuccess(`Plataforma ${value.name} agregada`);
      dispatch(getPlatforms());
    } catch (error) {
      // console.log(error.response.data.error);
      showError(`${error.response.data.error}`);
    }
  };



  const putPlatform = async (values, props) => {
   


    try {
      const { data } = await axios.put(`/put/platform/${props.id}`, values, setAuthHeader(token));
      dispatch(getPlatforms());
      showSuccess(`Plataforma ${values.name} actualizada`);
      onClose();
    } catch (error) {
      showError(`${error.response.data.error}`);
    }
  };

  let valuesEdit = {};

  if (props) {
    valuesEdit = {
      name: props.name,
    };
  }

  return (
    <Formik
      initialValues={props ? valuesEdit : platform}
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm }) => {
        if (!props) {
          postPlatform(values);
          resetForm();
        } else {
          await putPlatform(values, props);
        }
      }}>
      {({ errors }) => (
        <Form className="p-2">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-white">
              Agregar Plataforma
            </label>
            <div className="flex items-center gap-2 mt-2">
              <Field
                className={` p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? "border-red-500" : ""}`}
                name="name"
                placeholder="Ingrese Plataforma"
                type="text"
              />
              {props ? (
                <Button
                  type="submit"
                  color="primary">
                  Editar
                </Button>
              ) : (
                <Button
                  type="submit"
                  color="primary">
                  Agregar
                </Button>
              )}
            </div>
            <ErrorMessage
              name="name"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormPlatForm;

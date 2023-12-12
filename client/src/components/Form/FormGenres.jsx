import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import { getGenres } from "../../redux/actions";
import { showInfo, showError, showSuccess } from "../../utils/Notifications";
import setAuthHeader from '../../../utils/AxiosUtils.jsx'

const FormGenres = ({ props, onClose }) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres).map((g) => g.name);
  // console.log(genres);
  const token =localStorage.getItem('validToken')

  useEffect(() => {
    dispatch(getGenres(token));
  }, [dispatch]);

  const genre = {
    name: "",
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Campo obligatorio")
      .min(2, "Minimo dos caracteres")
      .test("Genero repetido", "El genero ya existe", (value) => {
        const upperCaseValue = value.toUpperCase();
        return !genres.includes(upperCaseValue);
      }),
  });

  const postGenre = async (value, token) => {
    try {
      await axios.post("/post/genre/",setAuthHeader(token), value);
      showSuccess(`Genero ${value.name} agregado`);
      dispatch(getGenres(token));
    } catch (error) {
      // console.log(error.response.data.error);
      showError(`${error.response.data.error}`);
    }
  };

  const putGenre = async (values,token, props) => {
    try {
      const { data } = await axios.put(`/put/genre/${props.id}`,setAuthHeader(token), values);
      dispatch(getGenres(token));
      showSuccess(`Genero ${values.name} actualizado`);
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
      initialValues={props ? valuesEdit : genre}
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm }) => {
        if (!props) {
          postGenre(values);
          resetForm();
        } else {
          await putGenre(values, props);
        }
      }}>
      {({ errors }) => (
        <Form className="p-2">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Agregar Genero
            </label>
            <div className="flex items-center gap-2 mt-2">
              <Field
                className={` p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.name ? "border-red-500" : ""}`}
                name="name"
                placeholder="Ingrese Genero"
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

export default FormGenres;
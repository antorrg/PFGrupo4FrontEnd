import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms } from "../../redux/actions";
import Select from "react-select";
import axios from "axios";

const Formulario = () => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
  }, [dispatch]);

  const initialValues = {
    name: "",
    image: "",
    platforms: [],
    released: "",
    price: "",
    genres: [],
    physicalGame: false,
    physicalGame: false,
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Campo Requerido")
      .min(5, `Mínimo 5 caracteres`),
    image: Yup.string()
      .url("Ingresa una URL valida")
      .required("URL Obligatoria"),
    image: Yup.string()
      .url("Ingresa una URL valida")
      .required("URL Obligatoria"),
    platforms: Yup.array()
      .min(1, "Selecciona al menos una plataforma")
      .required("Campo Requerido"),
    released: Yup.string()
      .matches(
        /^\d{4}\/\d{2}\/\d{2}$/,
        "Ingresa una fecha válida en formato AAAA/MM/DD"
      )
      .required("Este campo es requerido"),
    price: Yup.number()
      .test({
        name: "valid-number",
        message: "Formato Invalido Ej: 111.11",
        test: (value) => /^(?!0\d)\d{1,3}(\.\d{0,2})?$/.test(value),
      })
      .required("Campo Requerido"),
    genres: Yup.array()
      .min(1, "Selecciona al menos una plataforma")
      .required("Campo Requerido"),
    physicalGame: Yup.bool(),
    stock: Yup.number().min(1, `Mínimo  1 caracteres`),
    description: Yup.string()
      .min(5, `Mínimo 5 caracteres`)
      .required("Campo Requerido"),
  });
  const platformsOptions = platforms.map((platform) => ({
    value: platform.name,
    label: platform.name,
    id: platform.id,
  }));

  const genresOptions = genres.map((genre) => ({
    value: genre.name,
    label: genre.name,
    id: genre.id,
  }));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={async (values) => {
        try {
          await axios.post("/post", values);
          alert("VideoGame Create ");
        } catch (error) {
          alert(error.message);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Nombre{" "}
            </label>
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="name"
              placeholder=""
              type="text"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Descripcion{" "}
            </label>
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="description"
              placeholder=""
              type="text"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Imagen{" "}
            </label>
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="image"
              placeholder=""
              type="text"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="platforms"
              className="block text-sm font-medium text-gray-700"
            >
              Plataformas
            </label>
            <Select
              id="platforms"
              className="form-control"
              name="platforms"
              options={platformsOptions}
              isMulti
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.id
                );
                setFieldValue("genres", selectedValues);
              }}
            />
            <ErrorMessage
              name="platforms"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="released"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Fecha de Lanzamiento
            </label>
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="released"
              placeholder="AAAA-MM-DD"
              type="text"
            />
            <ErrorMessage
              name="released"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <Field
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="price"
              placeholder="111.11"
              type="number"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="genres"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Generos{" "}
            </label>
            <Select
              id="genres"
              className="form-control"
              name="genres"
              options={genresOptions}
              isMulti
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.id
                );
                setFieldValue("platforms", selectedValues);
              }}
            />
            <ErrorMessage
              name="genres"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label>
              <Field type="checkbox" name="physicalGame" />
              ¿Juego Fisico?
            </label>
            <ErrorMessage
              name=" physicalGame"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          {values.physicalGame && (
            <div className="mb-4">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock
              </label>
              <Field
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="stock"
                placeholder=""
                type="number"
              />
              <ErrorMessage
                name="stock"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          )}

          <button type="submit"> Crear Juego</button>
        </Form>
      )}
    </Formik>
  );
};

export default Formulario;

import axios from "axios";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getGenres, getPlatforms } from "../../redux/actions";
import Select from "react-select";
import Swal from "sweetalert2";

const Formulario = ({ props, handlePortal, id }) => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const games = useSelector((state) => state.allGames);

  const nameGames = games.map((game) => game.name);

  if(props){
  const editNames = nameGames.filter((name) => name !== props.name);
}
  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
    dispatch(getAllGames());
  }, [dispatch]);

  const initialValues = {
    name: "",
    image: null,
    platforms: [],
    released: "",
    price: "",
    genres: [],
    physicalGame: false,
  };

  const formSchema = Yup.object().shape({
   name: Yup.string() .required("Campo Requerido")
      .test(
        "Nombre Repetido",
        "Este nombre ya esta siendo utilizado",
        (value) => {
          return !nameGames.includes(value);
        }
      )
      .min(5, `Mínimo 5 caracteres`),
    image: Yup.mixed()
      .required("La imagen es obligatoria")
      .test("fileFormat", "Formato de archivo no válido", (value) => {
        if (!value) return true;
      }),
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
        message: "Formato Invalido Ej: 11111.11",
        test: (value) => /^[1-9]\d{0,4}(\.\d{0,2})?$/.test(value),
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
      initialValues={props ? props : initialValues}
      validationSchema={formSchema}
      onSubmit={async (values) => {
        if (!props) {
          try {
            await axios.post("/post", values);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Videojuego creado con exito !!",
              showConfirmButton: false,
              timer: 2000,
            });
          } catch (error) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${error.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else {
          try {
            await axios.put(`/games/${id}`, values);
            Swal.fire({
              position: "center",
              icon: "success",
              title: " El videojuego se ha actualizado  !!",
              showConfirmButton: false,
              timer: 2000,
            });
          } catch (error) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${error.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-full max-w-md">
            <Form
              encType="multipart/form-data"
              className="mx-auto p-6 border rounded-md bg-white shadow-md"
            >
              <div className="mb-4">
                <button onClick={handlePortal}>x</button>
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
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    console.log(file)
                    if (file) {
                      setFieldValue('image', file);
                      
                    } else {
                      setFieldValue('image', undefined);
                    }
                  }
                }
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
                  min="1"
                  placeholder="11111.11"
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

              {props ? (
                <button type="submit"> Editar Juego</button>
              ) : (
                <button type="submit"> Crear Juego</button>
              )}
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Formulario;

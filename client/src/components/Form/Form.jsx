import axios from "axios";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getGenres, getPlatforms } from "../../redux/actions";
import Select from "react-select";
import Swal from "sweetalert2";
import { Button, select } from "@nextui-org/react";

const Formulario = ({ props, onClose }) => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const games = useSelector((state) => state.allGames);
 console.log(props)
  let nameGames = games.nombres
  console.log(nameGames)

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

  if (props) {
    nameGames = nameGames.filter(name => name !== props.name);
  }
 console.log(nameGames)
  let platformsDefault = [];
  let genresDefault = [];
  if (props) {
    let gen = props.Genres;

    for (let i = 0; i < gen.length; i++) {
      const element = gen[i];
      let genFilt = genresOptions.filter(
        (obj) => obj.value.trim() === element.trim()
      );
      genresDefault.push(genFilt[0]);
    }

    let plat = props.Platforms;

    for (let i = 0; i < plat.length; i++) {
      const element = plat[i];
      let platFilt = platformsOptions.filter(
        (obj) => obj.value.trim() === element.trim()
      );
      platformsDefault.push(platFilt[0]);
    }
  }
  let valuesEdit = {};
  if (props) {
    let {
      name,
      image,
      platforms,
      released,
      price,
      genres,
      physicalGame,
      enable,
      stock,
    } = props;

    const selectedPlatforms = platformsDefault.map((option) => option.id);
    const selectedGenres = genresDefault.map((option) => option.id);
    platforms = selectedPlatforms;
    genres = selectedGenres;

    valuesEdit = {
      name,
      image,
      platforms,
      released,
      price,
      genres,
      physicalGame,
      enable,
      stock,
    };
  }

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
    dispatch(getAllGames());
  }, [dispatch]);

  const initialValues = {
    name: "",
    image: undefined,
    platforms: [],
    released: "",
    price: "",
    genres: [],
    physicalGame: false,
  };

  
 
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Campo Requerido")
      .test(
        "Nombre Repetido",
        "Este nombre ya esta siendo utilizado",
        (value) => {
          return !nameGames.includes(value);
        }
      )
      .min(5, `Mínimo 5 caracteres`),

    image: Yup.string().required("La imagen es obligatoria"),
    platforms: Yup.array()
      .min(1, "Selecciona al menos una plataforma")
      .required("Campo Requerido"),
    released: Yup.string()
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Ingresa una fecha válida en formato AAAA-MM-DD"
      )
      .required("Este campo es requerido"),
    price: Yup.number()
      .min(0, "El precio no puede ser negativo")
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
    stock: Yup.number().min(0, "El stock no puede ser negativo"),
    description: Yup.string().min(5, `Mínimo 5 caracteres`),
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
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Imagen cargada con exito",
          showConfirmButton: false,
          timer: 2000,
        });
        setFieldValue("image", response.data.url);
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

  const createVideogames = async (values) => {
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
  };

  const editVideogames = async (values, props) => {
    try {
      if (!values.physicalGame) {
        values = { ...values, stock: 0 };
      }
      const { data } = await axios.put(`/put/games/${props.id}`, values);
      Swal.fire({
        position: "center",
        icon: "success",
        title: " El videojuego se ha actualizado  !!",
        showConfirmButton: false,
        timer: 2000,
      });
      onClose();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Formik
      initialValues={props ? valuesEdit : initialValues}
      validationSchema={formSchema}
      onSubmit={async (values) => {
        if (!props) {
          createVideogames(values);
        } else {
          await editVideogames(values, props);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <div>
          <div className="w-full max-w-md">
            <Form
              encType="multipart/form-data"
              className="mx-auto p-6 border rounded-md bg-white shadow-md"
            >
              {!props && (
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
              )}

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
                  onChange={(event) =>
                    handleImageChange(event, setFieldValue, values)
                  }
                />
                <div>
                  <img className="rounded-xl" src={values.image} alt="" />
                </div>

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
                  defaultValue={platformsDefault}
                  id="platforms"
                  className="form-control"
                  name="platforms"
                  options={platformsOptions}
                  isMulti
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.id
                    );
                    setFieldValue("platforms", selectedValues);
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
                  type="text"
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
                  defaultValue={genresDefault}
                  id="genres"
                  className="form-control"
                  name="genres"
                  options={genresOptions}
                  isMulti
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (option) => option.id
                    );
                    setFieldValue("genres", selectedValues);
                  }}
                />

                <ErrorMessage
                  name="genres"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div className="mb-4">
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
                    value={values.stock}
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
                <Button type="submit" color="primary">
                  {" "}
                  Editar Juego
                </Button>
              ) : (
                <Button type="submit" color="primary">
                  {" "}
                  Crear Juego
                </Button>
              )}
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Formulario;

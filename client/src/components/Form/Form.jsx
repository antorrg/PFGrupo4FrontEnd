import axios from "axios";
import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  getGenres,
  getPlatforms,
  getGames,
} from "../../redux/actions";
import Swal from "sweetalert2";
import { Button, select } from "@nextui-org/react";
import setAuthHeader from "../../utils/AxiosUtils";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../../utils/Notifications";
import { schemaFormGames } from "./UtilsForms/schema/schema";
import Input from "./UtilsForms/Input";
import InputSelect from "./UtilsForms/InputSelect";
import InputImg from "./UtilsForms/InputImg";
import InputDate from "./UtilsForms/InputDate";

const Formulario = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const games = useSelector((state) => state.allGames);
  const token = localStorage.getItem("validToken");

  let nameGames = games.nombres;

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

  const formSchema = schemaFormGames(nameGames);

  const createVideogames = async (values) => {
    try {
      if (!values.physicalGame) {
        values = { ...values, stock: 1 };
      }
      await axios.post("/post", values, setAuthHeader(token));
      showSuccess("Videojuego creado con exito !!");
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
      onSubmit={async (values, { resetForm }) => {
        createVideogames(values);
        resetForm();
        navigate("/perfil/games");
      }}
    >
      {({ values, setFieldValue }) => (
        <div className="w-full">
          <Form
            encType="multipart/form-data"
            className="mx-auto p-6 rounded-md"
          >
            <Input name={"name"} title={"Nombre"} />

            <Input name={"description"} title={" Descripcion"} />

            <InputImg
              name={"image"}
              title={"Selecionar imagen "}
              cb={setFieldValue}
              values={values}
            />

            <InputSelect
              name={"platforms"}
              title={"Plataformas"}
              options={platformsOptions}
              cb={setFieldValue}
            />

            <InputDate
              name={"released"}
              title={"Fecha de Lanzamiento "}
              cb={setFieldValue}
            />

            <Input name={"price"} title={"Precio"} placeholder={"11111.11"} />

            <InputSelect
              name={"genres"}
              title={"Generos"}
              options={genresOptions}
              cb={setFieldValue}
            />

            <div className="mb-4">
              <label>
                <Field type="checkbox" name="physicalGame" />
                <span className="ml-2">¿Juego Fisico?</span>
              </label>
              <ErrorMessage
                name=" physicalGame"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {values.physicalGame && (
              <Input name={"stock"} title={"Stock"} />
            )}

            <Button type="submit" color="primary">
              {" "}
              Crear Juego
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Formulario;

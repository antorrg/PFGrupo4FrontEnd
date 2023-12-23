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
import { showSuccess } from "../../utils/Notifications";
import { schemaFormGames } from "./UtilsForms/schema/schema";
import Input from "./UtilsForms/Input";
import InputDate from "./UtilsForms/InputDate";
import InputImg from "./UtilsForms/InputImg";
import InputSelect from "./UtilsForms/InputSelect";

const FormGameEdit = ({ props, onClose }) => {
  const dispatch = useDispatch();
  const platformss = useSelector((state) => state.platforms);
  const genress = useSelector((state) => state.genres);
  const games = useSelector((state) => state.allGames);
  const token = localStorage.getItem("validToken");

  let nameGames = games.nombres;

  nameGames = nameGames && nameGames.filter((name) => name !== props.name);

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
    dispatch(getAllGames());
  }, [dispatch]);

  const platformsOptions = platformss.map((platform) => ({
    value: platform.name,
    label: platform.name,
    id: platform.id,
  }));
  const genresOptions = genress.map((genre) => ({
    value: genre.name,
    label: genre.name,
    id: genre.id,
  }));

  let platformsDefault = [];
  let genresDefault = [];

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
    description,
  } = props;

  const selectedPlatforms = platformsDefault.map((option) => option.id);
  const selectedGenres = genresDefault.map((option) => option.id);
  platforms = selectedPlatforms;
  genres = selectedGenres;
  if (!stock) stock = 0;

  let valuesEdit = {};

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
    description,
  };

 
  const formSchema = schemaFormGames(nameGames);

  const editVideogames = async (values, props) => {
    try {
      if (!values.physicalGame) {
        values = { ...values, stock: 1 };
      }
      const { data } = await axios.put(
        `/put/games/${props.id}`,
        values,
        setAuthHeader(token)
      );

      dispatch(
        getGames({
          page: 0,
          platforms: "",
          genres: "",
          minPrice: -1,
          maxPrice: -1,
          name: "",
        })
      );
      showSuccess(" El videojuego se ha actualizado  !!");
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
      initialValues={valuesEdit}
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm }) => {
        await editVideogames(values, props);
      }}
    >
      {({ values, setFieldValue }) => (
        <div className="w-full">
          <Form
            encType="multipart/form-data"
            className="mx-auto p-6 rounded-md"
          >
            <Input
              name={"description"}
              title={" Descripcion"}
              values={values}
            />

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
              defaul={platformsDefault}
            />

            <InputDate
              name={"released"}
              title={"Fecha de Lanzamiento"}
              cb={setFieldValue}
            />

            <Input
              name={"price"}
              title={"Precio"}
              placeholder={"11111.11"}
              values={values}
            />

            <InputSelect
              name={"genres"}
              title={"Generos"}
              options={genresOptions}
              cb={setFieldValue}
              defaul={genresDefault}
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
              <Input name={"stock"} title={"Stock"} values={values} />
            )}

            <Button type="submit" color="primary">
              {" "}
              Editar Juego
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default FormGameEdit;

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
    physicalGame: false ,
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Campo Requerido")
      .min(5, `Mínimo 5 caracteres`),
    image: Yup.string().url("Ingresa una URL valida"),
    platforms: Yup.array()
      .min(1, "Selecciona al menos una plataforma")
      .required("Campo obligatorio"),
    released: Yup.string()
    .matches(
      /^\d{4}\-\d{2}\-\d{2}$/,
      'Ingresa una fecha válida en formato YYYY-MM-DD'
      )
      .required('Este campo es requerido'),
    price: Yup.number()
      .required("Campo Requerido")
      .min(6, `Mínimo  6 caracteres`),
    genres: Yup.array()
      .min(1, "Selecciona al menos una plataforma")
      .required("Campo obligatorio"),
    physicalGame: Yup.bool(),
    stock: Yup.number()
    .min(1, `Mínimo  1 caracteres`),
    description: Yup.string()
      .required("Campo Requerido")
      .min(5, `Mínimo 5 caracteres`),
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
      onSubmit={async(values) => {
        try {
        await axios.post("/post",values)
        alert("VideoGame Create ")
      } catch (error) {
        alert(error.message)
      }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="name">Name </label>
            <Field
              className="form-control"
              name="name"
              placeholder=""
              type="text"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="field-error text-danger"
            />
          </div>
          <div>
            <label htmlFor="description">Description </label>
            <Field
              className="form-control"
              name="description"
              placeholder=""
              type="text"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="field-error text-danger"
            />
          </div>

          <div>
            <label htmlFor="image">Image </label>
            <Field
              className="form-control"
              name="image"
              placeholder=""
              type="text"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="field-error text-danger"
            />
          </div>

          <div>
            <label htmlFor="platforms">Platforms</label>
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
                console.log("Selected Options:", selectedOptions);
                console.log(values);
              }}
            />
            <ErrorMessage
              name="platforms"
              component="div"
              className="field-error text-danger"
            />
          </div>

          <div>
            <label htmlFor="released"> Released</label>
            <Field
              className="form-control"
              name="released"
              placeholder="AAAA-MM-DD"
              type="text"
            />
            <ErrorMessage
              name="released"
              component="div"
              className="field-error text-danger"
            />
          </div>

          <div>
            <label htmlFor="price"> Price</label>
            <Field
              className="form-control"
              name="price"
              placeholder=""
              type="number"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="field-error text-danger"
            />
          </div>

          <div>
            <label htmlFor="genres"> Genres</label>
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
                console.log("Selected Options:", selectedOptions);
                console.log(values);
              }}
            />
            <ErrorMessage
              name="genres"
              component="div"
              className="field-error text-danger"
            />
          </div>

          <div>
            <label>
              <Field type="checkbox" name="physicalGame" />
              ¿Juego Fisico?
            </label>
          
          <ErrorMessage name=" physicalGame" component="div" />
          </div> 

          {values.physicalGame && (
      <div>
        <label htmlFor="stock">Stock</label>
        <Field
          className="form-control"
          name="stock"
          placeholder=""
          type="number"
        />
        <ErrorMessage
          name="stock"
          component="div"
          className="field-error text-danger"
        />
      </div>
    )}
          
            <button type="submit">Enviar</button>
        </Form>
      )}
    </Formik>
  );
};

export default Formulario;

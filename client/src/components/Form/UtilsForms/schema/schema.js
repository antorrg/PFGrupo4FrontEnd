import * as Yup from "yup";

export const schemaFormGames = (nameGames ) => {
  const schema = Yup.object().shape({
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

  return schema;
};

export const schemaFormUserEdit = () => {};

export const schemaFormAdmin = () => {};

export const schemaFormRegister = () => {};

export const schemaFormPassword = () => {};
export const schemaFormLogin = () => {};

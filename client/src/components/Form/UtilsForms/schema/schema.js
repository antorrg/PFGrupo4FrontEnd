import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const passwordSchema = (Yup.string()
.min(
  8,
  "La contraseña debe contener 8 o más caracteres con al menos: una mayúscula, una minúscula, un número y un símbolo"
)
.minLowercase(1, "Debe contener al menos 1 letra minúscula")
.minUppercase(1, "Debe contener al menos 1 letra mayúscula")
.minNumbers(1, "Debe contener al menos 1 número")
.minSymbols(1, "Debe contener al menos 1 carácter especial")
.required("Campo Requerido"))
 
export const schemaFormGames = (nameGames) => {
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
    stock: Yup.number().min(0, "El stock no puede ser negativo "),
    description: Yup.string().min(5, `Mínimo 5 caracteres`),
  });

  return schema;
};

export const schemaFormUserEdit = () => {
  const schema = Yup.object().shape({
    country: Yup.string(),
    given_name: Yup.string(),
    nickname: Yup.string(),
    picture: Yup.string(),
  });

  return schema
};

export const schemaFormRegister = () => {

  const schema = Yup.object().shape({
    email: Yup.string().email("Email Inválido").required("Campo Requerido"),
    password:  passwordSchema,
    password1: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Campo Requerido"),
    given_name: Yup.string(),
    nickname: Yup.string(),
    picture: Yup.string(),
  });

  return schema
};

export const schemaFormPassword = () => {
  const schema  = Yup.object().shape({
    password: passwordSchema,
     
  });

  const schema1 = Yup.object().shape({
    passwordNew: passwordSchema,
    passwordNewRepeat: Yup.string()
      .oneOf([Yup.ref("passwordNew"), null], "Las contraseñas no coinciden")
      .required("Campo Requerido"),
  });
 return[ schema,schema1]
};

export const schemaFormLogin = () => {
  const schema = Yup.object().shape({
    email: Yup.string().email("Email Inválido").required("Campo Requerido"),
    password: passwordSchema,
  });

  return schema
};

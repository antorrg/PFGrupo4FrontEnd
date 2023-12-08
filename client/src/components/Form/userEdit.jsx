
const userEdit = () => {

const user = {
        email: "",
        password: "",
        nickname: "",
        sub: null,
        given_name: "" ,
        picture: "",
    };

const requiredField = () => Yup.string().required("Campo Requerido");

  const passwordField = () =>
    requiredField()
      .min(
        8,
        "La contraseña debe contener 8 o más caracteres con al menos: una mayúscula, una minúscula, un número y un símbolo"
      )
      .minLowercase(1, "Debe contener al menos 1 letra minúscula")
      .minUppercase(1, "Debe contener al menos 1 letra mayúscula")
      .minNumbers(1, "Debe contener al menos 1 número")
      .minSymbols(1, "Debe contener al menos 1 carácter especial");

    const formSchema = Yup.object().shape({
        email: Yup.string().email("Email Inválido").required("Campo Requerido"),
        password: passwordField(),
        nickname: Yup.string().required("Campo Requerido"),
        given_name: Yup.string().required("Campo Requerido"),
       picture: Yup.string().required("Campo Requerido"),
      });



    return(
        <Formik
        initialValues={user}
        validationSchema={formSchema}
        onSubmit={async (values) => {
          try {
         
          } catch (error) {
           
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="given_name"
                className="block text-sm font-medium text-gray-700"
              >
               Nombre
              </label>
              <Field
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="given_name"
                placeholder=""
                type="text"
              />
              <ErrorMessage
                name=" given_name"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
               Email
              </label>
              <Field
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="email"
                placeholder=""
                type="text"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
  
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
               Contraseña
              </label>
              <Field
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="password"
                placeholder=""
                type={!viewPassword ? "password" : "text"}
              />
              <button onClick={handlerPassword}>
                {" "}
                {viewPassword ? "Ocultar" : "Ver"}{" "}
              </button>
              <ErrorMessage
                name="password"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700"
              >
               Nombre de Usuario 
              </label>
              <Field
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="nickname"
                placeholder=""
                type="text"
              />
              <ErrorMessage
                name="nickname"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>


            <div className="mb-4">
              <label
                htmlFor=" picture"
                className="block text-sm font-medium text-gray-700"
              >
               Foto 
              </label>
              <Field
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name=" picture"
                placeholder=""
                type="text"
              />
              <ErrorMessage
                name="picture"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div className=" flex mx-auto" >
            <Button type="submit" color="primary">
              Ingresar
            </Button>
            <NavbarItem>
                <LoginButton />
              </NavbarItem>
              </div>
          </Form>
        )}
      </Formik>
    )
}

export default userEdit;
import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";


const  Formulario = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Campo Requerido")
      .min(5 ,`Mínimo 5 caracteres`),
    image: Yup.string()
      .min(5, `Mínimo 5 caracteres`)
      .max(25, `Máximo 25 caracteres`)
      .required("Campo Requerido"),
    plataforms: Yup.string()
      .required("Campo Requerido")
      .min(5, `Mínimo 5 caracteres`),
    released: Yup.date()
      .required("Campo Requerido"),
    price: Yup.date()
      .required("Campo Requerido")
      .min(8, `Mínimo  8 caracteres`),
    genres: Yup.string()
      .required("Campo Requerido")
      .min(8, `Mínimo  8 caracteres`),
  });

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          image: "",
          plataforms: "",
          released: "",
          price: "",
          genres: "",
        }}
        validationSchema={formSchema}
        onSubmit={() => console.log("hola")}
      >
        <Form>
            <div>
            <label htmlFor='name'>Name </label>
            <Field
              className='form-control'
              name='name'
              placeholder=''
              type='text'
            />
            <ErrorMessage
              name='name'
              component='div'
              className='field-error text-danger'
            />
          </div>
          <div>
            <label htmlFor='image'>Image </label>
            <Field
              className='form-control'
              name='image'
              placeholder=''
              type='text'
            />
            <ErrorMessage
              name='image'
              component='div'
              className='field-error text-danger'
            />
            </div>
         <div>
            <label htmlFor='plataforms'>Plataforms </label>
            <Field
              className='form-control'
              name='plataforms'
              placeholder=''
              type='text'
            />
            <ErrorMessage
              name='plataforms'
              component='div'
              className='field-error text-danger'
            />
            </div>

            <div>
            <label htmlFor='released'> Released</label>
            <Field
              className='form-control'
              name='released'
              placeholder=''
              type='number'
            />
            <ErrorMessage
              name='released'
              component='div'
              className='field-error text-danger'
            />
          </div>

          <div>
            <label htmlFor='price'> Price</label>
            <Field
              className='form-control'
              name='price'
              placeholder=''
              type='number'
            />
            <ErrorMessage
              name='price'
              component='div'
              className='field-error text-danger'
            />
          </div>

          <div>
            <label htmlFor='price'> Genres</label>
            <Field
              className='form-control'
              name='genres'
              placeholder=''
              type='text'
            />
            <ErrorMessage
              name='genres'
              component='div'
              className='field-error text-danger'
            />
          </div>

            <button type='submit'>
                Enviar
             </button>
          </Form>
      </Formik>
    </>
  );
}

export default Formulario



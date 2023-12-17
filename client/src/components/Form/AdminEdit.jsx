import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { showSuccess, showError } from "../../utils/Notifications";
import { useDispatch } from "react-redux";
import setAuthHeader from "../../utils/AxiosUtils";
import Select from "react-select";
import { getAllUsers } from "../../redux/actions";

const AdminEdit = ({ onClose, user }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("validToken");

  const { country, given_name, nickname, picture, email, id, role, enable } =
    user;
    
    const formSchema = Yup.object().shape({
        role: Yup.number()
        .required("Campo Requerido"),
        enable: Yup.boolean()
       .required("Campo Requerido"),
  });

  const enableOptions = [
    {
      label: "Habilitado",
      value: true,
    },
    {
        label: "Deshabilitado",
        value: false,
    },
  ];
  
  const roleOptions = [
      {
      label: "Usuario",
      value: 1,
    },
    {
        label: "Administrador",
        value: 0,
    },
  ];
  
  
  const enableDefault = enableOptions.filter((obj) => obj.value === enable);
  const roleDefault = roleOptions.filter((obj) => obj.value === role);
  
  let userEdit = { country, given_name, nickname, picture, role, enable };
  
 if (userEdit.country === null) userEdit = { ...userEdit, country: "" };
 
  const editUser = async (values) => {
    try {
        console.log(values)
      const { data } = await axios.put(
           `/put/user/${id}`,
        values,
         setAuthHeader(token)
        );
        dispatch(getAllUsers());
    onClose()
      showSuccess(`${email} actualizado correctamente `);
    } catch (error) {
        showError("No fue posible actualizar elusuario");
        throw new Error(error);
    }
};
return (
    <Formik
      initialValues={userEdit}
      validationSchema={formSchema}
      onSubmit={async (values) => {
        await editUser(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex h-full">
          <div className="mr-4 w-[300px] p-4 ">
            <div>
              <label
                htmlFor="enable"
                className="block text-sm font-medium text-gray-700"
              >
                Estado
              </label>
              <Select
                defaultValue={enableDefault}
                id="enable"
                className="form-control"
                name="enable"
                options={enableOptions}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.value
                  setFieldValue("enable", selectedValues);
                }}
              />
              <ErrorMessage
                name="enable"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
            <br/>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Rol
              </label>
              <Select
                defaultValue={roleDefault}
                id="role"
                className="form-control"
                name="role"
                options={roleOptions}
                
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.value
                  setFieldValue("role", selectedValues);
                }}
              />
              <ErrorMessage
                name="role"
                component="div"
                className="text-sm text-red-600"
              />
            </div>
            <br/>
            <br/>

            <div className="flex items-center justify-center">
              <Button type="submit" color="primary">
                Editar
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AdminEdit;

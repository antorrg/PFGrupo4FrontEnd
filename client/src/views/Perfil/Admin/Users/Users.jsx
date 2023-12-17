import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/actions";
import Swal from "sweetalert2";
import { showSuccess, showError, showInfo } from "../../../../utils/Notifications";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { EyeIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Modal from "../../../../Modal/Modal";
import AdminEdit from "../../../../components/Form/AdminEdit"
import setAuthHeader from "../../../../utils/AxiosUtils";
import axios from "axios";
import UserDetail from "./UserDetail";

const columns = [{ name: "USUARIO" },{name:"NOMBRE"},{name:"APODO"}, { name: "ESTADO" }, { name: "ROL" }, { name: "ACCIONES" }];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const Users = () => {

  const token = localStorage.getItem("validToken");
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers.users);
  

   console.log("todos los usaurios", allUsers);

   
   

  useEffect(() => {

    dispatch(getAllUsers());
  }, [dispatch]);

  const handlerDelete = async (id, user) => {
    const userConfirmation = await Swal.fire({
      title: `¿Estás seguro de eliminar ${user.email}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (userConfirmation.isConfirmed) {
      try {
        const response = await axios.delete(
          `/delete/user/${id}`,
          setAuthHeader(token)
        );
        console.log(response)
        const { data } = response;
        if (response.status === 200) {
          showSuccess(response.data.message);
          dispatch(getAllUsers());
        } else {
          showError(`Error al eliminar ${user.email}`);
        }
      } catch (error) {
        showError(`${error.message}`);
      }
    } else {
      showInfo(`Se canceló la eliminación de ${user.email}`);
    }
  };

  return (
    <Table
      aria-label="games admin table"
      classNames={{
        base: "",
        table: "dark:bg-secondary min-h-[600px]",
        wrapper: "dark:bg-secondary",
        thead: "",
        tbody: "",
        tr: "",
        th: "dark:bg-[#0B0120]",
        td: "",
        tfoot: "",
        sortIcon: "",
        emptyWrapper: "dark:text-white",
      }}>
      <TableHeader>
        {columns.map((column) => {
          return <TableColumn>{column.name}</TableColumn>;
        })}
      </TableHeader>
      <TableBody emptyContent={"Aun no hay usuarios registrados."}>
        {allUsers &&
          allUsers?.map((user, index) => {
            return (
              <TableRow key={`${user}-row-${index}`}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: user.picture }}
                    description={user.email}
                    name={user.email}
                  />
                </TableCell>
                <TableCell>{user.given_name ? `${user.given_name}` : "-"}</TableCell>
                <TableCell>{user.nickname ? `${user.nickname}` : "-"}</TableCell>
                <TableCell>{user.enable ? "Habilitado" : "Deshabilitado"}</TableCell>
                <TableCell>{user.role === 0 ? "Administrador" : "Usuario"} </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                     <Tooltip content="Editar">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Modal
                      textButton="Editar Perfil"
                      title={`Actualizar ${user.email}`}
                      body={({ onClose }) => (
                        < AdminEdit
                          user={user}
                          onClose={onClose}
                        />
                      )}
                      openButton={
                        <PencilSquareIcon className="text-black w-4" />
                      }
                    />
                  </span>
                </Tooltip> 
                     <Tooltip content="Detalle">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <Modal
                        textButton="Detalle"

                        body={({ onClose }) => (
                           <UserDetail
                            user={user}
                          onClose={onClose}
                         />
                        )}
                        openButton={
                          <EyeIcon className="text-black w-4" />
                        }
                      />
                      </span>
                    </Tooltip>
                    <Tooltip
                      color="danger"
                      content="Eliminar">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                         onClick={() => handlerDelete(user.id, user)}
                      >
                        <TrashIcon className="text-black w-4" />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default Users;

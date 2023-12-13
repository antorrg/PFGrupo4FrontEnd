import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/actions";
import Swal from "sweetalert2";
import {
  showSuccess,
  showError,
  showInfo,
} from "../../../../utils/Notifications";
import setAuthHeader from "../../../../utils/AxiosUtils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import {
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const columns = [
  { name: "GAME" },
  { name: "CANTIDAD" },
  { name: "PRICE" },
  { name: "ACCIONES" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const Users = () => {
  const dispatch = useDispatch();
const allUsers = useSelector((state)=> state.allUsers)
const {users} = allUsers
console.log(allUsers)
  


useEffect(()=>{
 dispatch(getAllUsers())
  },[dispatch]);

  return ( 
    <div>lista de usuarios</div>
  
  // <Table
  //   aria-label="games admin table"
  //   classNames={{
  //     base: "",
  //     table: "dark:bg-secondary min-h-[600px]",
  //     wrapper: "dark:bg-secondary",
  //     thead: "",
  //     tbody: "",
  //     tr: "",
  //     th: "dark:bg-[#0B0120]",
  //     td: "",
  //     tfoot: "",
  //     sortIcon: "",
  //     emptyWrapper: "dark:text-white",
  //   }}
  // >
  //   <TableHeader>
  //     {columns.map((column) => {
  //       return <TableColumn>{column.name}</TableColumn>;
  //     })}
  //   </TableHeader>
  //   <TableBody emptyContent={"Nada para mostrar."}>
  //     {users.map((user, index) => {
  //       return (
  //         <TableRow key={`${user}-row-${index}`}>
  //           <TableCell>
  //             <User
  //               avatarProps={{ radius: "lg", src: user.picture }}
  //               description={user.email}
  //               name={user.email}
  //             />
  //           </TableCell>
  //           <TableCell>
  //             {/*game.physicalGame ? game.stock : "Digital"*/}
  //           </TableCell>
  //           <TableCell></TableCell>
  //           <TableCell>
  //             <div className="relative flex items-center gap-2">
  //               {/* <Tooltip content="Editar">
  //                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //                   <Modal
  //                     textButton="Editar Juego"
  //                     title="Actualizar Juego"
  //                     body={({ onClose }) => (
  //                       <Formulario
  //                         props={game}
  //                         id={game.id}
  //                         onClose={onClose}
  //                       />
  //                     )}
  //                     openButton={
  //                       <PencilSquareIcon className="text-black w-4" />
  //                     }
  //                   />
  //                 </span>
  //               </Tooltip> */}
  //               <Tooltip content="Detalle">
  //                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //                   <EyeIcon className="text-black w-4" />
  //                 </span>
  //               </Tooltip>
  //               <Tooltip color="danger" content="Eliminar">
  //                 <span
  //                   className="text-lg text-danger cursor-pointer active:opacity-50"
  //                    onClick={() => handlerDelete(user.id, user)}
  //                 >
  //                   <TrashIcon className="text-black w-4" />
  //                 </span>
  //               </Tooltip>
  //             </div>
  //           </TableCell>
  //         </TableRow>
  //       );
  //     })}
  //   </TableBody>
  // </Table>
);
};

export default Users;

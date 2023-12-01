import axios from "axios";
import Modal from "../../../Modal/Modal";
import Swal from "sweetalert2";
import Formulario from "../../../components/Form/Form";
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

const GamesTable = ({ videogames }) => {


 
  const handlerDelete =async (id, game) => {
    try {
      const {data} = await axios.delete(`delete/games/${id}`)
      console.log(data);
      console.log()
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${game.name}`,
        text: `${data.message}`,
        showConfirmButton: true,
        
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        {columns.map((column) => {
          return <TableColumn>{column.name}</TableColumn>;
        })}
      </TableHeader>
      <TableBody>
        {videogames.map((game) => {
          console.log(game)
          return (
            <TableRow key="1">
              <TableCell>
                <User
                  avatarProps={{ radius: "lg", src: game.image }}
                  description={game.name}
                  name={game.name}
                />
              </TableCell>
              <TableCell>
                {game.physicalGame ? game.stock : "Digital"}
              </TableCell>
              <TableCell>${game.price}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Modal
                        textButton="Editar Juego"
                        title="Actualizar Juego"
                        body={({ onClose }) => (
                          <Formulario props={game} id={game.id} onClose={onClose} />
                        )}
                        openButton={
                          <PencilSquareIcon className="text-black w-4" />
                        }
                      />
                    </span>
                  </Tooltip>
                  <Tooltip content="Detalle">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon className="text-black w-4" />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Eliminar">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => handlerDelete(game.id, game)}
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

export default GamesTable;

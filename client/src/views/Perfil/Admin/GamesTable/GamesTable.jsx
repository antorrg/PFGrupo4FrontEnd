import axios from "axios";
import Modal from "../../../../Modal/Modal";
import Swal from "sweetalert2";
import Formulario from "../../../../components/Form/Form";
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
import { useDispatch } from "react-redux";
import { getGames } from "../../../../redux/actions";
import { Link } from "react-router-dom";

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

const GamesTable = ({ videogames ,filters}) => {

  const dispatch = useDispatch()
  const token = localStorage.getItem("validToken");

  

  const handlerDelete = async (id, game) => {
    const userConfirmation = await Swal.fire({
      title: `¿Estás seguro de eliminar ${game.name}?`,
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
          `/delete/games/${id}`,
          setAuthHeader(token)
        );
        const { data } = response;
        if (response.status === 200) {
          showSuccess(`${game.name} eliminado`);
          dispatch(getGames(filters));
        } else {
          showError(`Error al eliminar ${game.name}`);
        }
      } catch (error) {
        showError(`${error.response.data.error}`);
      }
    } else {
      showInfo(`Se canceló la eliminación de ${game.name}`);
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
      }}
    >
      <TableHeader>
        {columns.map((column) => {
          return <TableColumn>{column.name}</TableColumn>;
        })}
      </TableHeader>
      <TableBody emptyContent={"Nada para mostrar."}>
        {videogames.map((game, index) => {
          return (
            <TableRow key={`${game}-row-${index}`}>
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
                          <Formulario
                            props={game}
                            id={game.id}
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
                    <Link to={`/detail/${game.id}`}>
                      <EyeIcon className="text-black w-4" />
                    </Link>
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

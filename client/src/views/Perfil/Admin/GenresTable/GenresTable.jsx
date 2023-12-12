import axios from "axios";
import Modal from "../../../../Modal/Modal";
import Swal from "sweetalert2";
import { getGenres } from "../../../../redux/actions";
import FormGenres from "../../../../components/Form/FormGenres";
import { showSuccess, showError, showInfo } from "../../../../utils/Notifications";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Tooltip } from "@nextui-org/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const columns = [{ name: "GENERO" }, { name: "ACCIONES" }];

const GenresTable = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  // console.log(genres);
  const token = localStorage.getItem('validToken');

  const handlerDelete = async (id, genre) => {
    const userConfirmation = await Swal.fire({
      title: `¿Estás seguro de eliminar el genero ${genre.name}?`,
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
        const response = await axios.delete(`/delete/genres/${id}`);
        const { data } = response;

        if (response.status === 200) {
          console.log(data.message);
          showSuccess(`Genero ${genre.name} eliminado`);
          dispatch(getGenres());
        } else {
          showError(`Error al eliminar el genero ${genre.name}`);
        }
      } catch (error) {
        showError(`${error.response.data.error}`);
      }
    } else {
      showInfo(`Se canceló la eliminación de el genero`);
    }
  };

  useEffect(() => {
    dispatch(getGenres(token));
  }, [dispatch]);

  return (
    <Table aria-label="genre admin table">
      <TableHeader>
        {columns.map((column, index) => (
          <TableColumn key={index}>{column.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {genres.map((genre, index) => {
          return (
            <TableRow key={`${genre}-row-${index}`}>
              <TableCell>
                <User name={genre.name} />
              </TableCell>

              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <Modal
                        textButton="Editar Genero"
                        title="Actualizar Genero"
                        body={({ onClose }) => (
                          <FormGenres
                            props={genre}
                            id={genre.id}
                            onClose={onClose}
                          />
                        )}
                        openButton={<PencilSquareIcon className="text-black w-4" />}
                      />
                    </span>
                  </Tooltip>

                  <Tooltip
                    color="danger"
                    content="Eliminar">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => handlerDelete(genre.id, genre)}>
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

export default GenresTable;

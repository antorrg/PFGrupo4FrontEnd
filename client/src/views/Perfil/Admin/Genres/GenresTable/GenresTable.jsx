import Modal from "../../../../../Modal/Modal";
import { getGenres } from "../../../../../redux/actions";
import FormGenres from "../../../../../components/Form/FormGenres";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Tooltip } from "@nextui-org/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import handleDeleteConfirmation from "../../../../../utils/handlerDeleteConfimartion";

const columns = [{ name: "GENERO" }, { name: "ACCIONES" }];

const GenresTable = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const handlerDelete = async (id, genre) => {
    await handleDeleteConfirmation(id, `${genre.name}`, "genres");
    dispatch(getGenres());
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <Table
      aria-label="genre admin table"
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

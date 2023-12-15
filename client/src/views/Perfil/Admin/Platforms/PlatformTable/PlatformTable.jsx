import Modal from "../../../../../Modal/Modal.jsx";
import { getPlatforms } from "../../../../../redux/actions.js";
import FormPlatForm from "../../../../../components/Form/FormPlatForm.jsx";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Tooltip } from "@nextui-org/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import handleDeleteConformation from "../../../../../utils/handlerDeleteConfimartion.js";
const columns = [{ name: "PLATAFORMA" }, { name: "ACCIONES" }];

const PlatformTable = () => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);

  const handlerDelete = async (id, platform) => {
    await handleDeleteConformation(id, `${platform.name}`, "platforms");
    dispatch(getPlatforms());
  };

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  return (
    <Table
      aria-label="platform admin table"
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
        {platforms.map((platform, index) => {
          return (
            <TableRow key={`${platform}-row-${index}`}>
              <TableCell>
                <User name={platform.name} />
              </TableCell>

              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Editar">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <Modal
                        textButton="Editar Plataforma"
                        title="Actualizar Plataforma"
                        body={({ onClose }) => (
                          <FormPlatForm
                            props={platform}
                            id={platform.id}
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
                      onClick={() => handlerDelete(platform.id, platform)}>
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

export default PlatformTable;

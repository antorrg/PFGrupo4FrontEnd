import axios from "axios";
import Modal from "../../../../../Modal/Modal.jsx";
import Swal from "sweetalert2";
import { getPlatforms } from "../../../../../redux/actions.js";
import FormPlatForm from "../../../../../components/Form/FormPlatForm.jsx";
import {
  showSuccess,
  showError,
  showInfo,
} from "../../../../../utils/Notifications.js";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
} from "@nextui-org/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import setAuthHeader from "../../../../utils/AxiosUtils";

const columns = [{ name: "PLATAFORMA" }, { name: "ACCIONES" }];

const PlatformTable = () => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);
  // console.log(platforms);
  const token = localStorage.getItem("validToken");

  const handlerDelete = async (id, platform) => {
    const userConfirmation = await Swal.fire({
      title: `¿Estás seguro de eliminar la plataforma ${platform.name}?`,
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
        const response = await axios.delete(`/delete/platforms/${id}`, setAuthHeader(token));
        const { data } = response;

        if (response.status === 200) {
          console.log(data.message);
          showSuccess(`Plataforma ${platform.name} eliminada`);
          dispatch(getPlatforms());
        } else {
          showError(`Error al eliminar la plataforma ${platform.name}`);
        }
      } catch (error) {
        showError(`${error.response.data.error}`);
      }
    } else {
      showInfo(`Se canceló la eliminación de la plataforma`);
    }
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
      }}
    >
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
                        openButton={
                          <PencilSquareIcon className="text-black w-4" />
                        }
                      />
                    </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Eliminar">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => handlerDelete(platform.id, platform)}
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

export default PlatformTable;

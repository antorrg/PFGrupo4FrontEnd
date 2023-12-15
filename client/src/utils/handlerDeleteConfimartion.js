import Swal from "sweetalert2";
import axios from "axios";
import { showError, showInfo, showSuccess } from "./Notifications";
import setAuthHeader from "../utils/AxiosUtils";
const token = localStorage.getItem("validToken");

const handleDeleteConfirmation = async (id, itemName, deleteEndpoint) => {
  const userConfirmation = await Swal.fire({
    title: `¿Estás seguro de eliminar ${itemName}?`,
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
      const response = await axios.delete(`/delete/${deleteEndpoint}/${id}`, setAuthHeader(token));
      const { data } = response;

      if (response.status === 200) {
        showSuccess(`${itemName} eliminado`);
        // dispatchFunction();
      } else {
        showError(`Error al eliminar ${itemName}`);
      }
    } catch (error) {
      showError(`${error.response.data.error}`);
    }
  } else {
    showInfo(`Se canceló la eliminación de ${itemName}`);
  }
};

export default handleDeleteConfirmation;

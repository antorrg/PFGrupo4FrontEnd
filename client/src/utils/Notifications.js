import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccess = (mensaje) => {
  toast.success(mensaje, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};

export const showError = (mensaje) => {
  toast.error(mensaje, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};
export const showInfo = (mensaje) => {
  toast.info(mensaje, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};
export const showWarn = (mensaje) => {
  toast.warn(mensaje, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};

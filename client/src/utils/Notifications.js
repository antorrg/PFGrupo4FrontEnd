import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccess = (mensaje) => {
  toast.success(mensaje, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    // className: 'mi-toast-personalizado',
  });
};

export const showError = (mensaje) => {
  toast.error(mensaje, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    // className: 'mi-toast-personalizado',
  });
};
export const showInfo = (mensaje) => {
  toast.info(mensaje, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    // className: 'mi-toast-personalizado',
  });
};
export const showWarn = (mensaje) => {
  toast.warn(mensaje, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    // className: 'mi-toast-personalizado',
  });
};

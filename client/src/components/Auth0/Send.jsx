import axios from "axios";
import Swal from "sweetalert2";
import { showSuccess, showError } from "../../utils/Notifications";

//console.log(userData);

const enviarInfoAlServer = async (userData) => {
  const email = userData.email;
  const password = userData.password ?? null;
  const nickname = userData.nickname ?? null;
  const given_name = userData.given_name ?? null;
  const picture = userData.picture ?? null;
  const sub = userData.sub ?? null;

  try {
    let response;
    if (userData.isLogin) {
      response = await axios.post("/post/user/login", {
        email,
        password,
        sub,
      });
      // Swal.fire({
      //   position: "top-end",
      //   icon: "success",
      //   title: "Usuario logeado",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      showSuccess("Usuario logueado con exito");
    } else {
      response = await axios.post("/post/user", {
        email,
        password,
        nickname,
        given_name,
        picture,
        sub,
      });
      // Swal.fire({
      //   position: "top-end",
      //   icon: "success",
      //   title: "Usuario logueado con exito",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      showSuccess("Usuario logueado con exito");
    }
    if (response.status === 201) {
      // Accede al encabezado Authorization para obtener el token
      const token = response.data.token;
      localStorage.setItem('validToken', token);

      // console.log("Token recibido:", token);
      // if (response.data) {

      const user = { ...response.data.result.user, token };

      return user;
    }
  } catch (error) {
    // Swal.fire({
    //   position: "top-end",
    //   icon: "error",
    //   title: `${error.response.data.error}`,
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    showError(`${error.response.data.error}`);
  }
};

const userLog = async (userData) => {
  try {
    const response = await enviarInfoAlServer(userData);
    return response;
  } catch (error) {
    //console.error("Error en userLog:", error);
    throw error; // Puedes manejar el error aquí según tus necesidades
  }
};

export default userLog;

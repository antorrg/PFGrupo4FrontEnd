import axios from "axios";
import Swal from "sweetalert2";


//console.log(userData);

const enviarInfoAlServer = async (userData) => {
  console.log(userData);

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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario logeado",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      response = await axios.post("/post/user", {
        email,
        password,
        nickname,
        given_name,
        picture,
        sub,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario creado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (response.status === 201) {
      // Accede al encabezado Authorization para obtener el token
      const token = response.data.token;

      console.log("Token recibido:", token);
      // if (response.data) {
      console.log(response.data.result.user);
      const user = { ...response.data.result.user, token };
      console.log(user);
      return user;
    }
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: `${error.response.data.error}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const userLog = async (userData) => {
<<<<<<< HEAD
  const response = await enviarInfoAlServer(userData);
  return response;
=======
  try {
    const response = await enviarInfoAlServer(userData);
    return response.result.user;
  } catch (error) {
    //console.error("Error en userLog:", error);
    throw error; // Puedes manejar el error aquí según tus necesidades
  }
>>>>>>> fe6e47cac3f38e18b65e0fa1c4efd77daa689aa6
};

export default userLog;

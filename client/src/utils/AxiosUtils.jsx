
const setAuthHeader = (token) => {
  //const token = localStorage.getItem('authToken');
  const config = {};

  if (token) {
    config.headers = {
      'x-access-token':`${token}`
    };
  }

  return config;
};



// // errorHandler.js
// const handleApiError = (error) => {
//     if (error.response) {
//       const status = error.response.status;
//       const data = error.response.data;
  
//       if (status === 401) {
//         // Acceso no autorizado
//         alert('Acceso no autorizado. Debes iniciar sesión.');
//       } else if (status === 404) {
//         // Recurso no encontrado
//         alert('Detalle del usuario no encontrado.');
//       } else if (status === 403){
//         alert('Prohibido, no tiene permisos para esta accion.');
//       }else {
//         // Otro error del servidor
//         alert(`Error del servidor: ${status}`, data);
//         //alert('Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.');
//       }
//     } else if (error.request) {
//       // La solicitud fue realizada pero no se recibió respuesta
//      alert('No se recibió respuesta del servidor.');
//       //alert('No se recibió respuesta del servidor. Por favor, inténtalo de nuevo más tarde.');
//      } //else {
//     //   // Error durante la configuración de la solicitud
//     //   console.error('Error durante la configuración de la solicitud:', error.message);
//     //   alert('Ocurrió un error durante la configuración de la solicitud. Por favor, inténtalo de nuevo.');
//     // }
//   };
  
  export default setAuthHeader
   ;
 
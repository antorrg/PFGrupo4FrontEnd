import axios from 'axios';
//import { useAuth0 } from "@auth0/auth0-react";

const redirectToLogin =  (logout) => {
  // Lógica para redirigir al usuario al inicio de sesión
  console.log('Console.log: Token expirado. Redirigiendo al inicio de sesión...');
   setTimeout(()=>{
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.clear(); //Esto en caso de que auth0 u otro servicio no limpie el storage
    window.location.reload(true);
   },2000)
    
};

const interceptor = (logout) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401 || error.response && error.response.status === 403) {
        // Acceso no autorizado, redirigir al inicio de sesión
        redirectToLogin(logout);
      }
      return Promise.reject(error);
    }
  );
};

export default interceptor;


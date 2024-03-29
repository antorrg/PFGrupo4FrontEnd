
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

  
  export default setAuthHeader
   ;
 
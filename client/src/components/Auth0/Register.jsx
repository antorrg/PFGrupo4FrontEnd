import axios from 'axios';



const Register = async (userData) => {
    console.log(userData);
    
    
        const email = userData.email;
        const nickname = userData.nickname;
        const given_name = userData.given_name ?? null;
        const picture = userData.picture;
        const sub = userData.sub;
    
    
      try {
        const response = await axios.post('http://localhost:3001/log/login',{
            email,
            nickname,
            given_name,
            picture,
            sub,
          });
    
          if (response.status === 201) {
            // Accede al encabezado Authorization para obtener el token
            const token = response.headers['authorization'];
      
            console.log('Token recibido:', token);
        // if (response.data) {
            console.log(response.data.user)
            return response.data.user;
        
        } else {
           alert('Error al autenticar/crear usuario');
        }
    
    } catch (error) {
        alert('Error al enviar la solicitud al servidor', error);
    }
    
    
}


export default Register;
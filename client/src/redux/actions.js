export const GET_GAMES = "GET_GAMES";
const RUTA_GET_GAMES = "";
const img = "https://img.freepik.com/foto-gratis/equipo-videojuegos-futurista-iluminado-ia-generativa-discoteca_188544-32105.jpg?w=1060&t=st=1700187390~exp=1700187990~hmac=303a782686b59a7917f398a1826be577525a7d34d523a8061d461b4b5f18b3b6"
let data = [
{
  id: "1",
  name: "game 1 ",
  plataform: "PS4",
  image: img, 
  price: "$1000"
},
{
  id: "2",
    name: "game 2 ",
    plataform: "PS4",
    image: img, 
    price: "$1000"
  },
  {
    id: "3",
    name: "game 3 ",
    plataform: "PS4",
    image: img, 
    price: "$1000"
  },
  {
    id: "4",
    name: "game 4 ",
    plataform: "PS4",
    image: img, 
    price: "$1000"
  },
  {
    id: "5",
    name: "game 5 ",
    plataform: "PS4",
    image: img, 
    price: "$1000"
  },
  {
    id: "6",
    name: "game 6 ",
    plataform: "PS4",
    image: img, 
    price: "$1000"
  },
  {
    id: "7",
      name: "game 7 ",
      plataform: "PS4",
      image: img, 
      price: "$1000"
    },
    {
      id: "8",
      name: "game 8 ",
      plataform: "PS4",
      image: img, 
      price: "$1000"
    },
    {
      id: "9",
      name: "game 9 ",
      plataform: "PS4",
      image: img, 
      price: "$1000"
    }
]



export const getGames = () => {
  return async (dispatch) => {
    try {
      /*const { data } = await axios(RUTA_GET_GAMES);*/
      return dispatch({
        type: GET_GAMES,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

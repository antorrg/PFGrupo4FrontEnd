const RUTA_GET_GAMES = "http://localhost:3001/games";
const RUTA_GET_PAGE = "";
import axios from "axios";
export const GET_GAMES = "GET_GAMES";
export const GET_PAGE = "GET_PAGE";

export const getGames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(RUTA_GET_GAMES);
      console.log(data)
      return dispatch({
        type: GET_GAMES,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
};



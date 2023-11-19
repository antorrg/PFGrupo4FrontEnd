
import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAR_DETAILS = "CLEAR_DETAILS";

export const getGames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/games");
      return dispatch({
        type: GET_GAMES,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const getDetails = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/games/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS,
  };
};

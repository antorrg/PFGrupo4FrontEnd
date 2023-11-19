import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_GENRES = "GET_GENRES";
export const SEARCH_GAME = "SEARCH_GAME";

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

export const getPlatforms = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/platforms");
      return dispatch({
        type: GET_PLATFORMS,
        payload: response.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/genres");
      return dispatch({
        type: GET_GENRES,
        payload: response.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const searchGame = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/videogames?name=${name}`);
      return dispatch({
        type: SEARCH_GAME,
        payload: response.data,
      });
    } catch (error) {
      alert(error);
    }
  };

}
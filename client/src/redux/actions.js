import axios from "axios";
import { showError } from "../utils/Notifications";
import setAuthHeader from "../utils/AxiosUtils";

export const GET_GAMES = "GET_GAMES";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_GENRES = "GET_GENRES";
export const SEARCH_GAME = "SEARCH_GAME";
export const SET_FILTER = "SET_FILTER";
export const CHANGE_BG = "CHANGE_BG";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const LOG = "LOG";
export const CLEAN_LOG = "CLEAN_LOG";
export const UPDATE_CART = "UPDATE_CART";
export const GET_ALL_USERS = "GET_ALL_USERS";

export const updateCart = (cart) => {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_CART,
      payload: cart,
    });
  };
};

export const updateFilterObj = (filter) => {
  return (dispatch) => {
    return dispatch({
      type: SET_FILTER,
      payload: filter,
    });
  };
};

export const getGames = (filtersObj) => {
  return async (dispatch) => {
    try {
      let filterString = `?page=${filtersObj.page}&size=20`;
      for (const key in filtersObj) {
        if (
          key !== "page" &&
          filtersObj[key] !== "" &&
          filtersObj[key] !== -1
        ) {
          filterString += "&" + key + "=" + filtersObj[key];
        }
      }
      //filterString = filterString.substring(0, filterString.length - 1);
      // console.log("filterString: " + filterString);
      const { data } = await axios(`/videogames${filterString}`);
      // console.log(JSON.stringify(data.videogames[0].name));
      return dispatch({
        type: GET_GAMES,
        payload: data,
      });
    } catch (error) {
      // alert(error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: `${error.message}`,
      // });
      showError(error.message);
    }
  };
};

/*
export const getGames = (value) => {
  return async (dispatch) => {
    try {
      let filterString = "";
      
      const { data } = await axios(`/videogames?page=${value}&size=6`);
      return dispatch({
        type: GET_GAMES,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
};
*/

export const getDetails = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/games/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      // alert(error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: `${error.message}`,
      // });
      showError(error.message);
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
      // alert(error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: `${error.message}`,
      // });
      showError(error.message);
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
      // alert(error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: `${error.message}`,
      // });
      showError(error.message);
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
      // alert(error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: `${error.message}`,
      // });
      showError(error.message);
    }
  };
};

export const changeBg = (data) => {
  return {
    type: CHANGE_BG,
    payload: data,
  };
};

export const getAllGames = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("/games");
      return dispatch({
        type: GET_ALL_GAMES,
        payload: response.data,
      });
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: `${error.message}`,
      // });
      showError(error.message);
    }
  };
};

export const login = (userData) => {
  return {
    type: LOG,
    payload: userData,
  };
};

export const limpiarLogin = (payload) => {
  return {
    type: CLEAN_LOG,
    payload,
  };
};

export const getAllUsers = () => {
  const token = localStorage.getItem("validToken");
  return async function (dispatch) {
    try {
      const response = await axios.get("/user", setAuthHeader(token));
      return dispatch({
        type: GET_ALL_USERS,
        payload: response.data,
      });
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: ${error.message},
      // });
      showError(error.message);
    }
  };
};

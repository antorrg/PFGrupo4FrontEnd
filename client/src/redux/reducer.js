import {
  GET_GAMES,
  GET_DETAILS,
  CLEAR_DETAILS,
  GET_PLATFORMS,
  GET_GENRES,
  SET_FILTER,
  CHANGE_BG,
  GET_ALL_GAMES,
  LOG,
  CLEAN_LOG,
  UPDATE_CART,
  GET_ALL_USERS,
} from "./actions";

let initialState = {
  games: [],
  backUpGames: [],
  detailGame: [],
  platforms: [],
  genres: [],
  loginUser: JSON.parse(localStorage.getItem("loginUser")) || [],
  filtersObj: {
    page: 0,
    platforms: "",
    genres: "",
    minPrice: -1,
    maxPrice: -1,
    name: "",
  },
  bgPage: "",
  allGames: [],
  cart: [],
  allUsers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        backUpGames: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        detailGame: action.payload,
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        detailGame: [],
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case SET_FILTER:
      let auxFilterObj = state.filtersObj;
      for (const property in action.payload) {
        auxFilterObj = {
          ...auxFilterObj,
          [property]: action.payload[property],
        };
      }
      return {
        ...state,
        filtersObj: auxFilterObj,
      };

    case CHANGE_BG:
      return { ...state, bgPage: action.payload };

    case GET_ALL_GAMES:
      return { ...state, allGames: action.payload };

    case LOG:
      localStorage.setItem("loginUser", JSON.stringify(action.payload));
      return {
        ...state,
        loginUser: action.payload,
      };

    case CLEAN_LOG:
      localStorage.removeItem("loginUser");
      return {
        ...state,
        loginUser: [],
      };

    case UPDATE_CART:
      return { ...state, cart: action.payload };

    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;

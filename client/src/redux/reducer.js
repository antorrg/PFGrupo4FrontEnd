import { GET_GAMES, GET_DETAILS, CLEAR_DETAILS, GET_PLATFORMS, GET_GENRES } from "./actions";

let initialState = {
  games: [],
  backUpGames: [],
  detailGame: [],
  platforms: [],
  genres: [],
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

    default:
      return { ...state };
  }
};

export default reducer;

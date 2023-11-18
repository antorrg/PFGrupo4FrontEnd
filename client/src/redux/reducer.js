import { GET_GAMES, GET_DETAILS, CLEAR_DETAILS } from "./actions";

let initialState = {
  games: [],
  backUpGames: [],
  detailGame: [],
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

    default:
      return { ...state };
  }
};

export default reducer;
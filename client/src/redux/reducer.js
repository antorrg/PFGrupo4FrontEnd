import { GET_GAMES } from "./actions";

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
        backUpGames: action.payload,
        games: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;

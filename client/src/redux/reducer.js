import { PRUEVA } from "./actions";

let initialState = {
  allGames: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRUEVA:
      return { ...state, allGames: (state.allGames += action.payload) };
    default:
      return { ...state };
  }
};

export default reducer;

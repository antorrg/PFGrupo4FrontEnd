export const PRUEVA = "PRUEVA";

export const prueva = (num) => {
  return (dispatch) => {
    return dispatch({
      type: PRUEVA,
      payload: num,
    });
  };
};

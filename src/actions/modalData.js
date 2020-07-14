import types from "../ActionTypes";

export const setNameModalData = (payload) => ({
  type: types.SET_NAME_MODAL_DATA,
  payload,
});

export const onPlayerNameChange = (payload) => ({
  type: types.PLAYER_NAME_CHANGE,
  payload,
});

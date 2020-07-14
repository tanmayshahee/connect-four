import types from "../ActionTypes";

const initialState = {
  nameModalData: {
    currentEditPlayer: {},
    title: "",
  },
  listModalData: {},
};

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case types.SET_NAME_MODAL_DATA: {
      let newState = { ...state };
      newState.nameModalData = { ...state.nameModalData };
      newState.nameModalData.currentEditPlayer = {
        ...state.nameModalData.currentEditPlayer,
      };
      newState.nameModalData.currentEditPlayer = payload.currentEditPlayer;
      if (payload.currentEditPlayer.id === 1) {
        newState.nameModalData.title = "Set Player1 Name";
      } else if (payload.currentEditPlayer.id === 2) {
        newState.nameModalData.title = "Set Player2 Name";
      }
      return newState;
    }
    case types.PLAYER_NAME_CHANGE: {
      let newState = { ...state };
      newState.nameModalData = { ...state.nameModalData };
      newState.nameModalData.currentEditPlayer = {
        ...state.nameModalData.currentEditPlayer,
      };
      newState.nameModalData.currentEditPlayer.name = payload.name;
      return newState;
    }
    default:
      return state;
  }
};

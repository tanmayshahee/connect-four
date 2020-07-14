import types from "../ActionTypes";

export const setNumberOfGamesToPlay = (payload) => ({
  type: types.SET_NUMBER_OF_GAMES,
  payload,
});

export const setWhoStartsGame = (payload) => ({
  type: types.WHO_STARTS_GAME,
  payload,
});
export const setCurrentPlayer = (payload) => ({
  type: types.SET_CURRENT_PLAYER,
  payload,
});
export const setCurrentGameWinner = (payload) => ({
  type: types.SET_CURRENT_GAME_WINNER,
  payload,
});
export const setGameOverFlag = (payload) => ({
  type: types.SET_GAMEOVER_FLAG,
  payload,
});
export const startNextGame = (payload) => ({
  type: types.START_NEXT_GAME,
  payload,
});
export const endTournament = (payload) => ({
  type: types.END_TOURNAMENT,
  payload,
});
export const undoStep = (payload) => ({
  type: types.UNDO_STEP,
  payload,
});
export const setPlayerName = (payload) => ({
  type: types.SET_PLAYER_NAME,
  payload,
});

import types from "../ActionTypes";

const initialState = {
  numberOfGamesToPlay: 2,
  whoStartsGame: "Alternative Turn",
  isGameOver: false,
  startNextGame: false,
  isTournamentDraw: false,
  currentGame: {
    count: 1,
    winner: {},
    isDraw: false,
    firstChance: 1,
    undoStep: false,
  },
  currentPlayer: {
    id: 1,
    name: "David",
  },
  player1: {
    id: 1,
    name: "David",
    score: 0,
  },
  player2: {
    id: 2,
    name: "Maria",
    score: 0,
  },
};

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case types.SET_NUMBER_OF_GAMES: {
      return {
        ...state,
        ...payload,
      };
    }
    case types.WHO_STARTS_GAME: {
      return {
        ...state,
        ...payload,
      };
    }
    case types.SET_CURRENT_PLAYER: {
      let newState = { ...state };
      newState.currentPlayer = { ...state.currentPlayer };
      newState.currentPlayer = payload.currentPlayer;
      return newState;
    }
    case types.SET_CURRENT_GAME_WINNER: {
      let newState = { ...state };
      newState.currentGame = { ...state.currentGame };
      newState.currentGame.winner = { ...state.currentGame.winner };
      newState.player1 = { ...state.player1 };
      newState.player2 = { ...state.player2 };
      newState.currentGame.winner = payload.winner;
      newState.currentGame.isDraw = payload.isDraw;
      newState.currentGame.firstChance =
        newState.currentGame.firstChance === 1 ? 2 : 1;
      if (payload.winner.id === 1) {
        newState.player1.score += 1;
      } else if (payload.winner.id === 2) {
        newState.player2.score += 1;
      }

      /** If all games are played */
      if (
        newState.numberOfGamesToPlay ===
        newState.player1.score + newState.player2.score
      ) {
        if (newState.player1.score > newState.player2.score) {
          newState.player1.isTournamentWinner = true;
        } else if (newState.player2.score > newState.player1.score) {
          newState.player2.isTournamentWinner = true;
        } else if (newState.player2.score === newState.player1.score) {
          newState.isTournamentDraw = true;
        }
      } else if (
        newState.player1.score >=
        Math.floor(newState.numberOfGamesToPlay / 2) + 1
      ) {
        newState.player1.isTournamentWinner = true;
      } else if (
        newState.player2.score >=
        Math.floor(newState.numberOfGamesToPlay / 2) + 1
      ) {
        newState.player2.isTournamentWinner = true;
      }

      return newState;
    }
    case types.SET_GAMEOVER_FLAG: {
      return {
        ...state,
        ...payload,
      };
    }
    case types.START_NEXT_GAME: {
      let newState = { ...state };
      newState.currentGame = { ...state.currentGame };
      if (newState.currentGame.count < newState.numberOfGamesToPlay) {
        newState.currentGame.count += 1;
        newState.startNextGame = true;
      }
      return newState;
    }
    case types.UNDO_STEP: {
      let newState = { ...state };
      newState.currentGame = { ...state.currentGame };
      newState.currentGame.undoStep = payload.undoStep;
      return newState;
    }
    case types.END_TOURNAMENT: {
      let newState = { ...state };
      newState.currentGame = { ...state.currentGame };
      newState.isTournamentDraw = false;
      newState.currentGame.count = 1;
      newState.currentGame.isDraw = false;
      newState.currentGame.firstChance = 1;
      newState.currentGame.winner = { ...state.currentGame.winner };
      newState.currentGame.winner = {};
      newState.player1 = { ...state.player1 };
      newState.player2 = { ...state.player2 };
      newState.player1.score = 0;
      newState.player1.isTournamentWinner = false;
      newState.player2.score = 0;
      newState.player2.isTournamentWinner = false;
      newState.isTournamentEnded = true;
      return newState;
    }
    case types.SET_PLAYER_NAME: {
      let newState = { ...state };
      newState.player1 = { ...state.player1 };
      newState.player2 = { ...state.player2 };
      if (newState.player1.id === payload.player.id) {
        newState.player1.name = payload.player.name;
      } else if (newState.player2.id === payload.player.id) {
        newState.player2.name = payload.player.name;
      }
      return newState;
    }
    default:
      return state;
  }
};

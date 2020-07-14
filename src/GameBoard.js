import React, { useState, useEffect, useRef } from "react";
import avatar1 from "./images/avatar01.png";
import avatar2 from "./images/avatar02.png";
import {
  setCurrentPlayer,
  setCurrentGameWinner,
  setGameOverFlag,
  undoStep,
} from "./actions/game";
import { connect } from "react-redux";
import "./styles/gameboard.css";

const GameBoard = (props) => {
  const [gameBoard, setBoard] = useState([]);
  const stepsSequenceData = useRef([]);

  // Starts new game
  const initBoard = () => {
    // Create a blank 6x7 matrix
    let board = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) {
        row.push(null);
      }
      board.push(row);
    }

    stepsSequenceData.current = [];

    setBoard(board);

    if (props.whoStartsGame == "Always Player 01") {
      props.setCurrentPlayer({ currentPlayer: props.player1 });
    } else if (props.whoStartsGame == "Always Player 02") {
      props.setCurrentPlayer({ currentPlayer: props.player2 });
    } else if (props.whoStartsGame == "Winner First") {
      if (props.currentGameWinner.id == 1 || !props.currentGameWinner.id) {
        props.setCurrentPlayer({ currentPlayer: props.player1 });
      } else {
        props.setCurrentPlayer({ currentPlayer: props.player2 });
      }
    } else if (props.whoStartsGame == "Looser First") {
      if (props.currentGameWinner.id == 1) {
        props.setCurrentPlayer({ currentPlayer: props.player2 });
      } else if (props.currentGameWinner.id == 2) {
        props.setCurrentPlayer({ currentPlayer: props.player1 });
      } else {
        props.setCurrentPlayer({ currentPlayer: props.player1 });
      }
    } else if (props.whoStartsGame == "Alternative Turn") {
      if (props.firstChance === 1) {
        props.setCurrentPlayer({ currentPlayer: props.player1 });
      } else if (props.firstChance === 2) {
        props.setCurrentPlayer({ currentPlayer: props.player2 });
      }
    }
    props.setGameOverFlag({
      isGameOver: false,
      startNextGame: false,
      isTournamentEnded: false,
    });
  };

  useEffect(() => {
    if (props.startNextGame || props.isTournamentEnded) {
      initBoard();
    }
  }, [props.startNextGame, props.isTournamentEnded]);

  useEffect(() => {
    if (props.undoLastStep) {
      undoPreviousStep();
    }
  }, [props.undoLastStep]);

  const undoPreviousStep = () => {
    if (stepsSequenceData.current.length) {
      let lastStep = stepsSequenceData.current.pop();
      gameBoard[lastStep.row][lastStep.column] = null;
      setBoard(gameBoard);
      props.undoStep({ undoStep: false });
      props.setCurrentPlayer({ currentPlayer: togglePlayer() });
    } else {
      props.undoStep({ undoStep: false });
    }
  };

  useEffect(() => {
    initBoard();
  }, []);

  const togglePlayer = () => {
    return props.currentPlayer.id === props.player1.id
      ? props.player2
      : props.player1;
  };

  const play = (c) => {
    if (!props.isGameOver) {
      // Place piece on board
      let board = gameBoard;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = props.currentPlayer.id;
          stepsSequenceData.current.push({ row: r, column: c });
          break;
        }
      }
      // Check status of board
      let result = checkAll(board);
      if (result === props.player1.id) {
        setBoard(board);
        props.setGameOverFlag({ isGameOver: true });
        props.setCurrentGameWinner({ winner: props.player1 });
      } else if (result === props.player2.id) {
        setBoard(board);
        props.setGameOverFlag({ isGameOver: true });
        props.setCurrentGameWinner({ winner: props.player2 });
      } else if (result === "draw") {
        setBoard(board);
        props.setGameOverFlag({ isGameOver: true });
        props.setCurrentGameWinner({ winner: {}, isDraw: true });
      } else {
        setBoard(board);
        props.setCurrentPlayer({ currentPlayer: togglePlayer() });
      }
    }
  };

  const checkAll = (board) => {
    return (
      checkVertical(board) ||
      checkDiagonalRight(board) ||
      checkDiagonalLeft(board) ||
      checkHorizontal(board) ||
      checkDraw(board)
    );
  };

  const checkVertical = (board) => {
    // Check only if row is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c] &&
            board[r][c] === board[r - 3][c]
          ) {
            return board[r][c];
          }
        }
      }
    }
  };

  const checkHorizontal = (board) => {
    // Check only if column is 3 or less
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2] &&
            board[r][c] === board[r][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  };

  const checkDiagonalRight = (board) => {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c + 1] &&
            board[r][c] === board[r - 2][c + 2] &&
            board[r][c] === board[r - 3][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  };

  const checkDiagonalLeft = (board) => {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c - 1] &&
            board[r][c] === board[r - 2][c - 2] &&
            board[r][c] === board[r - 3][c - 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  };

  const checkDraw = (board) => {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return "draw";
  };

  const Row = ({ row, play }) => {
    return (
      <tr>
        {row.map((cell, i) => (
          <Cell key={i} value={cell} columnIndex={i} play={play} />
        ))}
      </tr>
    );
  };

  const Cell = ({ value, columnIndex, play }) => {
    let color = "";
    let imageSrc = "";
    if (value === 1) {
      color = "avatar1";
      imageSrc = avatar1;
    } else if (value === 2) {
      color = "avatar2";
      imageSrc = avatar2;
    }

    return (
      <td>
        <div
          className="cell"
          onClick={() => {
            play(columnIndex);
          }}
        >
          <div className={`white avatar-holder ${color}`}>
            <img className={"avatar"} src={imageSrc} alt={""} />
          </div>
        </div>
      </td>
    );
  };

  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          {gameBoard.map((row, i) => (
            <Row key={i} row={row} play={play} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

function mapStateToProps(state, props) {
  return {
    ...props,
    currentPlayer: state.game.currentPlayer,
    player1: state.game.player1,
    player2: state.game.player2,
    isGameOver: state.game.isGameOver,
    startNextGame: state.game.startNextGame,
    isTournamentEnded: state.game.isTournamentEnded,
    whoStartsGame: state.game.whoStartsGame,
    currentGameWinner: state.game.currentGame.winner,
    firstChance: state.game.currentGame.firstChance,
    undoLastStep: state.game.currentGame.undoStep,
  };
}

const mapDispatchToProps = {
  setCurrentPlayer,
  setCurrentGameWinner,
  setGameOverFlag,
  undoStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);

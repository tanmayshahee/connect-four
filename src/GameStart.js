import React from "react";
import Header from "./common/Header";
import GameBoard from "./GameBoard";
import Tab from "./common/Tab";
import avatar1 from "./images/avatar01.png";
import avatar2 from "./images/avatar02.png";
import Button from "./common/Button";
import { startNextGame, endTournament, undoStep } from "./actions/game";
import { connect } from "react-redux";
import "./styles/game-start.scss";
const GameStart = (props) => {
  const undoStepOrNextGameClick = () => {
    if (props.isGameOver) {
      props.startNextGame();
    } else {
      props.undoStep({ undoStep: true });
    }
  };
  const endTournament = () => {
    props.endTournament();
  };
  return (
    <div className={"game-start-main"}>
      <Header title={"Two Players Game"} />
      <div className={"container-game"}>
        <div className={"game-start-card"}>
          <GameBoard />
        </div>

        <div className={"right-side-content"}>
          <div className={"tournament-name"}>
            {`${props.numberOfGamesToPlay} Games Tournament`}
          </div>
          {props.isGameOver && props.currentGame.winner.id ? (
            props.isTournamentDraw ? (
              <div className={"winner-container"}>
                <div className={"congratulate"}>Tournament Draw!</div>
              </div>
            ) : (
              <div className={"winner-container"}>
                <div className={"congratulate"}>Congratulation!</div>
                <div className={"name-container"}>
                  <span className={"name"}>
                    {props.currentGame.winner.name}
                  </span>
                  {props.player1.isTournamentWinner ||
                  props.player2.isTournamentWinner ? (
                    <span>{", you won Tournament "}</span>
                  ) : (
                    <span>{", you won Game " + props.currentGame.count}</span>
                  )}
                </div>
              </div>
            )
          ) : (
            <div
              className={"game-number"}
            >{`Playing Game ${props.currentGame.count}`}</div>
          )}
          <Tab
            className={"player-1"}
            image={avatar1}
            title={"Player 01"}
            subTitle={props.player1.name}
            score={props.player1.score}
            isCurrentPlayer={props.player1.id === props.currentPlayer.id}
          />
          <Tab
            className={"player-2"}
            image={avatar2}
            title={"Player 02"}
            subTitle={props.player2.name}
            score={props.player2.score}
            isCurrentPlayer={props.player2.id === props.currentPlayer.id}
          />
          <div className={"seperator"}></div>
          {props.player1.isTournamentWinner ||
          props.player2.isTournamentWinner ||
          props.isTournamentDraw ? null : (
            <Button
              btnText={props.isGameOver ? "Next Game" : "Undo Step"}
              variant={"primary"}
              clickHandler={undoStepOrNextGameClick}
            />
          )}
          <Button
            btnText={
              props.player1.isTournamentWinner ||
              props.player2.isTournamentWinner ||
              props.isTournamentDraw
                ? "Play Again"
                : "End Tournament"
            }
            variant={"secondary"}
            clickHandler={endTournament}
          />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, props) {
  return {
    ...props,
    numberOfGamesToPlay: state.game.numberOfGamesToPlay,
    whoStartsGame: state.game.whoStartsGame,
    player1: state.game.player1,
    player2: state.game.player2,
    currentPlayer: state.game.currentPlayer,
    currentGame: state.game.currentGame,
    isGameOver: state.game.isGameOver,
    isTournamentDraw: state.game.isTournamentDraw,
  };
}

const mapDispatchToProps = { startNextGame, endTournament, undoStep };

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);

import React, { useState } from "react";
import Header from "./common/Header";
import Tab from "./common/Tab";
import avatar1 from "./images/avatar01.png";
import avatar2 from "./images/avatar02.png";
import winner from "./images/winner.png";
import runner from "./images/run.png";
import "./styles/two-player.scss";
import Button from "./common/Button";
import Modal from "./common/Modal";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router-dom";
import {
  setNumberOfGamesToPlay,
  setWhoStartsGame,
  setPlayerName,
} from "./actions/game";
import { setNameModalData, onPlayerNameChange } from "./actions/modalData";
import { connect } from "react-redux";

const TwoPlayersGame = (props) => {
  const [numberOfGameModal, toggleNumberOfGameModal] = useState(false);
  const [whoStartsModal, toggleWhoStartsModal] = useState(false);
  const [showListModal, toggleListModal] = useState(false);
  const [showNameModal, toggleNameModal] = useState(false);
  const numberOfGamesList = [
    {
      label: "2 Games",
      name: "2 games",
      value: 2,
      id: "2games",
    },
    {
      label: "3 Games",
      name: "3 games",
      value: 3,
      id: "3games",
    },
    {
      label: "5 Games",
      name: "5 games",
      value: 5,
      id: "5games",
    },
    {
      label: "10 Games",
      name: "10 games",
      value: 10,
      id: "10games",
    },
  ];

  const whoStartsList = [
    {
      label: "Alternative Turn",
      name: "Alternative Turn",
      value: "Alternative Turn",
      id: "1",
    },
    {
      label: "Looser First",
      name: "Looser First",
      value: "Looser First",
      id: "2",
    },
    {
      label: "Winner First",
      name: "Winner First",
      value: "Winner First",
      id: "3",
    },
    {
      label: "Always Player 01",
      name: "Always Player 01",
      value: "Always Player 01",
      id: "4",
    },
    {
      label: "Always Player 02",
      name: "Always Player 02",
      value: "Always Player 02",
      id: "5",
    },
  ];
  const startGame = () => {
    props.history.push("/startgame");
  };

  const selectNumberOfGames = () => {
    toggleNumberOfGameModal(true);
    toggleListModal(true);
  };

  const selectWhoStartsGame = () => {
    toggleWhoStartsModal(true);
    toggleListModal(true);
  };

  const onNumberOfGameChange = (value) => {
    console.log(value);
    props.setNumberOfGamesToPlay({ numberOfGamesToPlay: value });
  };

  const onWhoStartsFirstChange = (value) => {
    console.log(value);
    props.setWhoStartsGame({ whoStartsGame: value });
  };

  const onSelectGame = () => {
    toggleNumberOfGameModal(false);
    toggleListModal(false);
  };

  const onSelectGameModalCancel = () => {
    props.setNumberOfGamesToPlay({ numberOfGamesToPlay: 2 });
    toggleNumberOfGameModal(false);
    toggleListModal(false);
  };

  const onWhoStartsModalCancel = () => {
    props.setWhoStartsGame({ whoStartsGame: "Alternative Turn" });
    toggleWhoStartsModal(false);
    toggleListModal(false);
  };

  const onWhoStartsSelect = () => {
    toggleWhoStartsModal(false);
    toggleListModal(false);
  };

  const onListModalHide = () => {
    toggleWhoStartsModal(false);
    toggleNumberOfGameModal(false);
    toggleListModal(false);
  };

  const onNameModalHide = () => {
    toggleNameModal(false);
  };

  const openNameModal = (player) => {
    console.log(player.name);
    props.setNameModalData({ currentEditPlayer: player });
    toggleNameModal(true);
  };

  const onPlayerNameChange = (e) => {
    console.log(e);
    props.onPlayerNameChange({ name: e.target.value });
  };

  const setPlayerName = () => {
    props.setPlayerName({ player: props.nameModalData.currentEditPlayer });
    toggleNameModal(false);
  };

  const numberOfGamesModalContent = () => {
    let gamesList = [];
    numberOfGamesList.forEach((item) => {
      gamesList.push(
        <Form.Check
          type="radio"
          key={item.id}
          label={item.label}
          name={item.name}
          value={item.value}
          id={item.id}
          checked={props.numberOfGamesToPlay == item.value}
          onChange={(e) => onNumberOfGameChange(Number(e.target.value))}
        />
      );
    });
    return gamesList;
  };

  const whoStartsFirstModalContent = () => {
    let whoStartsGameList = [];
    whoStartsList.forEach((item) => {
      whoStartsGameList.push(
        <Form.Check
          type="radio"
          key={item.id}
          label={item.label}
          name={item.name}
          value={item.value}
          id={item.id}
          checked={props.whoStartsGame == item.value}
          onChange={(e) => onWhoStartsFirstChange(e.target.value)}
        />
      );
    });
    return whoStartsGameList;
  };

  return (
    <>
      <div className={"two-player-game"}>
        <Header title={"Two Players Game"} />
        <div className={"white-card"}>
          <Tab
            className={"player-1"}
            image={avatar1}
            title={"Player 01"}
            subTitle={props.player1.name}
            clickHandler={() => openNameModal(props.player1)}
          />
          <Tab
            className={"player-2"}
            image={avatar2}
            title={"Player 02"}
            subTitle={props.player2.name}
            clickHandler={() => openNameModal(props.player2)}
          />
          <Tab
            className={"winner"}
            image={winner}
            title={"Number of game"}
            subTitle={props.numberOfGamesToPlay + " Games"}
            clickHandler={selectNumberOfGames}
          />
          <Tab
            className={"runner"}
            image={runner}
            title={"Who starts"}
            subTitle={props.whoStartsGame}
            clickHandler={selectWhoStartsGame}
          />
          <div className={"border-bottom"}></div>
          <Button
            btnText={"Start Game"}
            className={"start-game-btn"}
            clickHandler={startGame}
          />
        </div>
      </div>
      {showListModal && (
        <Modal
          show={showListModal}
          size={"lg"}
          onHide={() => onListModalHide(false)}
          title={numberOfGameModal ? "Number of game" : "Who Starts"}
          buttonArray={[
            {
              btnClickHandler: numberOfGameModal
                ? onSelectGameModalCancel
                : onWhoStartsModalCancel,
              text: "CANCEL",
              variant: "secondary",
            },
            {
              btnClickHandler: numberOfGameModal
                ? onSelectGame
                : onWhoStartsSelect,
              text: "OK",
              variant: "primary",
            },
          ]}
          modalBody={
            <div className={"body-content"}>
              <div className={"list-main"}>
                {numberOfGameModal
                  ? numberOfGamesModalContent()
                  : whoStartsFirstModalContent()}
              </div>
              <div className={"modal-body-border"}></div>
            </div>
          }
        />
      )}

      {showNameModal && (
        <Modal
          show={showNameModal}
          onHide={() => onNameModalHide(false)}
          title={props.nameModalData.title}
          size={"sm"}
          buttonArray={[
            {
              btnClickHandler: setPlayerName,
              text: "Set Name",
              variant: "primary",
            },
          ]}
          modalBody={
            <div className={"body-content"}>
              <Form>
                <Form.Group controlId="playerName">
                  <Form.Control
                    type="text"
                    placeholder="Enter Player Name"
                    onChange={(e) => onPlayerNameChange(e)}
                    value={props.nameModalData.currentEditPlayer.name}
                  />
                </Form.Group>
              </Form>
            </div>
          }
        />
      )}
    </>
  );
};

function mapStateToProps(state, props) {
  return {
    ...props,
    numberOfGamesToPlay: state.game.numberOfGamesToPlay,
    whoStartsGame: state.game.whoStartsGame,
    player1: state.game.player1,
    player2: state.game.player2,
    nameModalData: state.modalData.nameModalData,
  };
}

const mapDispatchToProps = {
  setNumberOfGamesToPlay,
  setWhoStartsGame,
  setNameModalData,
  onPlayerNameChange,
  setPlayerName,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TwoPlayersGame)
);

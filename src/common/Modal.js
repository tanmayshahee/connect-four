import React from "react";
import Modal from "react-bootstrap/Modal";
import "./styles/modal.scss";
import Button from "./Button";
const GameModal = (props) => {
  const renderFooterButtons = () => {
    let btnList = [];
    props.buttonArray.forEach((button) => {
      btnList.push(
        <Button
          clickHandler={button.btnClickHandler}
          className={"modal-button"}
          variant={button.variant}
          btnText={button.text}
        ></Button>
      );
    });

    return btnList;
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.modalBody}</Modal.Body>
      <Modal.Footer>{renderFooterButtons()}</Modal.Footer>
    </Modal>
  );
};

export default GameModal;

import React from "react";
import { withRouter } from "react-router-dom";
import "./styles/header.scss";

const Header = (props) => {
  const onBackClick = () => {
    if (props.onBackClick) {
      props.onBackClick();
    } else {
      props.history.goBack();
    }
  };
  return (
    <div className={`header-main ${props.className}`}>
      <div className={"back-icon"} onClick={onBackClick}>
        Go To Previous Page
      </div>
      <div className={"header-title"}>{props.title}</div>
    </div>
  );
};
export default withRouter(Header);

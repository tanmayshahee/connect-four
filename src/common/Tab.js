import React from "react";
import "./styles/tab.scss";

const Tab = (props) => {
  return (
    <div className={`tab-main ${props.className}`} onClick={props.clickHandler}>
      <div className={props.isCurrentPlayer ? "current-player" : ""}>
        <div className={"avatar-holder"}>
          <img src={props.image} alt={""} />
        </div>
      </div>
      <div className={"details-main"}>
        <div className={"details-holder"}>
          <div className={"title"}>{props.title}</div>
          <div className={"sub-title"}>{props.subTitle}</div>
        </div>
        {props.score !== undefined && (
          <div className={"score-holder"}>
            <div className={"title"}>{"Score"}</div>
            <div className={"sub-title"}>{props.score}</div>
          </div>
        )}
        {/* <div className={"border-bottom"}></div> */}
      </div>
    </div>
  );
};

export default Tab;

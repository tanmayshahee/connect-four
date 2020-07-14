import React from "react";
import "./styles/button.scss";

const Button = (props) => {
  return (
    <div
      className={`${props.className} button-main ${props.variant}`}
      onClick={props.clickHandler}
    >
      {props.imageUrl ? (
        <div className={"icon-holder"}>
          <img src={props.imageUrl} alt={""} />
        </div>
      ) : null}
      <div className={"btn-text"}>{props.btnText}</div>
    </div>
  );
};

export default Button;

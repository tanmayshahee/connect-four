import React from "react";
import "./styles/button.scss";

const Button = (props) => {
  return (
    <div
      className={`${props.className} button-main ${props.variant}`}
      onClick={props.clickHandler}
    >
      <div className={"main-container"}>
        <div className={"left-side"}>
          {props.imageUrl ? (
            <div className={"icon-holder"}>
              <img src={props.imageUrl} alt={""} />
            </div>
          ) : null}
          <div className={"btn-text"}>{props.btnText}</div>
        </div>

        {props.infoMsg && <div className={"info-msg"}>{props.infoMsg}</div>}
      </div>
    </div>
  );
};

export default Button;

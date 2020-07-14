import React from "react";
import "./styles/home.scss";
import image1 from "./images/4inarow.png";
import btn1Image from "./images/one.png";
import btn2Image from "./images/two.png";
import btn3Image from "./images/online.png";
import btn4Image from "./images/training.png";
import Button from "./common/Button";
import { withRouter } from "react-router-dom";

const Home = (props) => {
  const twoPlayerGame = () => {
    console.log("Two Player Game");
    props.history.push("/twoplayers");
  };
  return (
    <div className={"home-page"}>
      <div className={"header"}>
        <div className={"title"}>Connect Four!</div>
        <div className={"sub-title"}>
          Play with other players around the world.
        </div>
      </div>
      <div className={"container"}>
        <div className={"card"}>
          <div className={"upper-half"}>
            <div className={"play-box"}>
              <div className={"text"}>PLAY</div>
            </div>
            <div className={"image-wrapper"}>
              <img className={"connect-four-img"} src={image1} alt={""} />
            </div>
          </div>
          <div className={"seperator"}></div>
          <div className={"lower-half"}>
            <div className={"row"}>
              <Button
                btnText={"Custom Game"}
                imageUrl={btn1Image}
                className={"custom-game-btn"}
              />
              <Button
                btnText={"Two Players"}
                imageUrl={btn2Image}
                clickHandler={twoPlayerGame}
                className={"two-player-btn"}
              />
            </div>
            <div className={"row"}>
              <Button
                btnText={"Game Online"}
                imageUrl={btn3Image}
                className={"game-online-btn"}
              />
              <Button
                btnText={"Training Game"}
                imageUrl={btn4Image}
                className={"training-game-btn"}
              />
            </div>
          </div>
        </div>
        <div className={"copyright-patch"}>
          <div className={"copyright-text"}>© 2020</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);

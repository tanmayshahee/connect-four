import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import Home from "./Home";
import TwoPlayersGame from "./TwoPlayersGame";
import GameStart from "./GameStart";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { getStore } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={getStore}>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/twoplayers" component={TwoPlayersGame}></Route>
        <Route path="/startgame" component={GameStart}></Route>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { Component, Fragment } from "react";
import Canvas from "./Canvas";
import "./App.css";
import {
  updateCoordsInDirection,
  correctBeyondBorderPosition,
  createRandomDir
} from "./utils";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  Directions,
  DIRECTION_LIMIT,
  INTERVAL_BETWEEN_MOVES_MS,
  PX_PER_MOVE
} from "./constants";

/**
 * Is what is commonly known a 'reducer', but I don't like the word
 * Is NOT in utils.js, since it manipulates state
 * @param {Object<State>} state
 * @returns {Object<Hero, number, Array<Snipe>>} next state
 */
const makeNextState = state => {
  const updatedSnipes = state.snipes.map(snipe => {
    if (state.nrOfMoves % DIRECTION_LIMIT === 0) {
      snipe.dir = createRandomDir();
    }
    snipe = updateCoordsInDirection(snipe, PX_PER_MOVE);
    return correctBeyondBorderPosition(snipe, CANVAS_WIDTH, CANVAS_HEIGHT);
  });
  state.nrOfMoves++;
  return {
    nrOfMoves: state.nrOfMoves,
    hero: state.hero,
    snipes: updatedSnipes
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nrOfMoves: 0,
      hero: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_WIDTH / 2
      },
      snipes: [
        { x: 10, y: 10, dir: Directions.DOWN },
        { x: 700, y: 700, dir: Directions.UP }
      ]
    };
  }

  componentDidMount() {
    window.addEventListener(
      "keydown",
      evt => {
        console.log(evt.keyCode);
        this.state.hero.x = this.state.hero.x + 10;
      },
      false
    );
    setInterval(() => {
      this.setState(makeNextState(this.state));
    }, INTERVAL_BETWEEN_MOVES_MS);
  }

  render() {
    return (
      <Fragment>
        <Canvas hero={this.state.hero} snipes={this.state.snipes} />
        <div>
          snipe 1: {this.state.snipes[0].x}, {this.state.snipes[0].y},{" "}
          {this.state.snipes[0].dir}
        </div>
        <div>
          snipe 2: {this.state.snipes[1].x}, {this.state.snipes[1].y},{" "}
          {this.state.snipes[1].dir}
        </div>
      </Fragment>
    );
  }
}

export default App;

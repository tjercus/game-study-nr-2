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
 * @param {Array<Snipe>} snipes
 * @param {number} nrOfMoves - counts all moves done
 * @returns {Object<Array<Snipe>, number>} next state
 */
const makeNextState = (snipes, nrOfMoves) => {
  const updatedSnipes = snipes.map(snipe => {
    if (nrOfMoves % DIRECTION_LIMIT === 0) {
      snipe.dir = createRandomDir();
    }
    snipe = updateCoordsInDirection(snipe, PX_PER_MOVE);
    return correctBeyondBorderPosition(snipe, CANVAS_WIDTH, CANVAS_HEIGHT);
  });
  nrOfMoves++;
  return { nrOfMoves, updatedSnipes };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nrOfMoves: 0,
      snipes: [
        { x: 10, y: 10, dir: Directions.DOWN },
        { x: 700, y: 700, dir: Directions.UP }
      ]
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(makeNextState(this.state.snipes, this.state.nrOfMoves));
      console.dir(this.state);
    }, INTERVAL_BETWEEN_MOVES_MS);
  }

  render() {
    return (
      <Fragment>
        <Canvas snipes={this.state.snipes} />
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

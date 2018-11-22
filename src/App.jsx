import React, { Component, Fragment } from "react";
import Canvas from "./Canvas";
import "./App.css";
import {
  updateCoordsInDirection,
  correctBeyondBorderPosition,
  createRandomDir,
  moveHero
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
    window.addEventListener("keydown", this.keyDownHandler, false);
    setInterval(() => {
      this.setState(makeNextState(this.state));
    }, INTERVAL_BETWEEN_MOVES_MS);
  }

  keyDownHandler = evt => {
    console.log(evt.keyCode);
    let prevPoint = this.state.hero;
    let nextPoint = { x: 0, y: 0 };
    if (evt.keyCode === 38) {
      nextPoint = {
        x: this.state.hero.x,
        y: this.state.hero.y - PX_PER_MOVE
      };
    }
    if (evt.keyCode === 39) {
      nextPoint = {
        x: this.state.hero.x + PX_PER_MOVE,
        y: this.state.hero.y
      };
    }
    if (evt.keyCode === 40) {
      nextPoint = {
        x: this.state.hero.x,
        y: this.state.hero.y + PX_PER_MOVE
      };
    }
    if (evt.keyCode === 37) {
      nextPoint = {
        x: this.state.hero.x - PX_PER_MOVE,
        y: this.state.hero.y
      };
    }
    this.state.hero = moveHero(this.state.hero, prevPoint, nextPoint);
  };

  render() {
    return (
      <Fragment>
        <Canvas hero={this.state.hero} snipes={this.state.snipes} />
        <div>
          Hero: {this.state.hero.x}, {this.state.hero.y}, {this.state.hero.dir}
        </div>
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

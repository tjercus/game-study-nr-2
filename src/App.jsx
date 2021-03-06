import React, { Component, Fragment } from "react";
import Canvas from "./Canvas";
import "./App.css";
import {
  correctUnitBeyondBorderPosition,
  createRandomDir,
  moveHero,
  createNextPoint,
  isCollision,
} from "./utils";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  Directions,
  DIRECTION_LIMIT,
  INTERVAL_BETWEEN_MOVES_MS,
  PX_PER_MOVE,
  keyMap,
  SNIPE_SIZE, MOVE_SNIPES_CMD, MOVE_HERO_CMD, HERO_SIZE
} from "./constants";

const defaultState = {
  nrOfMoves: 0,
  hero: {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_WIDTH / 2,
    id: 123
  },
  snipes: [
    { x: 100, y: 100, dir: Directions.DOWN },
    { x: 200, y: 200, dir: Directions.UP },
    { x: CANVAS_WIDTH - 100, y: CANVAS_WIDTH - 100, dir: Directions.RIGHT },
    { x: CANVAS_WIDTH - 200, y: CANVAS_WIDTH - 200, dir: Directions.LEFT }
  ],
};

/**
 * Is what is commonly known a 'reducer', but I don't like the word
 * Is NOT in utils.js, since it manipulates state
 * @param {Object<State>} state
 * @param {Object<Action>} action - contains instructions on how to make next state
 * @returns {Object<Hero, number, Array<Snipe>, Array<Unit>>} next state
 */
const makeNextState = (state = defaultState, action) => {
  if (MOVE_SNIPES_CMD === action.type) {
    const updatedSnipes = state.snipes.map(/** @type Snipe */ snipe => {
      if (typeof snipe !== "undefined" && snipe !== null) {
        if (state.nrOfMoves % DIRECTION_LIMIT === 0) {
          snipe.dir = createRandomDir();
        }
        let nextPoint = createNextPoint(
          snipe.dir,
          /** @type Point */ {x: snipe.x, y: snipe.y},
          PX_PER_MOVE
        );
        if (isCollision(state.hero, nextPoint, HERO_SIZE * 2)) {
          nextPoint = {x: snipe.x, y: snipe.y};
        }
        return {
          ...snipe,
          ...nextPoint,
          ...correctUnitBeyondBorderPosition({...snipe, ...nextPoint}, SNIPE_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT)
        };
      }
    });
    state.nrOfMoves++;
    return { ...state, snipes: updatedSnipes }
  }
  if (MOVE_HERO_CMD === action.type) {
    const prevPoint = /** @type Point */ { x: state.hero.x, y: state.hero.y };
    const nextPoint = createNextPoint(
      action.dir,
      prevPoint,
      PX_PER_MOVE
    );
    const updatedHero = moveHero(
      state.hero,
      state.snipes,
      prevPoint,
      nextPoint
    );
    return { ...state, hero: updatedHero }
  }
  return state;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keyDownHandler, false);
    setInterval(() => {
      this.setState(makeNextState(this.state, {type: MOVE_SNIPES_CMD}));
    }, INTERVAL_BETWEEN_MOVES_MS);
  }

  keyDownHandler = evt => {
    this.setState(makeNextState(this.state, {type: MOVE_HERO_CMD, dir: keyMap[evt.keyCode]}));
  };

  render() {
    return (
      <Fragment>
        <Canvas hero={this.state.hero} snipes={this.state.snipes} />
        <div>
          Hero: {this.state.hero.x}, {this.state.hero.y}, {this.state.hero.dir}
        </div>
        {this.state.snipes.map((snipe, i) => {
          return (typeof snipe !== "undefined" && snipe !== null) ?
            (<div key={i}>
                snipe {i}: {snipe.x}, {snipe.y}, {snipe.dir}
              </div>
            ) : null;
        })}
      </Fragment>
    );
  }
}

export default App;

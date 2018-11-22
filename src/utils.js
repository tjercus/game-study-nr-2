import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  Directions,
  DirectionsArray,
  SNIPE_SIZE
} from "./constants";

/**
 *
 * @returns {string} random dir
 */
export const createRandomDir = () => {
  const randomNr = Math.floor(Math.random() * DirectionsArray.length);
  return DirectionsArray[randomNr];
};

const createOppositeDir = dir => {
  if (dir === Directions.UP) {
    return Directions.DOWN;
  }
  if (dir === Directions.DOWN) {
    return Directions.UP;
  }
  if (dir === Directions.LEFT) {
    return Directions.RIGHT;
  }
  if (dir === Directions.RIGHT) {
    return Directions.LEFT;
  }
};

/**
 * Corrects a units position and direction given the borders of a field
 *  the rule is that there is no pacman/snipes like 'round-going', so a snipe
 *  cannot cross the borders.
 * @param {Unit} unit - the moving subject, can be Snipe or Hero
 * @param {number} fieldWidth
 * @param {number} fieldHeight
 * @returns {Unit} modified subject
 */
export const correctBeyondBorderPosition = (unit, fieldWidth, fieldHeight) => {
  if (unit.x >= fieldWidth - SNIPE_SIZE * 2) {
    unit.x = fieldWidth - SNIPE_SIZE * 2;
    unit.dir = createOppositeDir(unit.dir);
  } else if (unit.x <= 0) {
    unit.x = 1;
    unit.dir = createOppositeDir(unit.dir);
  }
  if (unit.y >= fieldHeight - SNIPE_SIZE * 2) {
    unit.y = fieldHeight - SNIPE_SIZE * 2;
    unit.dir = createOppositeDir(unit.dir);
  } else if (unit.y <= 0) {
    unit.y = 1;
    unit.dir = createOppositeDir(unit.dir);
  }
  return unit;
};

/**
 * Given a current x and y and a direction, calculate next x and y after moving
 * @param {Unit} unit
 * @param {number} nrOfPixels - to move
 * @returns {Unit} modified unit
 */
export const updateCoordsInDirection = (unit, nrOfPixels) => {
  switch (unit.dir) {
    case Directions.LEFT:
      unit.x = unit.x - nrOfPixels;
      break;
    case Directions.RIGHT:
      unit.x = unit.x + nrOfPixels;
      break;
    case Directions.UP:
      unit.y = unit.y - nrOfPixels;
      break;
    case Directions.DOWN:
      unit.y = unit.y + nrOfPixels;
      break;
    default:
      unit.x = unit.x - nrOfPixels;
      break;
  }
  return unit;
};

// const moveHero = (prevPoint, nextPoint) => {
//   if (isCollissions(state.walls, nextPoint)) {
//     console.warn("collission");
//     state.hero.x = prevPoint.x;
//     state.hero.y = prevPoint.y;
//   } else {
//     state.hero.x = nextPoint.x;
//     state.hero.y = nextPoint.y;
//   }
//   const newPos = correctBeyondBorderPosition({x: state.hero.x, y: state.hero.y});
//   state.hero.x = newPos.x;
//   state.hero.y = newPos.y;
// };

export const moveHero = (hero, prevPoint, nextPoint) => {
  hero.x = nextPoint.x;
  hero.y = nextPoint.y;
  const newPos = correctBeyondBorderPosition(hero, CANVAS_WIDTH, CANVAS_HEIGHT);
  hero.x = newPos.x;
  hero.y = newPos.y;
  return hero;
};

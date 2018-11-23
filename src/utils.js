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
 * Starting with prevPoint, create a new point nrOfPixels in dir
 * @param {string} dir
 * @param {Point} prevPoint
 * @param {number} nrOfPixels
 * @returns {Point} a new Point
 */
export const createNextPoint = (dir, prevPoint, nrOfPixels) => {
  const nextPoint = { ...prevPoint };
  switch (dir) {
    case Directions.UP:
      nextPoint.y = prevPoint.y - nrOfPixels;
      break;
    case Directions.RIGHT:
      nextPoint.x = prevPoint.x + nrOfPixels;
      break;
    case Directions.DOWN:
      nextPoint.y = prevPoint.y + nrOfPixels;
      break;
    case Directions.LEFT:
      nextPoint.x = prevPoint.x - nrOfPixels;
      break;
    default:
      break;
  }
  return nextPoint;
};

/**
 * Given a current point (x and y) and a direction, calculate next point after moving
 * @param {Unit} unit
 * @param {number} nrOfPixels - to move
 * @returns {Unit} modified unit
 */
export const updateUnitCoordsInDirection = (unit, nrOfPixels) => {
  return { dir: unit.dir, ...createNextPoint(unit.dir, { x: unit.x, y: unit.y }, nrOfPixels) };
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
//
// const isCollissions = (subjects, subj) =>
//   subjects.map(subject => isCollission(subject, subj)).includes(true);
//
// const isCollission = (rect1, rect2) => {
//   if (rect1 === null || rect2 === null) {
//     return false;
//   }
//   const predY1 = rect1.y + unitSize <= rect2.y;
//   const predY2 = rect1.y >= rect2.y + unitSize;
//   const predX1 = rect1.x + unitSize <= rect2.x;
//   const predX2 = rect1.x >= rect2.x + unitSize;
//   return !(predY1 || predY2 || predX1 || predX2);
// };

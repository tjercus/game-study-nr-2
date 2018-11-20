import { Directions, DirectionsArray, SNIPE_SIZE } from "./constants";

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
 * Corrects a snipes position and direction given the borders of a field
 *  the rule is that there is no pacman/snipes like 'round-going', so a snipe
 *  cannot cross the borders.
 * @param {Snipe} snipe - the moving subject
 * @param {number} fieldWidth
 * @param {number} fieldHeight
 * @returns {Snipe} modified subject
 */
export const correctBeyondBorderPosition = (snipe, fieldWidth, fieldHeight) => {
  if (snipe.x >= fieldWidth) {
    snipe.x = fieldWidth - SNIPE_SIZE;
    snipe.dir = createOppositeDir(snipe.dir);
  } else if (snipe.x <= 0) {
    snipe.x = 1;
    snipe.dir = createOppositeDir(snipe.dir);
  }
  if (snipe.y >= fieldHeight) {
    snipe.y = fieldHeight - SNIPE_SIZE;
    snipe.dir = createOppositeDir(snipe.dir);
  } else if (snipe.y <= 0) {
    snipe.y = 1;
    snipe.dir = createOppositeDir(snipe.dir);
  }
  return snipe;
};

/**
 * Given a current x and y and a direction, calculate next x and y after moving
 * @param {Snipe} unit
 * @param {number} nrOfPixels - to move
 * @returns {Snipe} modified snipe
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

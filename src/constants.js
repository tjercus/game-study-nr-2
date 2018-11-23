/**
 * @interface Unit
 * @property {number} x - cartesian coord
 * @property {number} y - cartesian coord
 * @property {string} dir - direction
 */

/**
 * @interface Point
 * @property {number} x - cartesian coord
 * @property {number} y - cartesian coord
 */

/**
 *
 * @type {{UP: string, RIGHT: string, DOWN: string, LEFT: string}}
 */
export const Directions = {
  UP: "up",
  RIGHT: "right",
  DOWN: "down",
  LEFT: "left"
};

export const DirectionsArray = [
  Directions.UP,
  Directions.RIGHT,
  Directions.DOWN,
  Directions.LEFT
];

export const UP_INT = 38;
export const RIGHT_INT = 39;
export const DOWN_INT = 40;
export const LEFT_INT = 37;

/**
 * Map browser keydown keyCode nr's to movement stuff
 * @type {{"39": string, "37": string, "38": string, "40": string, "65": string, "68": string, "87": string, "83": string}}
 */
export const keyMap = {
  39: "right",
  37: "left",
  38: "up",
  40: "down",
  65: "shootLeft",
  68: "shootRight",
  87: "shootUp",
  83: "shootDown"
};

export const CANVAS_WIDTH = 800;

export const CANVAS_HEIGHT = 800;

export const DIRECTION_LIMIT = 20;

export const INTERVAL_BETWEEN_MOVES_MS = 100;

export const PX_PER_MOVE = 10;

export const SNIPE_SIZE = 5;

export const HERO_SIZE = 10;

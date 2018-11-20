import React from "react";
import PropTypes from "prop-types";

import Snipe from "./Snipe";
import { CANVAS_HEIGHT } from "./constants";

const Canvas = props => {
  const viewBox = [0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT];

  const onCanvasClick = () => {
    console.log("clicked on main canvas");
  };

  return (
    <svg
      id="game-canvas"
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
      onClick={onCanvasClick}
    >
      {props.snipes.map(snipe => (
        <Snipe snipe={snipe} key={snipe.x + " " + snipe.y} />
      ))}
    </svg>
  );
};

Canvas.propTypes = {
  snipes: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      dir: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Canvas;

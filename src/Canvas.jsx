import React from "react";
import PropTypes from "prop-types";

import Snipe from "./Snipe";
import Hero from "./Hero";
import { CANVAS_HEIGHT } from "./constants";

const Canvas = props => {
  const viewBox = [0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT];

  const onCanvasClick = () => {
    console.log("clicked on main canvas");
  };

  return (
    <svg id="game-canvas" viewBox={viewBox} onClick={onCanvasClick}>
      <Hero hero={props.hero} />

      {props.snipes.map(snipe => (
        <Snipe snipe={snipe} key={snipe.id} />
      ))}
    </svg>
  );
};

Canvas.propTypes = {
  hero: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  snipes: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      dir: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Canvas;

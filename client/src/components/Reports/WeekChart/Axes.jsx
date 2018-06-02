import React from 'react';
import PropTypes from 'prop-types';
import Axis from './Axis';

const Axes = ({
  scales,
  margins,
  svgWidth,
  svgHeight,
}) => {
  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${svgHeight - margins.bottom})`,
    tickSize: svgHeight - margins.top - margins.bottom,
  };

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: svgWidth - margins.left - margins.right,
  };

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  );
};

Axes.propTypes = {
  scales: PropTypes.object.isRequired,
  margins: PropTypes.object.isRequired,
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
};

export default Axes;

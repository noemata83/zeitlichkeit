import React from 'react';
import PropTypes from 'prop-types';

const generateLabels = (data, x, y) =>
  data.map((d, i) =>
    (
      <g key={d.name}>
        <rect x={x + 10} y={y + (i * 20) + 10} width={10} height={10} style={{ fill: d.color }} />
        <text x={x + 30} y={y + (i * 20) + 20} style={{ fontSize: '1.4rem' }}>{d.name}</text>
      </g>
    ));

const legend = (props) => {
  const {
    svgWidth,
    svgHeight,
    radius,
    data,
  } = props;
  const x = (svgWidth / 2) - radius;
  const width = radius * 2;
  const y = svgHeight - 180;
  const height = (data.length * 20) + 20;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
            stroke: 'black',
            strokeWidth: '1px',
            fill: 'white',
        }}
      />
      {generateLabels(data, x, y)}
    </g>
  );
};

legend.propTypes = {
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

export default legend;

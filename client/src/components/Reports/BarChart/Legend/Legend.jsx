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
    rightMargin,
    data,
  } = props;
  const x = (svgWidth - rightMargin) + 10;
  const width = (rightMargin - 10);
  const y = 20;
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
  rightMargin: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

export default legend;

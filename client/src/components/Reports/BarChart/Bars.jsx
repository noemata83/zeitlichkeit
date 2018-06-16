import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';

export default class Bars extends Component {
  constructor(props) {
    super(props);

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#ffd95b', '#c77800'])
      .interpolate(interpolateLab);
  }

  render() {
    const {
      scales,
      margins,
      data,
      svgHeight,
      xValue,
      yValue,
      totalDuration,
    } = this.props;
    const { xScale, yScale } = scales;
    const bars = data.map((d) => {
      const yVal = totalDuration ? (((d[yValue] * 3600000) / totalDuration) * 100) : d[yValue];
      return (
        <rect
          key={d[xValue]}
          y={yScale(yVal)}
          x={xScale(d[xValue])}
          height={svgHeight - margins.bottom - scales.yScale(yVal)}
          width={xScale.bandwidth()}
          fill={d.color || this.colorScale(d[yValue])}
        />
      );
    });

    return <g>{bars}</g>;
  }
}

Bars.defaultProps = {
  totalDuration: undefined,
};

Bars.propTypes = {
  maxValue: PropTypes.number.isRequired,
  scales: PropTypes.object.isRequired,
  margins: PropTypes.object.isRequired,
  svgHeight: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  totalDuration: PropTypes.number,
  xValue: PropTypes.string.isRequired,
  yValue: PropTypes.string.isRequired,
};

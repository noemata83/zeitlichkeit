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
    } = this.props;
    const { xScale, yScale } = scales;

    const bars = data.map(d => (
      <rect
        key={d[xValue]}
        y={yScale(d[yValue])}
        x={xScale(d[xValue])}
        height={svgHeight - margins.bottom - scales.yScale(d[yValue])}
        width={xScale.bandwidth()}
        fill={this.colorScale(d[yValue])}
      />
    ));

    return <g>{bars}</g>;
  }
}

Bars.propTypes = {
  maxValue: PropTypes.number.isRequired,
  scales: PropTypes.object.isRequired,
  margins: PropTypes.object.isRequired,
  svgHeight: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  xValue: PropTypes.number.isRequired,
  yValue: PropTypes.number.isRequired,
};

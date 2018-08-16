import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { stack as d3stack, stackOrderNone, stackOffsetNone } from 'd3-shape';
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
      doStack,
      colors,
    } = this.props;
    const { xScale, yScale } = scales;
    let bars = [];
    if (doStack) {
      const stack = d3stack()
        .keys([...Object.keys(data[0]).filter(key => key !== 'date')])
        .order(stackOrderNone)
        .offset(stackOffsetNone);
      const series = stack(data);
      if (series !== undefined) {
        bars = series.map((key, index) =>
          key.map(d => (
            <rect
              key={series[0].key}
              y={
                yScale(d[0]) -
                (svgHeight - margins.bottom - yScale(d[1] - d[0]))
              }
              x={xScale(data[0].date)}
              height={svgHeight - margins.bottom - yScale(d[1] - d[0])}
              width={xScale.bandwidth()}
              fill={colors[index]}
            />
          )),
        );
      }
    } else {
      bars = data.map((d) => {
        const yVal = totalDuration
          ? ((d[yValue] * 3600000) / totalDuration) * 100
          : d[yValue];
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
    }

    return <g>{bars}</g>;
  }
}

Bars.defaultProps = {
  totalDuration: undefined,
  doStack: false,
  colors: [],
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
  doStack: PropTypes.bool,
  colors: PropTypes.array,
};

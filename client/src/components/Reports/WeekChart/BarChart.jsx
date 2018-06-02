import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear } from 'd3-scale';

import Axes from './Axes';
import Bars from './Bars';

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const {
      svgWidth,
      svgHeight,
      data,
      xValue,
      yValue,
    } = this.props;
    const margins = {
      top: 50,
      right: 20,
      bottom: 100,
      left: 60,
    };

    const maxValue = Math.max(...data.map(d => d[yValue]));

    // scaleBand type
    const xScale = this.xScale
      .padding(0.5)
      // domain should be an array of specified values
      .domain(data.map(d => d[xValue]))
      .range([margins.left, svgWidth - margins.right]);

    // scaleLinear type
    const yScale = this.yScale
      .domain([0, 12])
      .range([svgHeight - margins.bottom, margins.top]);

    return (
      <svg width={svgWidth} height={svgHeight}>
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgHeight={svgHeight}
          svgWidth={svgWidth}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={maxValue}
          xValue={xValue}
          yValue={yValue}
          svgHeight={svgHeight}
        />
      </svg>
    );
  }
}

BarChart.propTypes = {
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
  xValue: PropTypes.number.isRequired,
  yValue: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

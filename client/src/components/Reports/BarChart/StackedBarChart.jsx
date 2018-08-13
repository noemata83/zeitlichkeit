import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';


import Axes from './Axes';
import Bars from './Bars';

export default class StackedBarChart extends Component {
  constructor(props) {
    super(props);
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
    this.colors = schemeCategory10;
  }

  render() {
    const {
      svgWidth,
      svgHeight,
      data,
      xValue,
      yValue,
      totalDuration,
    } = this.props;
    const margins = {
      top: 10,
      right: 20,
      bottom: 30,
      left: 60,
    };


    const maxValue = totalDuration ? 100 : Math.max([...data].map(d => d[yValue]));

    // scaleBand type
    const xScale = this.xScale
      .padding(0.5)
      .domain(data.map(d => d[xValue]))
      .range([margins.left, svgWidth - margins.right]);

    // scaleLinear type
    const yScale = this.yScale
      .domain([0, Math.max(8, maxValue)])
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
          doStack
          totalDuration={totalDuration || null}
          svgHeight={svgHeight}
          colors={this.colors}
        />
      </svg>
    );
  }
}

StackedBarChart.defaultProps = {
  totalDuration: undefined,
};

StackedBarChart.propTypes = {
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
  xValue: PropTypes.string.isRequired,
  yValue: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  totalDuration: PropTypes.number,
};

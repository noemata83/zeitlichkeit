import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleBand, scaleLinear } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';


import Axes from './Axes';
import Bars from './Bars';
import Legend from './Legend/Legend';

export default class StackedBarChart extends Component {
  constructor(props) {
    super(props);
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
    this.colors = schemeCategory10;
  }

  generateLegendData = (data) => {
    let currentIndex = 0;
    return data.reduce((legendData, datum) => {
      Object.keys(datum).forEach((key) => {
        if ((key !== 'date') && !legendData.find(item => item.name === key)) {
          legendData.push({
            name: key,
            color: this.colors[currentIndex],
          });
          currentIndex += 1;
        }
      });
      return legendData;
    }, []);
  }

  render() {
    const {
      margins,
      svgWidth,
      svgHeight,
      data,
      xValue,
      yValue,
      totalDuration,
      compressed,
    } = this.props;


    // Let's consider refactoring the next line; it is a wee bit absurd.
    // The goal is to ascertain the max value for each set of stacked bars by summing
    // the value for each key, excluding the date itself. This badly needs work.
    const maxValue = totalDuration ? 100 :
      Math.ceil(Math.max(data.map(d => Object.keys(d).reduce((sum, key) => ((key === 'date') ? sum : sum + d[key]), 0))));

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
          compressed={compressed}
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
        { (this.generateLegendData(data).length > 0) && <Legend svgWidth={svgWidth} rightMargin={margins.right} data={this.generateLegendData(data)} /> }
      </svg>
    );
  }
}

StackedBarChart.defaultProps = {
  totalDuration: undefined,
  compressed: false,
};

StackedBarChart.propTypes = {
  margins: PropTypes.object.isRequired,
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
  xValue: PropTypes.string.isRequired,
  yValue: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  totalDuration: PropTypes.number,
  compressed: PropTypes.bool,
};

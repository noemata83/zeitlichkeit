import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pie } from 'd3-shape';
import { schemeCategory10 } from 'd3-scale-chromatic';

import LabeledArc from './Arc/LabeledArc';
import Legend from './Legend/Legend';

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.pie = pie()
      .sort(null)
      .value(d => d[props.valueName]);
    this.colors = schemeCategory10;
  }

  generateArc(d, i, radius, total) {
    return (
      <LabeledArc
        key={`arc-${i}`}
        data={d}
        total={total}
        valueName={this.props.valueName}
        innerRadius={radius - 120}
        outerRadius={radius - 10}
        color={this.colors[i]}
      />
    );
  }

  render() {
    const {
      svgWidth,
      svgHeight,
      data,
      totalDuration,
    } = this.props;

    const datapie = this.pie(data);
    const translate = `translate(${svgWidth / 2}, ${(svgHeight - 200) / 2})`;
    const radius = Math.min(svgWidth, (svgHeight - 200)) / 2;

    const totalTime = data.reduce((total, project) => total + project.duration, 0);
    const legendData = data.map((datum, i) => ({ ...datum, color: this.colors[i] }));
    return (
      <svg width={svgWidth} height={svgHeight}>
        <g transform={translate}>
          {datapie.map((d, i) => this.generateArc(d, i, radius, totalTime))}
          <text style={{ fill: 'black', fontSize: '4rem' }} textAnchor="middle">
            {totalDuration}
          </text>
        </g>
        <Legend data={legendData} svgHeight={svgHeight} svgWidth={svgWidth} radius={radius} />
      </svg>
    );
  }
}

PieChart.propTypes = {
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
  valueName: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  totalDuration: PropTypes.string.isRequired,
};

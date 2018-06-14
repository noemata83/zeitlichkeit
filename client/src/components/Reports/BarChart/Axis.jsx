import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3Axis from 'd3-axis';
import { select as d3select } from 'd3-selection';

import classes from './Axis.css';

export default class Axis extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const axisType = `axis${this.props.orient}`;
    const axis = d3Axis[axisType]()
      .scale(this.props.scale)
      .tickSize(-this.props.tickSize)
      .tickPadding([10]);
    // .ticks([7])

    d3select(this.axisElement).call(axis);
  }

  render() {
    return (
      <g
        className={[classes.Axis, classes[`Axis-${this.props.orient}`]].join(' ')}
        ref={(el) => {
          this.axisElement = el;
        }}
        transform={this.props.translate}
      />
    );
  }
}

Axis.propTypes = {
  orient: PropTypes.string.isRequired,
  translate: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  tickSize: PropTypes.number.isRequired,
};

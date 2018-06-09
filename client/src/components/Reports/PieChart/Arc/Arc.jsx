import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';

export default class Arc extends Component {
  constructor() {
    super();
    this.arc = arc();
  }
  componentWillMount() {
    this.updateD3(this.props);
  }

  componentWillReceiveProps() {
    this.updateD3(this.props);
  }

  updateD3(newProps) {
    this.arc.innerRadius(newProps.innerRadius);
    this.arc.outerRadius(newProps.outerRadius);
  }

  calculatePercentage = (data, total) => ((data / total) * 100).toFixed(0);

  render() {
    return (
      <path d={this.arc(this.props.data)} style={{ fill: this.props.color }} />
    );
  }
}

Arc.propTypes = {
  data: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

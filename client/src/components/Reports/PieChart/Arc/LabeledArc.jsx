import React from 'react';
import Arc from './Arc';
import classes from './LabeledArc.css';

export default class LabeledArc extends Arc {
  render() {
    const [labelX, labelY] = this.arc.centroid(this.props.data);
    const labelTranslate = `translate(${labelX}, ${labelY})`;
    return (
      <g>
        {super.render()}
        <text className={classes.Label} transform={labelTranslate} textAnchor="middle">
          {`${this.calculatePercentage(this.props.data.data[this.props.valueName], this.props.total)}%`}
        </text>
      </g>
    );
  }
}

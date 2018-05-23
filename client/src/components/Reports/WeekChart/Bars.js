import React, { Component } from 'react';
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
        const { scales, margins, data, svgHeight, xValue, yValue } = this.props;
        const { xScale, yScale } = scales;
        
        const bars = (
            data.map(d => (
                <rect
                    key={d[xValue]}
                    y={yScale(d[yValue])}
                    x={xScale(d[xValue])}
                    height={svgHeight - margins.bottom - scales.yScale(d[yValue])}
                    width={xScale.bandwidth()}
                    fill={this.colorScale(d[yValue])}
                />
            )));
        
        return(
            <g>
                {bars}
            </g>
        );
    }
}
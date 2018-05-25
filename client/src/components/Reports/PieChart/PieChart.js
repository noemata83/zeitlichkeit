import React, { Component } from 'react';
import { pie } from 'd3-shape';
import { schemeCategory10 } from 'd3-scale-chromatic';

import LabeledArc from './Arc/LabeledArc';

export default class PieChart extends Component {

    constructor(props) {
        super(props);
        this.pie = pie().sort(null).value(d => d[props.valueName]);
        this.colors = schemeCategory10;
    }

    generateArc(d, i, radius) {
        return (
            <LabeledArc
                key={`arc-${i}`}
                data={d}
                valueName={this.props.valueName}
                innerRadius={0}
                outerRadius={radius - 10}
                color={this.colors[i]}
                />
        );
    }

    render() {
        const { svgWidth, svgHeight, data } = this.props;

        const pie = this.pie(data),
              translate = `translate(${svgWidth / 2}, ${svgHeight /2 })`;
        const radius = Math.min(svgWidth, svgHeight) / 2;
        
        return (
            <svg
                width={svgWidth}
                height={svgHeight}
            >
                <g transform={translate}>
                    {pie.map((d, i) => this.generateArc(d, i, radius))}
                </g>
            </svg>
        )
    }

}
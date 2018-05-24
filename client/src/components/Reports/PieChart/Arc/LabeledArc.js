import React from 'react';
import Arc from './Arc';

export default class LabeledArc extends Arc {
    render() {
        const [ labelX, labelY ] = this.arc.centroid(this.props.data);
        const labelTranslate = `translate(${labelX}, ${labelY})`;
        return(
            <g>
                {super.render()}
                <text transform={labelTranslate}
                    textAnchor="middle">
                    {this.props.data.data[this.props.valueName]}
                </text>
            </g>
        )
    }
}
import React from 'react';
import { scaleLinear as d3scaleLinear,
    scaleOrdinal as d3scaleOrdinal } from 'd3-scale';
import { range as d3range,
         max as d3Max } from 'd3-array';
// import { format as d3format } from 'd3-format';

const Bar = (props) => {
    const style ={
        fill: 'steelblue'
    };
    return (
        <g>
            <rect className="bar" style={style} x={props.x} y={props.y + 5} width={props.width} height={props.height} />
        </g>    
)   
};

const YAxis = (props) => {
    const style = {
        stroke: 'steelblue',
        strokeWidth: '1px',
    }

    const textStyle = {
        fontSize: '0.8em',
        fill: 'steelblue',
        textAnchor: 'end'
    };

    console.log(props.end);

    const ticks = d3range(0, props.end, (props.end / props.labels.length));

    console.log(ticks);
    console.log(props.labels);

    const lines = [];
    ticks.forEach((tick, index) => lines.push(<line key={index} style={style} y1={tick} x1={props.x} y2={tick} x2={props.x - 4} />));
    
    const columnLabels = [];
    ticks.forEach((tick, index) => columnLabels.push(<text key={index} style={textStyle} y={tick + 6} x={props.x - 6} fontFamily="Verdana">{props.labels[index]}</text>))

    return(
        <g>
            <g className="y_labels" transform={`translate(${-5},${props.margin.top})`}>
                <line x1={props.x} y1={props.start} y2={props.end} x2={props.x} style={style} />
            </g>
            <g className="y_labels" transform={`translate(${-5},20)`}>
	        { columnLabels }
	        { lines }
	        </g>
        </g>
    )
}

const XAxis = props => {
    const style = {
        stroke: 'steelblue',
        strokeWidth: '1px'
    }

    const step = (props.start + props.end / props.labels.length);

    const ticks = d3range(props.start, props.end, step);

    const lines = [];
    ticks.forEach((tick, index) => lines.push(<line key={index} style={style} x1={tick + 10 } y1={props.y} x2={tick + 10} y2={props.y + 4}  />));

    const columnLabels = [];
    ticks.forEach((tick, index) => columnLabels.push(<text key={index} style={{fill: "steelblue"}} x={tick + 5} y={props.y + 20} fontFamily="Verdana" fontSize="5">{props.labels[index]}</text>));
    return (
        <g>
            <line x1={props.start} y1={props.y } x2={props.end} y2={props.y} style={ style } />
	        { columnLabels }
	        { lines }
        </g>
    )

}

export default ({ 
    data,
    svgHeight,
    svgWidth }) => {
    
    // data: [ { day: , duration: DURATION_IN_HOURS} ]

    const margin = {top: 20, right: 20, bottom: 30, left: 45};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const days = data.map(d => d.day);
    console.log(data);

    const ticks = d3range(0, width, (width/data.length));

    const x = d3scaleOrdinal()
                .domain(days)
                .range(ticks);
    
    const y = d3scaleLinear()
                .domain([0, d3Max(data, d => d.duration)]) // let's plan to convert the durations to hours
                .range([height, 0]);
    
    data.forEach(d => console.log(y(d.duration)));
    const bars = [];
    const bottom= 450;

    data.forEach((datum, index) => bars.push(<Bar key={index} x={x(datum.day)} y={y(datum.duration)- 6} width={20} height={height - y(datum.duration)} />));
    console.log(bars);
    return (
        <svg
            height={svgHeight}
            width={svgWidth}
        >
            <YAxis x={45} margin={margin} labels={[1,2,3,4,5,6,7].reverse()} start={0} end={bottom} />
            <g className="chart" transform={`translate(${margin.left},${margin.top})`}>
                {bars}
                <XAxis y={bottom} labels={days} start={0} end={width} />
            </g>
        </svg>
    );
}
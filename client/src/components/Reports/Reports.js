import React, { Component } from 'react';

// import WeekChart from './WeekChart/WeekChart';
import BarChart from './WeekChart/BarChart';

class Reports extends Component {

    weekData = () => {
        return [
            {day: "Thursday, May 17", duration: 7},
            {day: "Friday, May 18", duration: 6},
            {day: "Saturday, May 19", duration: 2},
            {day: "Sunday, May 20", duration: 1},
            {day: "Monday, May 21", duration: 6},
            {day: "Tuesday, May 22", duration: 6},
            {day: "Wednesday, May 23", duration: 4}
        ]
    }

    render() {
        return <BarChart data={this.weekData()} yValue="duration" xValue="day" svgHeight={500} svgWidth={800} />
    }
}

export default Reports;
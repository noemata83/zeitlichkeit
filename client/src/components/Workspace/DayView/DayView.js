import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import Day from './Day/Day';

const retrieveDates = (sprints) => R.map(sprint => ({...sprint, start_time: new Date(sprint.start_time), end_time: new Date(sprint.end_time)}), sprints);
const groupByDates = sprints => sprints.reduce((sprintsByDate, sprint) => {
    if (sprintsByDate[sprint.start_time.toDateString()]) {
        sprintsByDate[sprint.start_time.toDateString()] = sprintsByDate[sprint.start_time.toDateString()].concat(sprint);
    } else {
        sprintsByDate[sprint.start_time.toDateString()] = [].concat(sprint);
    }
    return sprintsByDate;
}, {});

class DayView extends Component {
    state = {
        sprints: [],
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const processSprints = R.pipe(
            retrieveDates,
            groupByDates
        );
        const sprints = processSprints(nextProps.sprints.map(sprint => ({
            ...sprint,
            duration: new Date(new Date(sprint.end_time) - new Date(sprint.start_time)).toISOString().substr(11,8)
        })));
        return {
            ...prevState,
            sprints
        }
    }

    renderDayView = (sprints) => {
        const sortedDates = Object.keys(sprints).sort((a,b) => new Date(b) - new Date(a));
        return sortedDates.map(date => <Day key={date.toString()} date={date} sprints={sprints[date]} />);
    }

    render() {
        return (
            <div style={{padding:'2rem'}}>
                <h1>Day View</h1>
                <h3 onClick={() => this.props.changeMode('TASK_VIEW')}>Switch to Task View</h3>
                {this.renderDayView(this.state.sprints)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sprints: state.workspace.sprints
    }
}

export default connect(mapStateToProps)(DayView);
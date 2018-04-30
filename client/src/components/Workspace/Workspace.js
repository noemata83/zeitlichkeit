import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

const flattenSprints = (tasks) => R.flatten(R.map(task => task.sprint_set, tasks));
const retrieveDates = (sprints) => R.map(sprint => ({...sprint, start_time: new Date(sprint.start_time), end_time: new Date(sprint.end_time)}), sprints);
const groupByDates = sprints => sprints.reduce((sprintsByDate, sprint) => {
    if (sprintsByDate[sprint.start_time.toDateString()]) {
        sprintsByDate[sprint.start_time.toDateString()] = sprintsByDate[sprint.start_time.toDateString()].concat(sprint);
    } else {
        sprintsByDate[sprint.start_time.toDateString()] = [].concat(sprint);
    }
    return sprintsByDate;
}, {});

class Workspace extends Component {
    state = {
        mode: 'DAY_VIEW'
    }
    modeChangeHandler = (mode) => {
        this.setState({
            mode,
        });
    }

    renderDayView = (tasks) => {
        const processedSprints = R.pipe(
            flattenSprints,
            retrieveDates,
            groupByDates
        )(tasks);
        const sortedDates = Object.keys(processedSprints).sort((a,b) => new Date(a) - new Date(b));
        return sortedDates.map(date => {
            const sprintList = processedSprints[date].map((sprint, index) => (
                <div key={index}>
                    {sprint.task} <br />
                    {sprint.start_time.toLocaleString()} <br />
                    {sprint.end_time.toLocaleString()} <br />
                    <br />
                </div>
            ))
            return (
                <div key={date.toString()}>
                    <h3>{date}</h3>
                        {sprintList}
                    <br />
                    <br />
                </div>
            )
        })
    }

    render() {
        
        return(
            <div>
                <h1>Day View</h1>
                <h3 onClick={() => this.modeChangeHandler('TASK_VIEW')}>Switch to Task View</h3>
                {this.renderDayView(this.props.tasks)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.workspace.task_set.filter(task => task.sprint_set.length !== 0)
    }
}

export default connect(mapStateToProps)(Workspace);
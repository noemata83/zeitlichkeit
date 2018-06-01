import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import Task from './Task/Task';

const retrieveDates = (sprints) => R.map(sprint => ({...sprint, start_time: new Date(sprint.start_time), end_time: new Date(sprint.end_time)}), sprints);
const groupByTasks = sprints => sprints.reduce((sprintsByTask, sprint) => {
    if (sprintsByTask[sprint.task]) {
        sprintsByTask[sprint.task] = sprintsByTask[sprint.task].concat(sprint);
    } else {
        sprintsByTask[sprint.task] = [].concat(sprint);
    }
    return sprintsByTask
}, {});

class TaskView extends Component {
    state = {
        sprints: []
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const processSprints = R.pipe(
            retrieveDates,
            groupByTasks
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

    renderTaskView = sprints => {
        const tasks = Object.keys(sprints);
        return tasks.map((sprintTask, index) => <Task key={index} sprints={sprints[sprintTask]} task={this.props.tasks.find(task => task.name === sprintTask)} /> );
    }

    render() {

        return (
                <div style={{padding:'2rem'}}>
                    <h1>Task View</h1>
                    <h3 onClick={() => this.props.changeMode('DAY_VIEW')}>Switch to Day View</h3>
                {this.renderTaskView(this.state.sprints)}
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sprints: state.workspace.sprints,
        tasks: state.workspace.task_set,
        categories: state.workspace.category_set
    }
}

export default connect(mapStateToProps)(TaskView);

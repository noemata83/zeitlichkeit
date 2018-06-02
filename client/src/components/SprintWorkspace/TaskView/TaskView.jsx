import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Task from './Task/Task';

const retrieveDates = sprints =>
  R.map(
    sprint => ({
      ...sprint,
      start_time: new Date(sprint.start_time),
      end_time: new Date(sprint.end_time),
    }),
    sprints,
  );

const groupByTasks = sprints =>
  sprints.reduce((sprintsByTask, sprint) => {
    const sprintList = {
      ...sprintsByTask,
    };
    if (sprintsByTask[sprint.task]) {
      sprintList[sprint.task] = sprintsByTask[sprint.task].concat(sprint);
    } else {
      sprintList[sprint.task] = [].concat(sprint);
    }
    return sprintList;
  }, {});

class TaskView extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const processSprints = R.pipe(retrieveDates, groupByTasks);
    const sprints = processSprints(nextProps.sprints.map(sprint => ({
      ...sprint,
      duration: new Date(new Date(sprint.end_time) - new Date(sprint.start_time))
        .toISOString().substr(11, 8),
    })));
    return {
      ...prevState,
      sprints,
    };
  }

  state = {
    sprints: [],
  };
  renderTaskView = (sprints) => {
    const tasks = Object.keys(sprints);
    return tasks.map(sprintTask => (
      <Task
        key={sprintTask}
        sprints={sprints[sprintTask]}
        task={this.props.tasks.find(task => task.name === sprintTask)}
      />
    ));
  };

  render() {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Task View</h1>
        <h3
          onClick={() => this.props.changeMode('DAY_VIEW')}
        >
          Switch to Day View
        </h3>
        {this.renderTaskView(this.state.sprints)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sprints: state.workspace.sprints,
  tasks: state.workspace.task_set,
  categories: state.workspace.category_set,
});

TaskView.propTypes = {
  sprints: PropTypes.array.isRequired, // eslint-disable-line
  tasks: PropTypes.array.isRequired, // eslint-disable-line
  categories: PropTypes.array.isRequired, // eslint-disable-line
  changeMode: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TaskView);

import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

const taskList = (props) => {
  const { tasks } = props;
  return tasks.map(task => <Task key={`Task-${task.id}`} task={task} />);
};

taskList.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default taskList;

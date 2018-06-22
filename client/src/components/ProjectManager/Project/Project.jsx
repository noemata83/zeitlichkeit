// A stateless component for displaying a single project and its associated tasks.
import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  withStyles,
  TextField,
  Toolbar,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProjectMenu from './ProjectMenu';
import TaskList from './TaskList/taskList';

const styles = theme => ({
  title: {
    display: 'inline-block',
    borderBottom: '1px solid gray',
  },
  hideInput: {
    display: 'none',
  },
  completed: {
    textDecoration: 'line-through',
    color: '#aaa',
    fontStyle: 'italic',
  },
  popup: {
    overflowY: 'visible !important',
    // position: 'relative',
  },
  popover: {
    margin: theme.spacing.unit * 2,
  },
});

const Project = (props) => {
  const {
    project,
    tasks,
    classes,
    addTaskToProject,
    showInput,
    handleInput,
    handleAddTask,
    inputValue,
  } = props;
  return (
    <div>
      <Toolbar>
        <Typography variant="title" className={classes.title}>
          {project.name}
        </Typography>
        <ProjectMenu
          id={project.id}
          name={project.name}
          addTaskToProject={addTaskToProject}
        />
      </Toolbar>
      <List>
        <TaskList tasks={tasks} />
        <ListItem className={!showInput ? classes.hideInput : null}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask(project);
            }}
            style={{ width: '100%' }}
          >
            <TextField
              name={`${project.name}__newTask`}
              placeholder={`New task under ${project.name}`}
              onChange={handleInput}
              value={inputValue}
              fullWidth
            />
          </form>
        </ListItem>
      </List>
    </div>
  );
};

Project.propTypes = {
  project: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  addTaskToProject: PropTypes.func.isRequired,
  showInput: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default withStyles(styles)(Project);

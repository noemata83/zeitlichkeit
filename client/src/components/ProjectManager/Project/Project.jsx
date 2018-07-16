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
  Toolbar: {
    flexWrap: 'wrap',
  }
});

const displayCompensation = (project) => {
  if (+project.rate !== 0) {
    return `\$${project.rate} /hr`;
  }
  else if (+project.fee !== 0) {
    return `\$${project.fee}`;
  }
  return 'No compensation';
}

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
    deleteProject,
    openEdit,
  } = props;
  return (
    <div>
      <Toolbar classes={{ root: classes.Toolbar }}>
        <Typography variant="title" className={classes.title}>
          {project.name}
        </Typography>
        <ProjectMenu
          project={project}
          deleteProject={deleteProject}
          addTaskToProject={addTaskToProject}
          openEdit={openEdit}
        />
        <div style={{ display: 'flex', width: '100%' }}>
          <Typography style={{ display: 'inline-block', color: project.client ? project.client.color : 'black' }} align="left">
            {project.client ? project.client.name : 'No client'}
          </Typography>
          <Typography style={{ display: 'inline-block', marginLeft: 'auto' }} align="right">
            {displayCompensation(project)}
          </Typography>
        </div>
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
  deleteProject: PropTypes.func.isRequired,
  openEdit: PropTypes.func.isRequired,
};

export default withStyles(styles)(Project);

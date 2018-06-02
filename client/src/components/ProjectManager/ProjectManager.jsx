//  A container for managing the data for the Project Management component of the app
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {
  Button,
  TextField,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import {
  addProject,
  deleteTask,
  addTask,
  updateTask,
} from '../../store/actions';

import Project from './Project/Project';

const styles = theme => ({
  main: {
    padding: '2rem',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  paper: {
    padding: 16,
    marginTop: theme.spacing.unit * 2,
  },
});

class ProjectManager extends Component {
  state = {
    open: false,
    newProject: '',
    addTaskToProject: null,
  };

  getProjectTasks = (tasks, project) =>
    tasks.filter(task => task.project === project);

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleDeleteTask = (taskId) => {
    this.props.deleteTask(taskId);
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSubmit = () => {
    this.setState({
      open: false,
    });
    this.props.addProject(this.state.newProject);
  };

  handleAddTaskToProject = (id, name) => {
    this.setState({
      addTaskToProject: id,
      [`${name}__newTask`]: '',
    });
  };

  handleAddTask = (project) => {
    const name = this.state[`${project.name}__newTask`];
    const task = {
      name,
      project,
      categories: [],
      completed: false,
      sprint_set: [],
    };
    this.props.addTask(task);
    this.setState({ addTaskToProject: null });
  };

  handleUpdateTaskCompleted = (task, completed) => {
    const updatedTask = { name: task.name, completed };
    this.props.updateTask(task.id, updatedTask);
  };

  renderProjects = (projects, task_set) =>
    (projects.length > 0 ? (
      projects.map((project) => {
        const tasks = this.getProjectTasks(task_set, project.name);
        return (
          <Project
            key={project.id}
            tasks={tasks}
            project={project}
            deleteTask={this.handleDeleteTask}
            addTaskToProject={this.handleAddTaskToProject}
            showInput={this.state.addTaskToProject === project.id}
            handleInput={this.handleInput}
            handleUpdateTaskCompleted={this.handleUpdateTaskCompleted}
            handleAddTask={this.handleAddTask}
            inputValue={this.state[`${project.name}__newTask`] || ''}
          />
        );
      })
    ) : (
      <div>No projects to display</div>
    ));

  render() {
    const { tasks, projects, classes } = this.props;
    return (
      <div className={classes.main}>
        <h1>Project Manager</h1>
        <Paper className={classes.paper} elevation={3}>
          <Grid container spacing={24}>
            {this.renderProjects(projects, tasks)}
          </Grid>
        </Paper>
        <Button
          variant="fab"
          color="secondary"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Button>
        {/* Refactor below into separate component */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a New Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a name for the new project below.
            </DialogContentText>
            <TextField
              autoFocus
              name="newProject"
              type="text"
              label="Project Name"
              value={this.state.newProject}
              onChange={this.handleInput}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleSubmit()} color="primary">
              Add Project
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.workspace.task_set,
  projects: state.workspace.project_set,
});

const mapDispatchToProps = dispatch => ({
  addProject: project => dispatch(addProject(project)),
  deleteTask: taskId => dispatch(deleteTask(taskId)),
  addTask: task => dispatch(addTask(task)),
  updateTask: (id, task) => dispatch(updateTask(id, task)),
});

ProjectManager.propTypes = {
  addProject: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  // Todo: work out how to gracefully circumnavigate airbnb eslint rule violated below!
  tasks: PropTypes.array.isRequired, // eslint-disable-line
  projects: PropTypes.array.isRequired, // eslint-disable-line
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectManager));

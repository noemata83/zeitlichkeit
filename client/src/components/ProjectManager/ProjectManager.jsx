//  A container for managing the data for the Project Management component of the app
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {
  Button,
  Paper,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';
import {
  addProject,
  deleteProject,
  deleteTask,
  addTask,
  updateTask,
} from '../../store/actions';

import Project from './Project/Project';
import ProjectDetailsDialog from './Project/ProjectDetailsDialog';

import { getProjects } from '../../store/reducers/';

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
    mode: null,
    addTaskToProject: null,
    anchorEl: null,
    categoryInput: '',
    tab: null,
    editOpen: false,
    projectToEdit: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return (nextProps.projects.length > 0 && !prevState.tab) ?
      {
        ...prevState,
        tab: nextProps.projects[0].name,
      }
      : {
        ...prevState,
      };
  }

  getProjectTasks = (tasks, project) =>
    tasks.filter(task => task.project === project);

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  }

  handleClickOpen = () => this.setState({ editOpen: true, projectToEdit: undefined });

  handleClose = () => this.setState({ open: false });

  handleEditOpen = project => this.setState({ editOpen: true, projectToEdit: project });

  handleEditClose = () => this.setState({ editOpen: false, projectToEdit: undefined });

  handleSubmit = () => {
    this.setState({
      open: false,
    });
    this.props.addProject(this.state.newProject);
  };

  handleDeleteProject = (id, name) => {
    this.setState({
      tab: this.props.projects[0].name,
    });
    this.props.deleteProject(id, name);
  }

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

  handleUpdateTask = (task, taskData) => {
    this.props.updateTask(task, { ...taskData });
  };

  renderProjectTabs = projects => projects.map(project => <Tab key={`Project ${project.id}`} value={project.name} label={project.name} />);

  renderProjects = (projects, task_set) =>
    projects.map((project) => {
      const tasks = this.getProjectTasks(task_set, project.name);
      return (
        this.state.tab === project.name && (
          <Project
            key={project.id}
            tasks={tasks}
            project={project}
            deleteProject={this.handleDeleteProject}
            addTaskToProject={this.handleAddTaskToProject}
            showInput={this.state.addTaskToProject === project.id}
            handleInput={this.handleInput}
            handleAddTask={this.handleAddTask}
            openEdit={this.handleEditOpen}
            inputValue={this.state[`${project.name}__newTask`] || ''}
          />
        )
      );
    });

  render() {
    const { tasks, projects, classes } = this.props;
    const { tab } = this.state;
    return (
      <div className={classes.main}>
        <h1>Project Manager</h1>
        <Paper className={classes.paper} elevation={3}>
          {projects.length > 0 ?
            <div>
              <Tabs
                value={tab}
                onChange={this.handleChangeTab}
                indicatorColor="secondary"
                textColor="primary"
                scrollable
                scrollButtons="off"
              >
                {this.renderProjectTabs(projects)}
              </Tabs>
              <Typography component="div" style={{ padding: '2rem' }}>
                {this.renderProjects(projects, tasks)}
              </Typography>
            </div>
          : <div style={{ fontSize: '2rem' }}>No Projects to Display</div>}
        </Paper>
        <Button
          variant="fab"
          color="secondary"
          className={classes.fab}
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Button>
        { this.state.editOpen && <ProjectDetailsDialog
          open={this.state.editOpen}
          handleClose={this.handleEditClose}
          project={this.state.projectToEdit}
        /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.workspace.task_set,
  projects: getProjects(state),
});

const mapDispatchToProps = dispatch => ({
  addProject: project => dispatch(addProject(project)),
  deleteProject: (id, name) => dispatch(deleteProject(id, name)),
  deleteTask: taskId => dispatch(deleteTask(taskId)),
  addTask: task => dispatch(addTask(task)),
  updateTask: (id, task) => dispatch(updateTask(id, task)),
});

ProjectManager.propTypes = {
  addProject: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectManager));

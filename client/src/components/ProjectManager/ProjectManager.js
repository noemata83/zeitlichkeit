import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid'; 
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Button, TextField, Paper } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { addProject, deleteTask } from '../../store/actions';

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
    }
});

class ProjectManager extends Component {

    state = {
        open: false,
        newProject: '',
    }

    getProjectTasks = (tasks, project) => {
        return tasks.filter(task => task.project === project);
    }

    renderProjects = (projects, task_set) => {
        return (projects.length > 0) ? projects.map(project => {
            const tasks = this.getProjectTasks(task_set, project.name);
            return <Project key={project.id} tasks={tasks} project={project} deleteTask={this.handleDeleteTask}/>;
        }) : <div>No projects to display</div>;
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleDeleteTask = (taskId) => {
        this.props.deleteTask(taskId);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleSubmit = () => {
        this.setState({
            open: false
        });
        this.props.addProject(this.state.newProject);
    }

    render() {
        const {tasks, projects, classes} = this.props;
        return (
        <div className={classes.main}>
            <h1>Project Manager</h1>
            <Paper className={classes.paper} elevation={3}>
                <Grid container spacing={24}>
                    {this.renderProjects(projects, tasks)}
                </Grid>
            </Paper>
            <Button variant="fab" color='secondary' className={classes.fab} onClick={this.handleClickOpen}><AddIcon /></Button>
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
                        fullWidth />
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
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.workspace.task_set,
        projects: state.workspace.project_set,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProject: (project) => dispatch(addProject(project)),
        deleteTask: (taskId) => dispatch(deleteTask(taskId))
    }
}

ProjectManager = withStyles(styles)(ProjectManager);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManager);
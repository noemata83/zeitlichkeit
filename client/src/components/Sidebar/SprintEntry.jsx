import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field, reset, formValueSelector } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { addSprint, addTaskandSprint } from '../../store/actions';
import Manual from './Widgets/Manual';
import Timer from './Widgets/Timer';

import { renderSelectField } from '../UI/Forms/renderFields';

import TaskAutosuggest from '../UI/Forms/Autosuggest/TaskAutosuggest';

const styles = theme => ({
  container: {
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing.unit,
    marginTop: 0,
    minWidth: 120,
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class SprintEntry extends Component {
  state = {
    mode: '',
    timing: false,
    counter: 0,
    timer: null,
    project: '',
    task: '',
    start_time: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.mode !== prevState.mode) {
      nextProps.resetForm();
    }
    return { ...prevState, mode: nextProps.mode };
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  onSubmit = (values) => {
    const { task } = this.state;
    // Hmm: code below only works for the manual widget.
    const { project, date, start_time, end_time } = values;
    // code below is duplicated, *up to resetForm()*
    const end_date = this.getEndDate(start_time, end_time, date);
    const sprint_data = {
      task,
      start_time: new Date(`${date}T${start_time}:00`).toISOString(),
      end_time: new Date(`${end_date}T${end_time}:00`).toISOString(),
    };
    this.handleAddSprint(sprint_data, task, project);
    this.setState({
      task: '',
    });
    return this.props.resetForm();
  };

  onStop = () => {
    clearInterval(this.state.timer);
    const { project } = this.props;
    const { task, start_time } = this.state;
    if (task === '' || project === '') {
      this.setState({
        timing: false,
        timer: null,
        counter: 0,
        start_time: null,
        project: '',
        task: '',
      });
      return;
    }
    const end_time = new Date().toISOString();
    const sprint_data = {
      task,
      start_time,
      end_time,
    };

    this.handleAddSprint(sprint_data, task, project);
  };

  getEndDate = (startTime, endTime, date) => {
    if (startTime < endTime) {
      return date;
    }
    return new Date(new Date(date).getTime() + 86400000)
      .toISOString()
      .slice(0, 10);
  };

  handleStart = () => {
    const timer = setInterval(this.tick, 1000);
    this.setState({
      timing: true,
      timer,
      start_time: new Date().toISOString(),
    });
  };

  tick = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAddSprint = (sprint_data, task, project) => {
    const isNew = this.checkIfTaskExists(task, project);

    if (isNew) {
      const task_data = {
        name: task,
        // project: {
        //   name: project,
        // },
        categories: [],
        completed: false,
        sprint_set: [],
      };
      if (project !== 'None') {
        task_data.project = {
          name: project,
        };
      }
      console.log(task_data);
      this.props.addTaskAndSprint(task_data, sprint_data);
    }
    this.props.resetForm();
    this.props.addSprint(sprint_data);
    return this.setState({
      task: '',
      timing: false,
      timer: null,
      counter: 0,
    });
  };

  checkIfTaskExists = (task, project) => {
    // Duplicated
    if (
      !this.props.tasks
        .filter(existingtask => existingtask.project === project)
        .map(existingtask => existingtask.name)
        .includes(task)
    ) {
      return true;
    }
    return false;
  };

  updateTaskInput = (event, { newValue }) => {
    this.setState({
      task: newValue,
    });
  };

  displayTimer = (counter) => {
    const hh = Math.floor(counter / 3600);
    const mm = Math.floor((counter % 3600) / 60);
    const ss = counter - hh * 3600 - mm * 60;
    return `${`${hh}`.padStart(2, '0')}:${`${mm}`.padStart(
      2,
      '0',
    )}:${`${ss}`.padStart(2, '0')}`;
  };

  renderWidget = () => {
    switch (this.props.mode) {
      case 'manual':
        return <Manual />;
      case 'timer':
        return (
          <Timer
            timing={this.state.timing}
            handleStart={this.handleStart}
            handleStop={this.onStop}
            displayTimer={this.displayTimer}
            counter={this.state.counter}
          />
        );
      case 'pomo':
        return <div>Hi I will be a pomodoro</div>;
      default:
        return <Manual />;
    }
  };

  render() {
    const { projects, classes } = this.props;
    const projectlist = ['None', ...projects].map(project => (
      <MenuItem key={project.name || 'none'} value={project.name || 'None'}>
        {project.name ? project.name : 'None'}
      </MenuItem>
    ));
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="project_select">Project</InputLabel>
          <Field
            name="project"
            component={renderSelectField}
            inputProps={{
              name: 'project',
              id: 'project_select',
            }}
          >
            {projectlist}
          </Field>
          {/* For the time being, I am simply going to omit the Autosuggest field from
                    my redux-form. I don't need to do any validation, and the state-based logic
                    I have already set up seems perfectly fine. It will make for a slightly
                    disjointed submit process (pulling both from props and state, rather
                    than treating all values in a unified way), but the setup cost just seems too
                    high to justify at the moment.
                    The problem for this is validation. */}
          <TaskAutosuggest
            updateTaskInput={this.updateTaskInput}
            task={this.state.task}
            project={this.props.project || ''}
          />
          {this.renderWidget()}
        </FormControl>
      </form>
    );
  }
}

const selector = formValueSelector('manualSprintForm'); // <-- same as form name

const mapStateToProps = state => ({
  project: selector(state, 'project'),
  projects: state.workspace.project_set,
  tasks: state.workspace.task_set,
});

const mapDispatchToProps = dispatch => ({
  addTaskAndSprint: (task_data, sprint_data) =>
    dispatch(addTaskandSprint(task_data, sprint_data)),
  addSprint: sprint_data => dispatch(addSprint(sprint_data)),
  resetForm: () => dispatch(reset('manualSprintForm')),
});

export default reduxForm({
  form: 'manualSprintForm',
  destroyOnUnmount: false,
  initialValues: {
    project: 'None',
    date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${new Date()
      .getDate()
      .toString()
      .padStart(2, '0')}`,
    start_time: `${new Date()
      .getHours()
      .toString()
      .padStart(2, '0')}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0')}`,
    end_time: `${new Date()
      .getHours()
      .toString()
      .padStart(2, '0')}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0')}`,
  },
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles)(SprintEntry)),
);

import React, { Component } from "react";
import { reduxForm, Field, reset, formValueSelector } from "redux-form";
import {
  renderTimeField,
  renderDateField,
  renderSelectField
} from "../UI/Forms/renderFields";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { addTaskandSprint, addSprint } from "../../store/actions";
import TaskAutosuggest from "../UI/Forms/Autosuggest/TaskAutosuggest";

const styles = theme => ({
  container: {
    position: "relative"
  },
  formControl: {
    margin: theme.spacing.unit,
    marginTop: 0,
    minWidth: 120,
    display: "flex",
    flexDirection: "column",
    height: "300px"
  },
  button: {
    margin: theme.spacing.unit
  }
});

const validate = values => {
    const errors = {};
    if (values.start_time > values.end_time) {
        errors.end_time = "End time must be after start time";
    }
    return errors;
}

class ManualSprintWidget extends Component {
  state = {
    start_time: new Date(),
    end_time: new Date(),
    task: "",
    project: ""
  };

  updateTaskInput = (event, { newValue, method }) => {
    this.setState({
      task: newValue
    });
  };
  changeStartHandler = event => {
    this.setState({
      start_time: new Date(event.target.value)
    });
  };
  changeEndHandler = event => {
    this.setState({
      end_time: new Date(event.target.value)
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  checkIfTaskExists = (task, project) => {
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

  onSubmit = values => {
    const { task } = this.state;
    const { project, date, start_time, end_time } = values;
    const isNew = this.checkIfTaskExists(task, project);
    const sprint_data = {
      task: task,
      start_time: new Date(`${date}T${start_time}:00`).toISOString(),
      end_time: new Date(`${date}T${end_time}:00`).toISOString()
    };
    if (isNew) {
      const task_data = {
        name: task,
        project: {
          name: project
        },
        categories: [],
        completed: false,
        sprint_set: []
      };
      this.props.addTaskAndSprint(task_data, sprint_data);
      this.props.resetForm();
      return this.setState({
        task: ''
      });
    }
    this.props.addSprint(sprint_data);
    this.setState({
        task: '',
    });
    return this.props.resetForm();
  };

  render() {
    const { projects, classes } = this.props;
    const projectlist = ["None", ...projects].map((project, index) => (
      <MenuItem key={index} value={project.name}>
        {project.name}
      </MenuItem>
    ));
    console.log(this.state.task);
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="project_select">Project</InputLabel>
          <Field
            name="project"
            component={renderSelectField}
            inputProps={{
              name: "project",
              id: "project_select"
            }}
            children={projectlist}
          />
          {/* For the time being, I am simply going to omit the Autosuggest field from 
                        my redux-form. I don't need to do any validation, and the state-based logic
                        I have already set up seems perfectly fine. It will make for a slightly
                        disjointed submit process (pulling both from props and state, rather
                        than treating all values in a unified way), but the setup cost just seems too
                        high to justify at the moment. */}
          <TaskAutosuggest
            updateTaskInput={this.updateTaskInput}
            task={this.state.task}
            project={this.props.project || ""}
          />
          <Field
            component={renderDateField}
            name="date"
            label="Date:"
            type="date"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem"
            }}
          >
            <Field
              component={renderTimeField}
              name="start_time"
              label="Start Time:"
              type="time"
            />
            <Field
              component={renderTimeField}
              name="end_time"
              label="End Time:"
              type="time"
            />
          </div>
          <Button variant="raised" color="secondary" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    );
  }
}

const selector = formValueSelector("manualSprintForm"); // <-- same as form name

const mapStateToProps = state => {
  return {
    project: selector(state, "project"),
    projects: state.workspace.project_set,
    tasks: state.workspace.task_set
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTaskAndSprint: (task_data, sprint_data) =>
      dispatch(addTaskandSprint(task_data, sprint_data)),
    addSprint: sprint_data => dispatch(addSprint(sprint_data)),
    resetForm: () => dispatch(reset("manualSprintForm"))
  };
};

export default reduxForm({
  form: "manualSprintForm",
  initialValues: {
    date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date()
      .getDate()
      .toString()
      .padStart(2, "0")}`,
    start_time: `${new Date()
      .getHours()
      .toString()
      .padStart(2, "0")}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, "0")}`,
    end_time: `${new Date()
      .getHours()
      .toString()
      .padStart(2, "0")}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  },
  validate,
})(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(ManualSprintWidget)
  )
);

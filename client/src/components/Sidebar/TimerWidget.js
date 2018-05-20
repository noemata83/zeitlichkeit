import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Stop from "@material-ui/icons/Stop";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TaskAutosuggest from "../UI/Forms/Autosuggest/TaskAutosuggest";
import { addSprint, addTaskandSprint } from "../../store/actions";

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
  },
  Timer: {
    margin: theme.spacing.unit * 2,
    display: "block",
    textAlign: "center",
    fontSize: "3rem"
  }
});

class TimerWidget extends Component {
  state = {
    timing: false,
    counter: 0,
    timer: null,
    project: "",
    task: "",
    start_time: null
  };

  updateTaskInput = (event, { newValue, method }) => {
    this.setState({
      task: newValue
    });
  };

  handleStart = () => {
    let timer = setInterval(this.tick, 1000);
    this.setState({
      timing: true,
      timer,
      start_time: new Date().toISOString()
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  tick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  handleStop = () => {
    clearInterval(this.state.timer);
    const { task, project, start_time } = this.state;
    if (task === "" || project === "") {
      this.setState({
        timing: false,
        timer: null,
        counter: 0,
        start_time: null,
        project: "",
        task: ""
      });
      return;
    }
    const end_time = new Date().toISOString();
    // Code below is duplicated
    const isNew = this.checkIfTaskExists(this.state.task, this.state.project);
    const sprint_data = {
      task,
      start_time,
      end_time
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
    } else {
      this.props.addSprint(sprint_data);
    }
    this.setState({
      timing: false,
      timer: null,
      counter: 0,
      start_time: null,
      project: "",
      task: ""
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

  displayTimer = counter => {
    const hh = Math.floor(counter / 3600);
    const mm = Math.floor((counter % 3600) / 60);
    const ss = counter - hh * 3600 - mm * 60;
    return (
      `${hh}`.padStart(2, "0") +
      ":" +
      `${mm}`.padStart(2, "0") +
      ":" +
      `${ss}`.padStart(2, "0")
    );
  };
  render() {
    const { projects, classes } = this.props;
    const projectlist = ["None", ...projects].map((project, index) => (
      <MenuItem key={index} value={project.name}>
        {project.name}
      </MenuItem>
    ));
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="project_select">Project</InputLabel>
          <Select
            name="project"
            value={this.state.project}
            onChange={this.handleChange}
          >
            {projectlist}
          </Select>
          <TaskAutosuggest
            updateTaskInput={this.updateTaskInput}
            task={this.state.task}
            project={this.state.project || ""}
          />
          <div className={classes.Timer}>
            {this.state.timing
              ? this.displayTimer(this.state.counter)
              : "00:00:00"}
          </div>
          <Button
            variant="raised"
            color="secondary"
            onClick={() =>
              this.state.timing ? this.handleStop() : this.handleStart()
            }
          >
            {this.state.timing ? <Stop /> : <PlayArrow />}
          </Button>
        </FormControl>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.workspace.project_set,
    tasks: state.workspace.task_set
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTaskAndSprint: (task_data, sprint_data) =>
      dispatch(addTaskandSprint(task_data, sprint_data)),
    addSprint: sprint_data => dispatch(addSprint(sprint_data))
  };
};

TimerWidget = withStyles(styles)(TimerWidget);

export default connect(mapStateToProps, mapDispatchToProps)(TimerWidget);
